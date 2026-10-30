# PlateWisely: Ready to ship?

**Short answer:** Yes for a small private test with a few people. Not yet for a public launch.

## What works today

- Pick a household and diet (veg, veg + eggs, non-veg, both), then pick ingredients.
- A 7-day plan (breakfast, lunch, dinner, snacks) is made by Gemini in about 2 minutes. It is checked for diet, avoid-list, repeated dishes and speed, and a plan that fails the checks is never shown.
- The plan can be downloaded as a PDF (2 pages, A4 landscape) and the grocery list as a PDF (A4 portrait, with tick boxes).
- The production build succeeds and lint is clean.

## What has NOT been checked

- The screens and the two PDF download buttons were never checked by me in a real browser (the browser tools kept dropping). Click through everything yourself before sharing a link.
- Real wait times when Gemini stalls. Retries can add 1 to 2 minutes to the usual 2.
- The progress bar is tuned to 60 seconds, so it may look stuck on slow runs.

## Must do before sharing a link

| # | Task | Why | Where |
|---|------|-----|-------|
| 1 | Add a per-visitor daily limit on plan requests | Stops anyone using up your quota or running up a bill | `app/api/meal-plan/route.js`, number in `config/siteConfig.js` |
| 2 | Rotate the Gemini API key | It was pasted into chat twice | Make a new key; keep it only in `.env.local` and the host's settings, never in code |
| 3 | Decide on the AI plan | The free Gemini plan allows about 20 requests a day per model, and one plan needs at least 7, so about 2 plans a day in total | Free is fine for you plus one or two friends; use a paid key for more |

## Switching to Anthropic later

Change two things:

1. The model call in `lib/server/generateDayPlan.js` (the only file that talks to the AI).
2. The model name under `ai` in `config/siteConfig.js`.

## Deploying

- Simplest host for this Next.js app: Vercel.
- A plan takes about 2 minutes. `maxDuration = 300` is set on the plan route, but check what your host's plan allows for request length before choosing.
- Add the API key in the host's environment settings (see `.env.example` for the name).
- Do not deploy or push until the three must-dos above are done.

## Can wait until after launch

- Service worker and install prompt (the manifest and icons already exist, so the full "install on phone" feel is missing)
- Swap one dish
- Sign-in and a database
- Saved menus (you chose not to build this for now)
- Automated tests (`npm test`)
- `npm audit` warnings, which come from the Next 14 dependencies
- Re-enabling the daily protein and fibre minimums: set `nutrition.mustMeetDailyMinimums` to `true` in `config/siteConfig.js`

## Run it locally

```bash
cd platewise
npm install
npm run dev      # open http://localhost:3000
npm run lint     # check the code
npm run build    # make the production version
```

## Suggested order

1. Click through the whole app in a browser, including both PDF buttons.
2. Add the rate limit.
3. Rotate the key.
4. Deploy a private test version and share it with a few friends.
5. Fix what they find, then think about a paid key and a wider launch.
