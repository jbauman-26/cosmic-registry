# Meta ads diagnosis runbook

Goal: find the one thing holding a Meta ad account back, prove it with numbers, and tell the owner what to do first. The account is judged on one number: what the business keeps from the cash it collects, per dollar of ad spend. Every other metric only helps find what is breaking that number.

What this kit touches:
- Reads synced daily Meta totals through verified metrics, plus one custom query for the campaign table.
- Reads funnel numbers (leads, booked calls, shows, qualified shows, closes, cash collected, contracted value) from the owner or from a source the owner already connected.
- Writes nothing and changes nothing in Meta or anywhere else.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Check the sources. Tool: `data_status` in the Cosmic app. Terminal: `lifecycle status --format json`. Meta must be connected and synced within 2 days. If Meta is not connected, stop and tell the owner. If it is stale, ask the owner to sync from the Connections screen, or run `lifecycle sync`, before going on.
2. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. Name any failed check to the owner before any number.
3. Call `list_metrics` and confirm `meta_ad_spend` is there. Call `metric` for `meta_ad_spend` with `days` set to 7 and then 28. Terminal: `lifecycle metrics run meta_ad_spend --days 7 --format json`. Keep each value, since date, notes and trust line. A `no_data` result is reported as missing, never as zero.
4. Build the campaign table. Call `explore_schema` first and use only columns it lists for `fact_meta_ads_daily`. Then call `query` with this, putting in the since date the 7-day metric returned, and adding reach, leads or link clicks only if `explore_schema` lists them:
   `SELECT campaign_name, sum(spend) AS spend, sum(impressions) AS impressions, sum(clicks) AS clicks FROM fact_meta_ads_daily WHERE date >= 'SINCE' GROUP BY campaign_name ORDER BY spend DESC LIMIT 15`
   Terminal: `lifecycle query "..." --format json`. Work out CTR (clicks / impressions x 100) and CPM (spend / impressions x 1000) per row and label them "calculated". Tell the owner the table came from custom SQL, and show the SQL.
5. Get the funnel numbers for the same 7 and 28 days: leads, booked calls, shows, qualified shows, closes, cash collected in 30 days, contracted value, and disqualified calls. If the owner connected Stripe, cash collected may come from the `saas-funnel` kit's metrics. If HubSpot is connected, leads and deals may come from the `weekly-pipeline` kit's metrics. Otherwise ask the owner for them in one message. Label every number with its source: "Meta", "Stripe", "HubSpot" or "owner reported". A number nobody gave you is written [NEEDS NUMBER].
6. Ask the owner once for the inputs contribution margin needs: commission rates, direct delivery cost per customer, refund rate, and the monthly cash or credit ceiling for ads. If they do not have them, contribution margin is [NEEDS NUMBER] and the report says so under Gaps.
7. Work out Layer 1 with the formulas in `files/benchmarks.md`: front-end cash ROAS, contracted ROAS, cost per acquisition and contribution margin. Label each "calculated" and show the two numbers it came from.
8. Find the constraint. Go top down and stop at the first stage that fails its target in `files/benchmarks.md`:
   - If front-end cash ROAS meets the target, the verdict is hold the ads. Report Layer 2 and 3 misses as things to watch, and do not recommend changing ads because of them.
   - Cost per lead high: look at link CTR and CPM. Low CTR points at the creative or hook. High CPM with normal CTR points at audience, competition or creative quality. Frequency over 3 with cost per lead rising for 3 days running points at fatigue.
   - Booked calls under 60% of leads: check speed to lead (every lead called within 5 minutes) and follow-up on leads who did not book.
   - Show rate under 65%: shorten the booking window to 48 to 72 hours, confirm by phone at booking and on the morning of the call, and add a pre-call video and add-to-calendar on the thank-you page. Fix this before any added spend.
   - Disqualified calls over 35%: check call recordings before blaming targeting, and test a soft qualifier before a hard one. A hard qualifier can raise cost per qualified call by cutting volume.
   - Close rate on qualified shows under 20%: this is a sales problem. Say so, recommend no ad changes, and list it under Hand to a person.
   - Every stage on target: the verdict is scale, and say what must be true first (see Rules).
   Name one constraint. If two stages fail, name the one further down the funnel when it is shows or closes, and the first one otherwise.
9. Make the campaign calls. For each campaign: keep, watch, refresh or kill, with the number behind it. Kill only when it has spent 3 to 5 times its target cost per result over 4 to 6 days with nothing to show, or spent about $200 with CTR under 1% and no leads. Refresh when cost per result has risen and volume has fallen 3 days running. Never call kill on a campaign whose cash ROAS meets the target.
10. Write the report in the shape of `files/diagnosis-report.md`, in this order: verdict, constraint, sync times, Layer 1, funnel by stage, campaigns, Meta's own claims under the warning below, action plan with who and by when, hand to a person, gaps.
11. Put this warning above any Meta-reported purchases, leads or ROAS, word for word: "Meta's purchases, leads and ROAS are Meta's own claim about its own ads, counted in its own attribution window. Do not add them to revenue from any other source."
12. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Never recommend turning off a campaign that meets its cash ROAS target.
- Recommend scaling only when all are true: cash ROAS at or near target, contribution margin at 1.0x of spend or better if known, show rate at 50% or more, room on the sales calendar, cash or credit to cover 30 to 60 days of spend, and new creative ready. Raise budgets 10% to 30% a day, never more than 30% at once.
- Anything the owner might change in Meta is a recommendation only. Campaigns an agent builds later start paused, and a person publishes them.
- Put these under Hand to a person: close rate on qualified shows under 20%, disqualified calls over 50%, an account or payment method flagged, cash that cannot cover 30 days of planned spend, a campaign at 2 times its target cost with no result.
- Every number comes from a `metric` or `query` result, from a labeled source, or is marked as calculated from two of them. A missing number is written [NEEDS NUMBER].
- Never say an ad caused a sale.
- Do not report windows shorter than 7 days. The ad account keeps its own time zone.
- Customer names, emails and phone numbers are never read or written. Ask for counts, never lists of people.

## Verify

- [ ] Meta was connected and synced within 2 days, or the report says it was stale.
- [ ] `reconcile` ran, and every failed check is named above the numbers.
- [ ] Every number is from a `metric` or `query` result, has a source label, or is labeled "calculated" with its two inputs shown.
- [ ] Exactly one constraint is named, with the metric, its value and its target.
- [ ] If cash ROAS met its target, the report recommends no ad changes from Layer 2 or 3 misses.
- [ ] No campaign meeting its cash ROAS target is called kill.
- [ ] The campaign table is labeled as custom SQL, with the SQL shown.
- [ ] Meta's own claims sit under the word-for-word warning and are never added to other revenue.
- [ ] Every [NEEDS NUMBER] appears under Gaps.
- [ ] The report passed the editing standard at 16 of 20 or better.
