# Holdout test planner runbook

Goal: give the owner a written test plan that would show what a flow or a channel truly adds, sized so the store's own order volume can answer it.

What this kit touches:
- Reads verified metrics.
- Writes nothing and starts nothing. The plan is for the owner to set up.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Check the sources. Tool: `data_status` in the Cosmic app. Terminal: `lifecycle status --format json`. If a source this kit needs was last synced more than 2 days ago, ask the owner to sync from the Connections screen, or run `lifecycle sync` in a terminal, before going on.
2. Ask the owner which question to answer: what the welcome email flow adds, or what one ad channel adds. Pick the matching design below.
3. Call `metric` for `shopify_orders`, `shopify_net_revenue` and `returning_order_share` with `days` 28. For a welcome flow, also `klaviyo_placed_orders` and `flow_attributed_revenue` if listed.
4. Welcome email holdout: a random 10 percent of new subscribers get no welcome emails for the test. The number to read is orders per subscriber within 30 days of signing up, held-out group against the rest. Size: about 16 divided by (the expected difference squared) times the base rate times (1 minus the base rate) subscribers in the smaller group, labeled "rough size, calculated". Say how many weeks of sign-ups that takes at the current rate.
5. Channel region holdout: hold back the channel's ads in a set of regions that together make up 10 to 20 percent of Shopify net revenue, matched to the rest on their past 8 weeks. The number to read is Shopify net revenue per week, held-out regions against the rest, against the same gap before the test. Run at least 4 weeks, longer when weekly revenue swings more than a fifth.
6. If the store cannot reach the size in 8 weeks, say so plainly and offer the smaller test that it can reach, with the bigger difference it would be able to detect.
7. Write the decision rule before the test starts: what result means keep, cut or test again. Write the date the result gets read.
8. Write the plan in the shape of `files/holdout-plan.md`.
9. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- The plan is written before the test starts and never changed after it starts.
- Name the risk: held-out customers or regions may buy less during the test, and say roughly how much revenue is at stake from the 28-day figures.
- Every number is a `metric` value, a `query` row, the owner's own figure with its date, or arithmetic on those labeled "calculated". A missing number is written [NEEDS NUMBER].
- Platform figures are that platform's own claim, labeled so, and are never added to store revenue.
- This kit sends nothing and changes nothing on any platform.
- Customer names, emails and addresses are never read or written.

## Verify

- [ ] The plan has the split, the duration, the one number, the size and the decision rule.
- [ ] Revenue at stake is shown, labeled calculated.
- [ ] Every number is a metric value, a query row or the owner's figure, or is labeled calculated.
- [ ] Nothing was sent or changed.
- [ ] The summary passed the editing standard at 16 of 20 or better.
