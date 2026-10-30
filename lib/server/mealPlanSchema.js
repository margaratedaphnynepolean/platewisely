import { z } from "zod";
import { siteConfig } from "@/config/siteConfig";
import { customNamePattern } from "@/lib/customIngredients";

// The exact shape we ask Gemini to answer in for one day. Gemini is asked to follow it,
// so the screen can rely on every field being there.
const mealSchema = z.object({
  mealType: z.enum(siteConfig.limits.mealsPerDay),
  dishName: z.string(),
  shortMethod: z.string(), // 1-2 sentences on how to make it
  ingredientsUsed: z.array(z.string()), // names from the user's list or pantry
  extraIngredients: z.array(z.string()), // everyday items NOT on the user's list. Empty if none.
  prepMinutes: z.number(),
  proteinGrams: z.number(), // estimate for ONE person's portion
  fibreGrams: z.number(), // estimate for ONE person's portion
  batchCookHint: z.string(), // for example "Cook double dal, use tomorrow". Empty if none.
});

export const daySchema = z.object({
  day: z.string(), // Monday, Tuesday and so on
  meals: z.array(mealSchema),
});

// What the app sends us when it asks for a plan.
export const planRequestSchema = z.object({
  household: z.object({
    memberCount: z
      .number()
      .int()
      .min(1)
      .max(siteConfig.limits.maxHouseholdMembers),
    diet: z.enum(["veg", "veg-egg", "non-veg", "both"]),
    spiceLevel: z.enum(["mild", "medium", "spicy"]),
    allergies: z.array(z.string().max(40)).max(20),
    otherAllergies: z.string().max(siteConfig.ai.maxOtherAllergiesLength),
  }),
  ingredientIds: z.array(z.string().max(60)).max(300),
  // Items the user typed in themselves. The name rules are the same ones the app uses.
  customIngredients: z
    .array(
      z.object({
        name: z
          .string()
          .min(siteConfig.limits.minCustomNameLength)
          .max(siteConfig.limits.maxCustomNameLength)
          .regex(customNamePattern),
        isVeg: z.boolean(),
      }),
    )
    .max(siteConfig.limits.maxCustomIngredients),
});
