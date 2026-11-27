# Contribution margin waterfall runbook

Goal: show the owner what each order really leaves after every cost, which layer of margin moved, and what is left out of the count.

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
3. Call `list_metrics`. If `contribution_margin` is not listed, no costs are set yet: say the owner can add product costs, shipping and payment fees in the Cosmic app's Usage screen or with `lifecycle costs set`, write [NEEDS NUMBER] for every margin line, and stop.
4. Call `metric` for `contribution_margin` with `days` 30, 60 and 90. Terminal: `lifecycle metrics run contribution_margin --days 30 --format json`. Keep `total`, `included`, `missing`, `orders_without_cost` and the trust line. The 30 days before are the 60-day total minus the 30-day total, labeled "calculated from two metric runs".
5. Print the waterfall for each window in this order, in money and as a share of net revenue: net revenue; minus product costs, margin after product costs; minus shipping, minus payment fees, margin after shipping and fees; minus ad spend, margin after ad spend.
6. Name the layer whose share of net revenue moved most between the 30 days before and the last 30, with both shares. Give no cause.
7. Break-even return on ad spend: 1 divided by margin after shipping and fees as a share of net revenue, labeled calculated.
8. Say what is left out: the `missing` line, and the share of orders without a product cost. When orders without a cost are over 5 percent, say the waterfall overstates margin.
9. Write the summary in the shape of `files/waterfall.md`.
10. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Use the `total` each metric returned. Never add up the daily rows yourself.
- No judgement that a margin is good or bad for a store of this kind.
- Every number is a `metric` value, a `query` row, the owner's own figure with its date, or arithmetic on those labeled "calculated". A missing number is written [NEEDS NUMBER].
- Platform figures are that platform's own claim, labeled so, and are never added to store revenue.
- This kit sends nothing and changes nothing on any platform.
- Customer names, emails and addresses are never read or written.

## Verify

- [ ] The waterfall shows all three margin layers for 30 days, the 30 before and 90 days, or says costs are not set.
- [ ] The included and missing lines and the share of orders without a cost are on the page.
- [ ] Every number is a metric value, a query row or the owner's figure, or is labeled calculated.
- [ ] Nothing was sent or changed.
- [ ] The summary passed the editing standard at 16 of 20 or better.
