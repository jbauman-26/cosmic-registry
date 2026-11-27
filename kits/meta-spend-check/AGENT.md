# Meta spend check runbook

Goal: tell the owner what Meta spent in the last 7 days, what the store took in over the same days, and what Meta claims for itself, without ever mixing the last two.

What this kit touches:
- Reads synced daily totals from Shopify and Meta Ads through verified metrics, plus one custom query for the campaign table.
- Writes nothing and changes nothing in Meta or Shopify.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Check the sources. Tool: `data_status` in the Cosmic app. Terminal: `lifecycle status --format json`. With neither, call `query` with `SELECT source, max(finished_at) AS last_sync FROM meta_sync_run WHERE status <> 'failed' GROUP BY source`. Shopify and Meta must both be connected and synced. If Meta is not connected, stop and tell the owner. If either was last synced more than 2 days ago, ask the owner to sync from the Connections screen, or run `lifecycle sync` in a terminal, before going on.
2. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. If a check failed, name it to the owner before any number. No check compares Meta with another source, so say in the summary that Meta's spend is read from Meta and is not cross-checked.
3. Call `list_metrics` and confirm these six names are there: `meta_ad_spend`, `shopify_net_revenue`, `shopify_orders`, `marketing_efficiency_ratio`, `meta_reported_roas`, `meta_attributed_purchases`. If the Meta ones are missing, the CLI is older than 0.11.0. Stop and say so.
4. Call `metric` for each of the six, and for `returning_order_share`, with `days` set to 7, then 14, then 28. Terminal: `lifecycle metrics run NAME --days 7 --format json`. Keep each result's value, numerator, denominator, since date, notes and trust line. A result with status `no_data` is reported as missing, never as zero.
5. Work out the prior 7 days from the 14-day and 7-day results, and label every figure made this way "calculated from two metric runs".
   - Spend, net revenue, orders and Meta purchases: the 14-day value minus the 7-day value.
   - The two ratios: the 14-day numerator minus the 7-day numerator, divided by the 14-day denominator minus the 7-day denominator. If the bottom number is zero, write "no spend" and give no ratio.
6. Marginal return. If spend in the last 7 days differs from the prior 7 by 15 percent or more, work out the change in Shopify net revenue divided by the change in spend, labeled "calculated from two metric runs". If spend moved less than that, say the two weeks are too close to read a marginal return. Say it compares two weeks and does not prove Meta caused the difference.
7. New against returning. New orders are `shopify_orders` times 1 minus `returning_order_share`, labeled calculated. Ad spend per new order is `meta_ad_spend` divided by new orders, for 7 and 28 days. Spend that rose while new orders stayed flat bought mostly returning customers. If `contribution_margin` is in `list_metrics`, put break-even spend per new order beside it: `average_order_value` times the after-fees margin share.
8. Build the campaign table. Call `explore_schema` first and use only columns it lists. Then call `query` with this, putting in the since date the 7-day metric returned:
   `SELECT campaign_name, sum(spend) AS spend, sum(impressions) AS impressions, sum(clicks) AS clicks, sum(purchases) AS meta_purchases, sum(purchase_value) AS meta_purchase_value FROM fact_meta_ads_daily WHERE date >= 'SINCE' GROUP BY campaign_name ORDER BY spend DESC LIMIT 15`
   Terminal: `lifecycle query "..." --format json`. Tell the owner this table came from custom SQL, and show the SQL.
9. Write the summary in the shape of `files/spend-summary.md`, in this order: the trust line word for word, the age of each source, spend and store revenue with the marketing efficiency ratio, then Meta's own numbers in their own block under the warning below, then the campaign table.
10. Put this warning above Meta's block, word for word: "Meta's purchases and ROAS are Meta's own claim about its own ads, counted in its own attribution window. They are not orders. Do not add them to Shopify revenue or to email revenue."
11. List up to three things worth a look, each with the two numbers that raised it. Good candidates: spend rose while the efficiency ratio fell, a campaign spent money and Meta credits it with no purchases, or a metric note says the store and the ad account may use different currencies. Do not say what caused any of them.
12. Copy the notes each metric returned into the summary where they apply. The one on the efficiency ratio always applies: only Meta spend is counted, so the true ratio is lower if other paid channels run.
13. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Never add Meta's purchase value to Shopify revenue, and never show Meta's ROAS without the word "reported" beside it.
- Never say an ad or campaign caused a sale. The efficiency ratio sets all store revenue over ad spend and attributes nothing.
- Every number comes from a `metric` or `query` result, or is marked as calculated from two of them. A missing number is written [NEEDS NUMBER].
- A single day can differ between Meta and Shopify because the ad account keeps its own time zone. Do not report windows shorter than 7 days.
- This kit changes nothing. If the owner asks for a budget or campaign change, that is a separate request under the Meta connection's access setting.

## Verify

- [ ] Shopify and Meta were both connected and synced within 2 days, or the summary says which one was stale.
- [ ] `reconcile` ran, and every failed check is named above the numbers.
- [ ] The trust line is quoted word for word at the top.
- [ ] Every number in the summary appears in a `metric` or `query` result, or is labeled "calculated from two metric runs".
- [ ] Meta's purchases and reported ROAS sit in their own block under the word-for-word warning.
- [ ] No sentence adds Meta's purchase value to any other revenue.
- [ ] The campaign table is labeled as custom SQL, with the SQL shown.
- [ ] The summary says Meta's spend is not cross-checked against another source.
- [ ] The summary passed the editing standard at 16 of 20 or better.
- [ ] A marginal return is shown only when spend moved 15 percent or more, and is labeled calculated.
- [ ] Ad spend per new order is shown, labeled calculated.
