# Ad claims check runbook

Goal: one page that sets what Meta claims beside what the workspace's source of truth recorded on the same days, with the gap stated and nothing added together that should not be.

What this kit touches:
- Reads verified metrics and the reconcile result.
- Writes nothing, sends nothing and changes nothing in any ad account.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Call `workspace`. Terminal: `lifecycle workspace show --format json`. Note the type and the reference. If the reference is `none`, stop after step 2 and tell the owner which source of truth to connect: this check needs one.
2. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. Keep the `ad_claims` check whole: its status, expected (the reference's count), actual (Meta's claim) and detail line. If it is `skipped`, say why in its own words.
3. Call `metric` with `days` 7 and 28 for `meta_ad_spend`, `meta_attributed_purchases`, `meta_reported_roas`, `meta_cpc` and `meta_ctr`. Terminal: `lifecycle metrics run NAME --days 7 --format json`.
4. Then the numbers with no claim in them, by reference:
   - Stripe: `stripe_new_customers`, `stripe_net_revenue`, `cost_per_new_customer`, `stripe_efficiency_ratio`.
   - Shopify: `shopify_orders`, `shopify_net_revenue`, `marketing_efficiency_ratio`.
   - HubSpot: `crm_new_leads`, `cost_per_lead`, and skip the claims table.
   - GA4: `ga4_sessions`, `ga4_purchase_rate`.
   A `no_data` result goes under "Not available", never as zero.
5. Write the page in the shape of `files/claims-summary.md`. The first line is the trust line from the last `metric` call, word for word. The second is the `ad_claims` detail, word for word.
6. State the gap once, in this form: "Meta claims N purchases; [reference] recorded M on the same days." Give the ratio only if both are above zero. Then one sentence on why they differ that the notes support: Meta counts its own attribution window and view-throughs. Do not guess at any other cause.
7. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Meta's purchases, purchase value and ROAS are "Meta's own claim" every time, in their own block. Never add them to revenue from any source.
- The claim-free numbers come from the reference source and Meta spend only. Say which.
- Do not call a gap a failure or a fraud. A warning on `ad_claims` means the claim is far above the record, nothing more.
- No recommendation to change a budget. If the owner asks, that is a separate job with its own approval.

## Verify

- [ ] The first line is the trust line, and the second the `ad_claims` detail, both word for word.
- [ ] Meta's claims sit in their own labeled block and are added to nothing.
- [ ] The gap sentence names both numbers and the reference.
- [ ] Every number carries its metric name, and none is custom SQL.
- [ ] Metrics with no data are under "Not available".
- [ ] Nothing was sent or changed.
- [ ] The page passed the editing standard at 16 of 20 or better.
