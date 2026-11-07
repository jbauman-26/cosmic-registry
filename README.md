# Cosmic Lifecycle kits

Runbooks your coding agent follows to work on a Shopify brand's Klaviyo numbers with [Cosmic Lifecycle](https://github.com/jbauman-26/cosmic-lifecycle).

Hand a kit to the agent that writes code for you. It follows the steps, checks its own work against the Verify list at the end, and you review the result. No kit sends a message.

## Kits

<!-- catalog:start -->
| Kit | What your agent does | Needs | Writes | Instructions |
| --- | --- | --- | --- | --- |
| [Flow audit](kits/flow-audit/README.md) | Finds missing, silent and declining Klaviyo flows, with evidence for each finding. | klaviyo | nothing | [Runbook](kits/flow-audit/AGENT.md) |
| [Revenue per flow](kits/revenue-per-flow/README.md) | Ranks flows by attributed revenue per recipient and shows the share of Shopify revenue. | klaviyo, shopify | nothing | [Runbook](kits/revenue-per-flow/AGENT.md) |
| [Win-back segment](kits/winback-segment/README.md) | Proposes a win-back segment from the brand's own repeat timing, and creates it only after review. | klaviyo, shopify | one Klaviyo segment, after a reviewed plan and --confirm. Never sends. | [Runbook](kits/winback-segment/AGENT.md) |
<!-- catalog:end -->

## How to use them

1. Install the CLI: see [Cosmic Lifecycle](https://github.com/jbauman-26/cosmic-lifecycle).
2. `lifecycle kits list`, then `lifecycle kits add NAME`.
3. Tell your agent: "Follow lifecycle-kits/NAME/AGENT.md."

Or run `lifecycle skills sync` once and ask for the job by name, such as `/lifecycle:kits:flow-audit`.

The CLI downloads this repo on first use and refreshes it every 10 minutes, so kit fixes reach you without a new CLI release.

## Help

Questions and setups get shared in [Cosmic AI](https://store.jakebauman.io/community), the free community this comes from.

MIT license.
