# Cash cycle and weeks of cover runbook

Goal: show the owner where cash sits: days of stock, days to get paid, days to pay suppliers, and whether stock on hand covers the supplier's lead time.

What this kit touches:
- Reads verified metrics and, where a step says so, warehouse rows.
- Writes nothing, sends nothing and changes nothing on any platform.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Check the sources. Tool: `data_status` in the Cosmic app. Terminal: `lifecycle status --format json`. If a source this kit needs was last synced more than 2 days ago, ask the owner to sync from the Connections screen, or run `lifecycle sync` in a terminal, before going on.
2. Ask the owner, in one message, for four figures and the date of each: stock value at cost, the days the store takes to pay suppliers, the supplier lead time in weeks, and the days Shopify payouts take to land. Write [NEEDS NUMBER] for any they do not have.
3. If `cogs` is in `list_metrics`, call `metric` for it with `days` 90. Terminal: `lifecycle metrics run cogs --days 90 --format json`. If it is not listed, product costs are not set: say so and write [NEEDS NUMBER] for every line that needs it.
4. Daily cost of goods sold: the 90-day `cogs` total divided by 90. Days of stock: stock value at cost divided by that. Weeks of cover: days of stock divided by 7. Each labeled calculated.
5. Cash cycle in days: days of stock plus payout days minus the days the store takes to pay suppliers, labeled calculated. Explain each part in one plain line.
6. Compare weeks of cover with the lead time. Below the lead time is a stock-out risk. Above twice the lead time is cash sitting on shelves. Say which, with both numbers.
7. Write the summary in the shape of `files/cash-cycle.md`.
8. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Stock value is the owner's figure at cost, never at retail price.
- No forecast and no advice on financing.
- Every number is a `metric` value, a `query` row, the owner's own figure with its date, or arithmetic on those labeled "calculated". A missing number is written [NEEDS NUMBER].
- Platform figures are that platform's own claim, labeled so, and are never added to store revenue.
- This kit sends nothing and changes nothing on any platform.
- Customer names, emails and addresses are never read or written.

## Verify

- [ ] The four owner figures are shown with their dates, or as [NEEDS NUMBER].
- [ ] The cash cycle shows its three parts.
- [ ] Every number is a metric value, a query row or the owner's figure, or is labeled calculated.
- [ ] Nothing was sent or changed.
- [ ] The summary passed the editing standard at 16 of 20 or better.
