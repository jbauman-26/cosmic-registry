# Meta spend check for [BRAND], week to [DATE]

Trust line: [copy the trust line word for word]
Failed checks: [each one named, or "none"]
Synced: Shopify [date and time], Meta Ads [date and time]
Meta's spend is read from Meta and is not cross-checked against another source.

## Spend against store revenue

| | Last 7 days | Prior 7 days (calculated from two metric runs) | Last 28 days |
|---|---|---|---|
| Meta ad spend (meta_ad_spend) | [$] | [$] | [$] |
| Shopify net revenue (shopify_net_revenue) | [$] | [$] | [$] |
| Shopify orders (shopify_orders) | [n] | [n] | [n] |
| Marketing efficiency ratio (marketing_efficiency_ratio) | [x] | [x] | [x] |

The efficiency ratio is all Shopify net revenue divided by Meta spend. It attributes nothing. Only Meta spend is counted, so the true ratio is lower if other paid channels run.

## What Meta says about itself

Meta's purchases and ROAS are Meta's own claim about its own ads, counted in its own attribution window. They are not orders. Do not add them to Shopify revenue or to email revenue.

| | Last 7 days | Prior 7 days (calculated from two metric runs) | Last 28 days |
|---|---|---|---|
| Meta attributed purchases (meta_attributed_purchases) | [n] | [n] | [n] |
| Meta reported ROAS (meta_reported_roas) | [x] | [x] | [x] |

## Campaigns, last 7 days

From custom SQL, not a verified metric: [the SQL]

| Campaign | Spend | Impressions | Clicks | Purchases Meta claims | Purchase value Meta claims |
|---|---|---|---|---|---|
| [name] | [$] | [n] | [n] | [n] | [$] |

## Worth a look

1. [What changed], [the two numbers that show it]

## Notes from the metrics

- [each note that applies, as returned]

## Not available

- [any metric that returned no_data, and the source it is missing]
