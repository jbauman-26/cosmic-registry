# Weekly pipeline numbers runbook

Goal: one Monday page of B2B pipeline numbers the owner can trust, each from a verified metric, with the trust line first and lead source shown as it really is.

What this kit touches:
- Reads verified metrics and one breakdown query from the workspace.
- Writes nothing, sends nothing and changes nothing in HubSpot or any ad account.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Call `workspace`. Terminal: `lifecycle workspace show --format json`. If the reference is not `hubspot`, say so at the top of the page: the numbers will not be checked against the CRM.
2. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. Keep every check's name, status and detail. If `deals_complete` or `contacts_complete` failed, the pull missed records: say so before the first number.
3. Call `metric` with `days` 7, then 28, for each of: `crm_new_leads`, `crm_deals_created`, `crm_pipeline_created`, `crm_deals_won`, `crm_won_revenue`, `crm_win_rate`, `crm_average_deal_size`, `crm_open_pipeline`, `crm_lead_to_customer_rate`. Terminal: `lifecycle metrics run NAME --days 7 --format json`. Keep value, numerator, denominator, notes and trust.
4. If Meta Ads is connected, also run `cost_per_lead` for 7 and 28 days. A `no_data` result goes under "Not available", never as zero.
5. For leads and pipeline by source, call `query` with exactly this SQL and no other: `SELECT source, sum(deals_created) AS deals, sum(amount_created) AS pipeline FROM fact_crm_deals_daily WHERE date >= CURRENT_DATE - 28 GROUP BY source ORDER BY pipeline DESC`, then `SELECT source, sum(contacts) AS leads FROM fact_crm_contacts_daily WHERE date >= CURRENT_DATE - 28 GROUP BY source ORDER BY leads DESC`. Label both tables "custom SQL, not a verified metric".
6. Add up the share of leads whose source is `UNKNOWN` or `OFFLINE`. If it is more than a quarter of all leads, write one line under the source table: "HubSpot could not place N of M leads. Source numbers above are only as good as that."
7. Write the page in the shape of `files/pipeline-summary.md`. The first line is the trust line from the last `metric` call, word for word. Put each metric's name in brackets beside its number.
8. Close with at most three lines under "Changed most", each a metric that moved the furthest between the prior 7 days (14-day value minus 7-day value, labeled "calculated from two metric runs") and the last 7, for plain counts and amounts only. Give no cause.
9. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Verified metrics only, plus the two source queries in step 5.
- Cost per lead counts every new lead and only Meta spend. Say "blended" beside it, and never call it the cost of a lead Meta brought.
- No forecast, no target, no judgement of whether a number is good.
- When the trust line reads "DO NOT TRUST THESE NUMBERS YET" or the status is `unreferenced`, still deliver the page, with that line first.

## Verify

- [ ] The first line is the trust line, word for word.
- [ ] `reconcile` ran, and every failed check is named before the first number.
- [ ] Every number carries its metric name, or is labeled custom SQL or "calculated from two metric runs".
- [ ] No other custom SQL was used.
- [ ] The UNKNOWN and OFFLINE share is stated when it is over a quarter.
- [ ] Cost per lead is labeled blended, or listed under "Not available".
- [ ] Nothing was sent or changed.
- [ ] The page passed the editing standard at 16 of 20 or better.
