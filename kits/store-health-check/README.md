# Store health check

Answers one question: can you trust the numbers today, and if not, what do you fix first? It reads when each source last synced, runs the checks that compare Shopify, Klaviyo and GA4 with each other, and explains each result without the jargon. In the Cosmic app, ask an agent to run the Store health check playbook. With the CLI, run `lifecycle kits add store-health-check` and ask your agent to follow `AGENT.md`.

- Reads: the status of each connected source and the reconcile checks. Totals only. No customer names, emails or addresses, because none are stored.
- Writes: nothing on any platform. Running the checks saves their results in the local database on your computer.
- Costs: nothing from a provider. Your agent's model usage is on your own account.
- You approve: nothing, because nothing changes. The fixes it lists are yours to make.

Meta Ads has no cross-check yet. The report says so, so a passing result is never read as covering it.
