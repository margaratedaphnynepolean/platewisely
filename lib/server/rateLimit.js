import { siteConfig } from "@/config/siteConfig";

// Keeps a count of recent plan requests so nobody can use up the AI allowance.
// The counts live in this server's memory, so they reset when the server restarts.

const oneDayMs = 24 * 60 * 60 * 1000;
const requestTimesByVisitor = new Map();
let requestTimesForEveryone = [];

function keepRecent(times, now) {
  return times.filter((time) => now - time < oneDayMs);
}

// The visitor's address, as passed on by the hosting service.
export function getVisitorId(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

// Returns { allowed: true } and records the request, or { allowed: false, message }.
export function checkPlanAllowance(visitorId, now = Date.now()) {
  const { plansPerVisitorPerDay, plansPerDayForEveryone } =
    siteConfig.rateLimit;

  requestTimesForEveryone = keepRecent(requestTimesForEveryone, now);
  const visitorTimes = keepRecent(
    requestTimesByVisitor.get(visitorId) ?? [],
    now,
  );

  if (requestTimesForEveryone.length >= plansPerDayForEveryone) {
    return {
      allowed: false,
      message:
        "We have made a lot of plans today and need a rest. Please try again tomorrow.",
    };
  }
  if (visitorTimes.length >= plansPerVisitorPerDay) {
    return {
      allowed: false,
      message: `You have made ${plansPerVisitorPerDay} plans in the last day. Please try again tomorrow.`,
    };
  }

  visitorTimes.push(now);
  requestTimesByVisitor.set(visitorId, visitorTimes);
  requestTimesForEveryone.push(now);
  return { allowed: true };
}
