import { NextResponse } from "next/server";
import { planRequestSchema } from "@/lib/server/mealPlanSchema";
import { resolveSelectedIngredients } from "@/lib/server/resolveIngredients";
import { PlanError } from "@/lib/server/planError";
import { makeValidMealPlan } from "@/lib/server/makeValidMealPlan";
import { siteConfig } from "@/config/siteConfig";

// Gemini can take a while to write a full week, and we may ask up to 3 times.
export const maxDuration = 300;

function errorResponse(message, status) {
  return NextResponse.json({ error: message }, { status });
}

// The app sends the household and the ticked ingredient ids; we send back the plan.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("We could not read your request.", 400);
  }

  const parsedRequest = planRequestSchema.safeParse(body);
  if (!parsedRequest.success) {
    return errorResponse(
      "Some of your details look incomplete. Please check and try again.",
      400,
    );
  }
  const { household, ingredientIds, customIngredients } = parsedRequest.data;

  const ingredients = resolveSelectedIngredients(
    ingredientIds,
    customIngredients,
    household,
  );
  if (ingredients.length < siteConfig.limits.minIngredientsForPlan) {
    return errorResponse(
      `Please pick at least ${siteConfig.limits.minIngredientsForPlan} ingredients that suit your household.`,
      400,
    );
  }

  try {
    const plan = await makeValidMealPlan(household, ingredients);
    return NextResponse.json({ plan });
  } catch (error) {
    if (error instanceof PlanError)
      return errorResponse(error.message, error.status);
    console.error("Unexpected error while making a plan:", error);
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}
