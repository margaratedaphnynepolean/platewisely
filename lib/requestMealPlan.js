import { siteConfig } from "@/config/siteConfig";

// Sends the household and ticked ingredients to our server and returns the 7-day plan.
// Any problem is thrown as an Error whose message is friendly enough to show on screen.
export async function requestMealPlan(details) {
  let response;
  try {
    response = await fetch(`${siteConfig.apiBaseUrl}/api/meal-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
  } catch {
    throw new Error(
      "We could not reach the server. Please check your internet and try again.",
    );
  }

  const answer = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(answer.error ?? "Something went wrong. Please try again.");
  }
  return answer.plan;
}
