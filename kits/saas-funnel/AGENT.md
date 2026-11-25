# SaaS funnel and churn runbook

Goal: one monthly page of a subscription business's funnel and retention, every number a verified metric checked against Stripe, with the trust line first.

What this kit touches:
- Reads verified metrics and the reconcile result.
- Writes nothing, sends nothing and changes nothing in Stripe or any ad account.
- Costs nothing from a provider.
- Needs no approval, because it only reads.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Call `workspace`. Terminal: `lifecycle workspace show --format json`. If the reference is not `stripe`, say so at the top: these numbers are not checked against billing.
2. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. If `stripe_daily_complete` or `subscriptions_balance` failed, name it before the first number: churn and revenue are built on those tables.
3. Call `metric` with `days` 30, then 90, for: `ga4_sessions`, `visit_to_paid_rate`, `stripe_new_customers`, `stripe_subscriptions_started`, `stripe_subscriptions_ended`, `stripe_subscription_churn_rate`, `stripe_failed_payment_rate`, `stripe_net_revenue`, `stripe_net_new_mrr`. Terminal: `lifecycle metrics run NAME --days 30 --format json`.
4. Call `metric` once for `stripe_mrr` and `stripe_arpa`. They ignore the window: say "at the last sync".
5. If Meta Ads is connected, run `cost_per_new_customer` for 30 and 90 days, labeled "blended".
6. A `no_data` result goes under "Not available" with the reason it gave. `stripe_net_new_mrr` has no value until a sync exists from before the window: say that, not zero.
7. Write the page in the shape of `files/funnel-summary.md`. The first line is the trust line from the last `metric` call, word for word.
8. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Verified metrics only. No LTV: there is no verified metric for it, and Stripe's own figure is not one.
- Churn here is subscriptions, not revenue. Say "subscription churn".
- Cost per new customer is blended: all new customers, Meta spend only.
- No forecast, no target, no judgement of whether a number is good.

## Verify

- [ ] The first line is the trust line, word for word.
- [ ] `reconcile` ran, and a failed Stripe check is named before the first number.
- [ ] Every number carries its metric name, and none is custom SQL.
- [ ] MRR and ARPA say "at the last sync".
- [ ] Cost per new customer is labeled blended, or listed under "Not available".
- [ ] Nothing was sent or changed.
- [ ] The page passed the editing standard at 16 of 20 or better.
