# Meta spend check

Once a week, sets what your Meta ad account spent beside what your Shopify store took in, and shows Meta's own purchase numbers in a separate, labeled block. In the Cosmic app, ask an agent to run the Meta spend check playbook. With the CLI, run `lifecycle kits add meta-spend-check` and ask your agent to follow `AGENT.md`.

- Reads: the daily totals already synced from Shopify and Meta Ads. Spend, impressions, clicks and Meta's attributed purchases by campaign. No customer names, emails or addresses, because none are stored.
- Writes: nothing. It changes no campaign, budget or ad.
- Costs: nothing from a provider. Your agent's model usage is on your own account.
- You approve: nothing, because nothing changes. You decide what to do with what it finds.

One warning runs through the whole report. Meta's purchases and ROAS are Meta's own claim about its own ads, counted in its own attribution window. They are not orders. The number with no attribution in it is the marketing efficiency ratio: all Shopify net revenue divided by Meta spend.
