import { GoogleGenAI, ApiError, FinishReason } from "@google/genai";
import { z } from "zod";
import { siteConfig } from "@/config/siteConfig";
import { PlanError } from "./planError";
import { daySchema } from "./mealPlanSchema";
import { buildSystemPrompt, buildDayPrompt } from "./mealPlanPrompt";

// The day's shape written as JSON Schema, which is how Gemini is told what to answer with.
const dayJsonSchema = z.toJSONSchema(daySchema);
delete dayJsonSchema.$schema; // Gemini does not need this label

// Asks Gemini for one day of meals and returns it as a plain JavaScript object.
// This only ever runs on the server, because it uses the secret API key.
// "retryHelp" is empty the first time. On a retry it holds what went wrong
// ("problems") and the other days' main dishes ("dishesToAvoid").
export async function generateDayPlan(
  household,
  ingredients,
  dayIndex,
  retryHelp = {},
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new PlanError(
      "Plan making is not switched on yet. Please try again later.",
      503,
    );
  }

  const client = new GoogleGenAI({ apiKey });

  const startedAt = Date.now();
  let response;
  try {
    response = await askGemini(() =>
      client.models.generateContent({
        model: siteConfig.ai.model,
        contents: buildDayPrompt(household, ingredients, dayIndex, retryHelp),
        config: {
          systemInstruction: buildSystemPrompt(),
          maxOutputTokens: siteConfig.ai.maxOutputTokens,
          thinkingConfig: { thinkingLevel: siteConfig.ai.thinkingLevel },
          responseMimeType: "application/json",
          responseJsonSchema: dayJsonSchema,
        },
      }),
    );
  } catch (error) {
    throw toFriendlyError(error);
  }

  const usage = response.usageMetadata ?? {};
  console.log(
    `Gemini day ${dayIndex + 1}: ${Math.round((Date.now() - startedAt) / 1000)}s, ${usage.candidatesTokenCount} answer tokens, ${usage.thoughtsTokenCount ?? 0} thinking tokens`,
  );

  if (response.candidates?.[0]?.finishReason !== FinishReason.STOP) {
    throw new PlanError(
      "We could not finish the plan this time. Please try again.",
    );
  }

  // We set the day name ourselves, so it can never come back wrong
  return {
    ...readDay(response.text),
    day: siteConfig.limits.dayNames[dayIndex],
  };
}

// Gemini sometimes says "too busy" (503 or 429) for a moment. Waiting a few seconds
// and asking again usually works, so we try up to 4 times before giving up.
async function askGemini(sendRequest) {
  const secondsToWait = [5, 20, 45]; // the free plan's per-minute limit needs a longer rest
  for (let attempt = 0; ; attempt++) {
    try {
      return await sendRequest();
    } catch (error) {
      const isBusy =
        error instanceof ApiError &&
        (error.status === 503 || error.status === 429) &&
        !isDailyLimit(error);
      if (!isBusy || attempt >= secondsToWait.length) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, secondsToWait[attempt] * 1000),
      );
    }
  }
}

// Free accounts get a fixed number of requests per day. Waiting a few seconds
// does not help with that, so we do not retry.
function isDailyLimit(error) {
  return error.message.includes("PerDay");
}

// Turns Gemini's text answer into a day, checking it has the shape we asked for.
function readDay(answerText) {
  let answer;
  try {
    answer = JSON.parse(answerText);
  } catch {
    throw unreadablePlanError();
  }
  const checkedDay = daySchema.safeParse(answer);
  if (!checkedDay.success) throw unreadablePlanError();
  return checkedDay.data;
}

function unreadablePlanError() {
  return new PlanError(
    "The plan came back in a form we could not read. Please try again.",
  );
}

// Turns Gemini's technical errors into short messages a mum can understand.
function toFriendlyError(error) {
  const status = error instanceof ApiError ? error.status : 0;
  if (status === 429 && isDailyLimit(error)) {
    console.warn("Gemini daily request limit reached:", error.message);
    return new PlanError(
      "We have made a lot of plans today and need a rest. Please try again tomorrow.",
      503,
    );
  }
  if (status === 429 || status === 503) {
    console.warn(`Gemini said it is busy (${status}):`, error.message);
    return new PlanError(
      "Our meal planner is very busy right now. Please try again in a few minutes.",
      503,
    );
  }
  if (status === 401 || status === 403) {
    console.error("Gemini rejected our API key. Check GEMINI_API_KEY.");
    return new PlanError(
      "Plan making is not working right now. We are looking into it.",
      503,
    );
  }
  console.error("Gemini request failed:", error.message);
  return new PlanError(
    "Something went wrong while making your plan. Please try again.",
    502,
  );
}
