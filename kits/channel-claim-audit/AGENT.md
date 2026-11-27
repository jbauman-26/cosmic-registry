# Channel claim audit runbook

Goal: show the owner which ad platforms claim more than the store can explain, so budget follows what Shopify recorded, not what each platform says about itself.

What this kit touches:
- Reads verified metrics and, where a step says so, warehouse rows.
- Writes nothing, sends nothing and changes nothing on any platform.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Check the sources. Tool: `data_status` in the Cosmic app. Terminal: `lifecycle status --format json`. If a source this kit needs was last synced more than 2 days ago, ask the owner to sync from the Connections screen, or run `lifecycle sync` in a terminal, before going on.
2. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. Name any failed check to the owner before the first number.
3. Call `metric` for `shopify_net_revenue`, `shopify_orders`, `returning_order_share`, `meta_ad_spend`, `meta_reported_roas` and `meta_attributed_purchases` with `days` 30 and 90.
4. Meta's claimed revenue: `meta_reported_roas` times `meta_ad_spend`, labeled calculated. If Google Ads is connected, call `explore_schema`, then `query` on `fact_google_ads_campaign_daily` for the sum of conversion value over the same windows, using only columns it lists. Platforms not connected are written "not connected", never zero.
5. Claim ratio for each platform and for all together: claimed revenue divided by Shopify net revenue, for 30 and 90 days, labeled calculated.
6. Run four checks per platform and mark each pass, watch or fail with its two numbers: (a) its 30-day claim ratio is within a quarter of its 90-day ratio; (b) with `query` on `fact_orders_daily` and the platform's daily table, its weekly spend and Shopify net revenue moved the same way in at least 5 of the last 8 weeks; (c) its claimed share of revenue is no more than the share from new orders (1 minus `returning_order_share`), since a platform that claims more than new buyers explain is counting returning ones; (d) its claimed purchases are not above Shopify orders on any day of the last 30.
7. Ask the owner once whether any platform was paused for a week or more in the last 6 months. If so, compare Shopify net revenue in those weeks with the weeks around them, labeled a comparison, not proof.
8. A platform with two or more fails gets one line: its numbers should not drive budget this month, and a holdout test (see the `holdout-planner` kit) is the way to settle it.
9. Write the summary in the shape of `files/claim-audit.md`.
10. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Never say a platform caused sales. Only a holdout test settles that.
- Name each platform's attribution setting beside its number.
- Every number is a `metric` value, a `query` row, the owner's own figure with its date, or arithmetic on those labeled "calculated". A missing number is written [NEEDS NUMBER].
- Platform figures are that platform's own claim, labeled so, and are never added to store revenue.
- This kit sends nothing and changes nothing on any platform.
- Customer names, emails and addresses are never read or written.

## Verify

- [ ] Every claim ratio is labeled calculated and has its window.
- [ ] Each platform has all four checks, or says why one could not run.
- [ ] Every number is a metric value, a query row or the owner's figure, or is labeled calculated.
- [ ] Nothing was sent or changed.
- [ ] The summary passed the editing standard at 16 of 20 or better.
