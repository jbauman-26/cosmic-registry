# Weekly numbers runbook

Goal: give the owner one Monday page they can trust, built only from verified metrics, that says first whether the numbers passed their checks and how old each source is.

What this kit touches:
- Reads verified metrics from every connected source.
- Writes nothing, sends nothing and changes nothing on any platform.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Get each source's last sync. Tool: `data_status` in the Cosmic app. Terminal: `lifecycle status --format json`. With neither, call `query` with `SELECT source, max(finished_at) AS last_sync FROM meta_sync_run WHERE status <> 'failed' GROUP BY source`. That one query is the only custom SQL this kit allows.
2. If a connected source was last synced more than 2 days ago, say so at the top of the summary. In the app, ask the owner to sync from the Connections screen, since an agent there cannot start a sync. In a terminal, run `lifecycle sync`, then start again from step 1.
3. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. Keep every check's name, status and detail line.
4. Mind the call limit. In the Cosmic app one run makes at most 25 warehouse calls. Run the six reads the margin and ad checks need first (`contribution_margin`, `meta_ad_spend`, `meta_reported_roas`, `shopify_net_revenue`, `shopify_orders` and `returning_order_share`, each for 7 and 28 days, plus `shopify_orders` and `shopify_net_revenue` for 14), then the rest in the order of step 9. Whatever the limit cuts goes under "Not available" with the reason.
5. Call `list_metrics`. Terminal: `lifecycle metrics list --format json`. Use only names it returns. Leave out any metric that needs a source that is not connected, and list it under "Not available".
6. Call `metric` for each remaining name with `days` set to 7, then 28. Terminal: `lifecycle metrics run NAME --days 7 --format json`. Keep the value, numerator, denominator, unit, notes and trust line. A result with status `no_data` goes under "Not available" with the reason it gave. It is never shown as zero.
7. For plain totals only, add the prior 7 days. A plain total is a count or a dollar metric whose result has no numerator. Call it again with `days` set to 14, and the prior 7 days is the 14-day value minus the 7-day value. Label the column "calculated from two metric runs". Skip this for every ratio and percent, and for `stripe_mrr`, which ignores the window.
8. Write the summary in the shape of `files/weekly-summary.md`. The first line is the trust line from the last `metric` call, word for word. The second block is one line per source with its last sync. Any failed check is named next, before the first number.
9. Group the numbers by source: store, email, site, subscriptions, ads. Put the metric's name in brackets beside each number, so the owner can ask for it again by name.
10. Label attribution every time. Klaviyo flow revenue is "attributed revenue". Meta's purchases and ROAS are "Meta's own claim", in their own block, and are never added to store or email revenue.
11. Add a "Margin and ad checks" block, each line labeled "calculated from metric runs". Skip a line whose metric is not in `list_metrics`, and list it under "Not available". (a) Contribution margin after ad spend: the `contribution_margin` result's after-ads total for 7 and 28 days, with its `included` and `missing` lines. A result with status `no_costs` says the owner can add costs, and gives no margin. (b) Break-even return on ad spend: 1 divided by the after-fees margin as a share of net revenue. (c) Claim ratio: `meta_reported_roas` times `meta_ad_spend`, divided by `shopify_net_revenue`, for 7 and 28 days. Above 1 means Meta claims more than the store took in. (d) Ad spend per new order: `meta_ad_spend` divided by (`shopify_orders` times 1 minus `returning_order_share`). (e) If the owner gave a goal in this conversation, the 28-day figure beside it.
12. Close with at most three lines under "Changed most", each one a metric that moved the furthest between the prior 7 days and the last 7, with both numbers. Give no cause. If a total sits on a small count, say the count.
13. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Verified metrics only. If the owner wants a number with no metric behind it, say there is no verified metric for it and offer to look at it as a separate job.
- Every number is a `metric` value, or the difference of two of them labeled as calculated. A missing number is written [NEEDS NUMBER].
- No forecast, no target and no judgement that a number is good or bad for a store of this size.
- This kit sends nothing. In the app the Schedule can run it each Monday. The kit itself sets up no schedule.
- When the trust line reads "DO NOT TRUST THESE NUMBERS YET", still deliver the page, with that line first and the failed checks under it.

## Verify

- [ ] The first line is the trust line, word for word.
- [ ] Every connected source has a last sync time on the page, and any source older than 2 days is flagged at the top.
- [ ] `reconcile` ran, and every failed check is named before the first number.
- [ ] Every number carries its metric name and appears in a `metric` result, or is labeled "calculated from two metric runs".
- [ ] No custom SQL was used for any number.
- [ ] Metrics with no data are under "Not available", and none is shown as zero.
- [ ] Flow revenue is called attributed revenue, and Meta's numbers sit in their own labeled block.
- [ ] Nothing was sent to anyone.
- [ ] The summary passed the editing standard at 16 of 20 or better.
- [ ] The margin and ad checks block labels every line calculated, or lists it under Not available.
