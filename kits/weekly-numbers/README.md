# Weekly numbers

A Monday summary of the store's last 7 days beside the 7 before and the last 28. It opens with whether the numbers passed their checks and when each source last synced. In the Cosmic app, ask an agent to run the Weekly numbers playbook, or put it on the Schedule. With the CLI, run `lifecycle kits add weekly-numbers` and ask your agent to follow `AGENT.md`.

- Reads: verified metrics only, from whichever of Shopify, Klaviyo, GA4, Stripe and Meta Ads you have connected. Each metric runs the same SQL every week, so one Monday compares with the next. No customer names, emails or addresses, because none are stored.
- Writes: nothing. It sends nothing either. The summary goes to you in the conversation.
- Costs: nothing from a provider. Your agent's model usage is on your own account.
- You approve: nothing, because nothing changes.

If a source is not connected, its numbers are listed as not available. They are never guessed and never shown as zero.
