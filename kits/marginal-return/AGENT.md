# Marginal return runbook

Goal: tell the owner whether the extra dollars in a channel still pay for themselves, by comparing two spend levels on Shopify's numbers instead of the platform's average return.

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
3. Ask the owner which channel to read if more than one is connected: Meta, or Google Ads when it is connected. One channel per run.
4. Call `explore_schema`, then `query` for weekly spend from the channel's daily table (`fact_meta_ads_daily` or `fact_google_ads_campaign_daily`) and weekly net revenue and orders from `fact_orders_daily`, over the last 8 full weeks. Use only columns it lists.
5. Split the weeks into two spend levels: the lower half and the upper half by spend. A read needs at least 2 weeks in each and average weekly spend at least 15 percent apart. If not, say the spend did not vary enough, give hold, and suggest one step up of at most 20 percent to create a second level.
6. Between the two levels, work out extra weekly spend, extra net revenue and extra orders. Marginal return is extra net revenue over extra spend, labeled calculated.
7. If `contribution_margin` is in `list_metrics`, call `metric` for it with `days` 28. Break-even return is 1 divided by margin after shipping and fees as a share of net revenue. Marginal margin after ads: extra net revenue times that share, minus extra spend. Both calculated. Without it, write [NEEDS NUMBER] and give no scale call.
8. Check what else moved: weeks with a sale or a holiday, discount share from `fact_orders_daily`, an email send the owner mentions. If any fall in one level only, say the comparison cannot be read as caused by the channel alone.
9. Give one call: scale when marginal margin after ads is positive, cut when it is negative, hold otherwise. Any change is a plan for the owner, at most 20 percent per step, with the date to read it again 7 days later.
10. Write the summary in the shape of `files/marginal-return.md`.
11. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- The platform's own return is shown, never used to make the call.
- Compare levels; never claim the spend caused the difference.
- Every number is a `metric` value, a `query` row, the owner's own figure with its date, or arithmetic on those labeled "calculated". A missing number is written [NEEDS NUMBER].
- Platform figures are that platform's own claim, labeled so, and are never added to store revenue.
- This kit sends nothing and changes nothing on any platform.
- Customer names, emails and addresses are never read or written.

## Verify

- [ ] Both spend levels are shown with their weeks and averages.
- [ ] The call follows marginal margin after ads, or is hold with the reason.
- [ ] Every number is a metric value, a query row or the owner's figure, or is labeled calculated.
- [ ] Nothing was sent or changed.
- [ ] The summary passed the editing standard at 16 of 20 or better.
