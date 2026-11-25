# SaaS funnel and churn

Once a month, lays out a subscription business from its own billing: GA4 visits, new paying customers, MRR and how it moved, churn, failed payments and a blended cost per new customer. Stripe is the source of truth, and every number is a verified metric with a trust line. In the Cosmic app, ask an agent to run the SaaS funnel playbook. With the CLI, run `lifecycle kits add saas-funnel` and ask your agent to follow `AGENT.md`.

- Reads: daily Stripe charges and subscription counts, MRR snapshots, and GA4 and Meta totals when they are connected. No customer records, because none are stored.
- Writes: nothing. Sends nothing.
- Costs: nothing from a provider.
- You approve: nothing, because nothing changes.

Failed payments are shown beside churn on purpose: a card that fails is often churn that has not happened yet.
