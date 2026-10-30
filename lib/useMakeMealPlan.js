import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestMealPlan } from "./requestMealPlan";
import { saveMealPlan } from "./mealPlanStorage";

// Handles the "make my plan" button: asks the server, saves the plan,
// then moves on to the plan screen. If it fails, errorMessage says why.
export function useMakeMealPlan() {
  const router = useRouter();
  const [isWorking, setIsWorking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function makeMealPlan(details) {
    setIsWorking(true);
    setErrorMessage("");
    try {
      saveMealPlan(await requestMealPlan(details));
      router.push("/plan");
    } catch (error) {
      setErrorMessage(error.message);
      setIsWorking(false);
    }
  }

  return { isWorking, errorMessage, makeMealPlan };
}
