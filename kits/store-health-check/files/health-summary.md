# Store health check for [BRAND], [DATE]

[The trust line, word for word]

In one line: [the numbers can be trusted today, or what stands in the way]

## Sources

| Source | Connected | Last sync | Last result |
|---|---|---|---|
| Shopify | [yes or no] | [date and time] | [ok, failed, or "could not be read"] |
| Klaviyo | [yes or no] | [date and time] | [result] |
| GA4 | [yes or no] | [date and time] | [result] |
| Stripe | [yes or no] | [date and time] | [result] |
| Meta Ads | [yes or no] | [date and time] | [result] |

## Fix first

1. [What is wrong, in owner words]
   Evidence: [the check's detail line, or the status output]
   Do this: [one action]
   Who: [the owner on the Connections screen, or the command to run]
2. ...
3. ...

Nothing to fix: [write this line alone if every check passed]

## Checks

| Check | Result | What it means here |
|---|---|---|
| Every Shopify order was pulled (orders_complete) | [pass, fail or skipped] | [one sentence with the figures from the detail line] |
| Daily totals match cohorts (orders_vs_cohorts) | [result] | [sentence] |
| Klaviyo sees the same orders (klaviyo_orders) | [result] | [sentence] |
| GA4 sees the same purchases (ga4_purchases) | [result] | [sentence] |
| Flow revenue share is believable (attributed_share) | [pass, warn or skipped] | [sentence] |
| Flow rows match Klaviyo's totals (flow_totals) | [result] | [sentence] |
| Everything synced lately (freshness) | [result] | [sentence] |

## Not checked

- [each skipped check, and the connection that would let it run]
- Meta Ads and Stripe have no cross-check. Their numbers are read from the platform and are not compared with another source.
