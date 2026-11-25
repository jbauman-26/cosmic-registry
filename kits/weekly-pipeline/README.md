# Weekly pipeline numbers

Once a week, builds one page of pipeline numbers for a B2B team: new leads, deals created, pipeline created, deals won, win rate and open pipeline, with leads and pipeline split by original source. Every number comes from a verified metric checked against HubSpot's own counts. In the Cosmic app, ask an agent to run the Weekly pipeline playbook. With the CLI, run `lifecycle kits add weekly-pipeline` and ask your agent to follow `AGENT.md`.

- Reads: daily HubSpot counts and amounts. No contact, company or deal record, because none is stored.
- Writes: nothing. Sends nothing.
- Costs: nothing from a provider.
- You approve: nothing, because nothing changes.

Lead source is where B2B reporting usually breaks: a large "UNKNOWN" or "OFFLINE" share means HubSpot could not tell where leads came from. The page shows that share plainly instead of hiding it.
