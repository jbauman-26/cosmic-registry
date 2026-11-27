# Meta ads diagnosis

Once a week, reads your Meta ad account beside your own funnel numbers (leads, booked calls, shows, closes, cash collected) and names the one thing holding the account back. It works from the top of the funnel down, stops at the first real failure, and writes a report with a verdict, the numbers behind it, and a short action plan. In the Cosmic app, ask an agent to run the Meta ads diagnosis playbook. With the CLI, run `lifecycle kits add meta-ads-diagnosis` and ask your agent to follow `AGENT.md`.

- Reads: the daily Meta totals already synced, by campaign. Funnel numbers come from you, or from a Stripe or HubSpot source you already connected, and each one is labeled with where it came from.
- Writes: nothing. It changes no campaign, budget or ad. Any change it recommends is a separate step you approve.
- Costs: nothing from a provider. Your agent's model usage is on your own account.
- You approve: nothing, because nothing changes. You decide what to do with what it finds.

The rule it follows first: if the account makes money on the cash it collects, it leaves the ads alone, even when cost per lead or CPM looks bad.
