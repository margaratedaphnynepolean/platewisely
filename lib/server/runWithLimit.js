// Runs one async job per item, but only "limit" of them at the same time.
// Results come back in the same order as the items, like Promise.all.
// This keeps us under the free Gemini plan's requests-per-minute limit.
export async function runWithLimit(items, limit, runJob) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await runJob(items[index], index);
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}
