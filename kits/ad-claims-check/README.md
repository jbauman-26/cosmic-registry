# Ad claims against your source of truth

Every ad platform reports its own result. This kit sets Meta's claimed purchases and spend beside what your source of truth recorded on the same days: Stripe for SaaS, other stores and creators, Shopify for a store, GA4 when nothing better is connected. It shows the gap and what it means, and never adds Meta's claim to real revenue. In the Cosmic app, ask an agent to run the Ad claims check. With the CLI, run `lifecycle kits add ad-claims-check` and ask your agent to follow `AGENT.md`.

- Reads: daily Meta spend, clicks and claimed purchases, and the reference source's own counts.
- Writes: nothing. It changes no campaign, budget or ad.
- Costs: nothing from a provider.
- You approve: nothing, because nothing changes.

For a B2B workspace on HubSpot the check says plainly that Meta reports purchases, not leads, and shows cost per lead instead.
