# Store health check runbook

Goal: tell the owner whether today's numbers can be trusted and, if not, the one to three fixes that matter most, in words a store owner uses.

What this kit touches:
- Reads source status and the reconcile checks.
- Writes nothing on any platform. `reconcile` saves its results in the local database.
- Costs nothing from a provider.
- Needs no approval, because it changes nothing. The fixes belong to the owner.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing.

## Steps

1. Get the status of every source. Tool: `data_status` in the Cosmic app. Terminal: `lifecycle status --format json`. With neither, call `query` with `SELECT source, status, max(finished_at) AS last_run FROM meta_sync_run GROUP BY source, status` and say that connection state could not be read. For each source note whether it is connected, when it last synced, and how the last sync ended.
2. In a terminal, also run `lifecycle doctor --format json`. It tests each key against its platform and prints a next step for any that fails. In the app, rely on the last result `data_status` gives.
3. Call `reconcile`. Terminal: `lifecycle reconcile --format json`. Keep every check's name, status and detail line. The detail line carries the real figures and the tolerance in use, so quote from it and do not restate tolerances from memory.
4. Put each check into owner words, using this table.

   | Check | What it asks | If it fails or warns |
   |---|---|---|
   | `orders_complete` | Did the sync pull every order Shopify says exists? | Orders are missing, so every order and revenue number is short. Sync again. If it fails twice, report it. |
   | `orders_vs_cohorts` | Do the daily totals and the cohort table, built from the same orders, agree? | A sync stopped partway. Sync again. |
   | `klaviyo_orders` | Does Klaviyo see the same orders as Shopify? | Klaviyo's Shopify integration may be off, or joined to a different account. Flow revenue cannot be trusted until it is fixed. The owner checks the Shopify integration inside Klaviyo. |
   | `ga4_purchases` | Does GA4 record about as many purchases as Shopify has orders? | GA4's purchase tracking is missing orders or counting some twice. Site conversion numbers are off. Store numbers are not. |
   | `attributed_share` | Is the share of revenue Klaviyo credits to flows believable? | A warning, not an error. Klaviyo is crediting flows with most of the store's revenue, which usually means a wide attribution window. Read flow revenue with care. |
   | `flow_totals` | Do the daily flow rows add up to Klaviyo's own totals? | A sync stopped partway. Sync again. |
   | `freshness` | Has every connected source synced lately? | The named sources are stale. Sync them. |

5. Treat `skipped` as its own answer. A skipped check did not pass. Say what was not checked and which connection would let it run.
6. Say plainly that no check covers Meta Ads or Stripe. Their numbers are read from the platform and are not compared with another source.
7. Early signals. For each metric below that `list_metrics` returns, call `metric` and mark it pass or hold with one line of reason. Skip the others. (a) `shopify_orders` for 1 day against the 28-day daily average: hold when yesterday is under half of it on a normal day. (b) `ga4_purchase_rate` for 7 days against 28: hold on a fall of a third or more. (c) `flow_spam_rate` for 7 days: hold at 0.3 percent or more, the inbox providers' limit. (d) `meta_ad_spend` for 7 days, as a daily rate, against its 28-day daily rate: hold when it runs more than 30 percent above. A hold is a reason to look, not a cause.
8. Choose what to fix first, in this order, and stop at three:
   1. A source that is not connected, or whose key was refused.
   2. `freshness`.
   3. `orders_complete`, then `orders_vs_cohorts` and `flow_totals`.
   4. `klaviyo_orders`.
   5. `ga4_purchases`.
   6. `attributed_share`.
   7. A skipped check that would run if the owner connected a source.
9. For each fix give one action and who takes it. In the app the owner syncs and reconnects from the Connections screen, since an agent there cannot. In a terminal the action is the `next` command that `status` or `doctor` printed.
10. Write the summary in the shape of `files/health-summary.md`. The first line is the trust line. Tool: the `trust` line in any `metric` result or in `data_status`. Terminal: the `trust` field of `lifecycle status --format json`. Quote it word for word. If everything passed, say so in one line and keep the page short.
11. Follow `../shared/editing-standard.md` for everything you write. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.

## Rules

- Every figure comes from a check's detail line or from the status output. A missing figure is written [NEEDS NUMBER].
- Give the likely cause of a failed check as likely, not as fact, unless the output states it.
- Do not reconnect, disconnect or change any source yourself.
- Do not soften a failure. If the trust line says not to trust the numbers, the first line of the page says the same.

## Verify

- [ ] The first line is the trust line, word for word.
- [ ] Every source appears with its connection state and last sync, or the page says which of those could not be read.
- [ ] `reconcile` ran, and every check it returned appears with its status.
- [ ] Every skipped check is listed as not checked, with what would let it run.
- [ ] The page says that Meta Ads and Stripe have no cross-check.
- [ ] There are at most three fixes, in the step 7 order, each with one action and who takes it.
- [ ] Every figure appears in the reconcile or status output.
- [ ] Nothing was changed on any platform.
- [ ] The summary passed the editing standard at 16 of 20 or better.
- [ ] Each early signal is pass, hold or skipped, with its two numbers.
