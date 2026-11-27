# Cosmic Lifecycle kits

Runbooks an AI agent follows to work on a Shopify brand's numbers and ad creative with [Cosmic Lifecycle](https://github.com/jbauman-26/cosmic-lifecycle). They run inside the Cosmic AI Mac app and in coding agents such as Claude Code.

Hand a kit to your agent. It follows the steps, checks its own work against the Verify list at the end, and you review the result. No kit sends a message, and no kit changes a platform without the approval its page names. A kit that spends money does it on your own provider account and shows the cost before each call.

## Kits

<!-- catalog:start -->
| Kit | What your agent does | Needs | Writes | Instructions |
| --- | --- | --- | --- | --- |
| [Ad claims against your source of truth](kits/ad-claims-check/README.md) | Sets what Meta says its ads produced beside what your source of truth recorded on the same days, and shows the gap without blaming either side. | meta | nothing | [Runbook](kits/ad-claims-check/AGENT.md) |
| [Cash cycle and weeks of cover](kits/cash-cycle/README.md) | Works out how many days cash is tied up between paying suppliers and getting paid, and the weeks of stock on hand against the supplier's lead time, from the store's cost of goods and the owner's own figures. | shopify | nothing | [Runbook](kits/cash-cycle/AGENT.md) |
| [Channel claim audit](kits/channel-claim-audit/README.md) | Once a month, checks each ad platform's claimed revenue against Shopify net revenue and against its own history, with four pass, watch or fail checks, and names channels whose numbers should not drive budget until a holdout test settles them. | shopify, meta | nothing | [Runbook](kits/channel-claim-audit/AGENT.md) |
| [Contribution margin waterfall](kits/cm-waterfall/README.md) | Lays out contribution margin layer by layer (after product costs, after shipping and fees, after ad spend) for the last 30 days beside the 30 before and the last 90, and names the layer that moved. | shopify | nothing | [Runbook](kits/cm-waterfall/AGENT.md) |
| [Flow audit](kits/flow-audit/README.md) | Finds missing, silent and declining Klaviyo flows, with evidence for each finding. | klaviyo | nothing | [Runbook](kits/flow-audit/AGENT.md) |
| [Holdout test planner](kits/holdout-planner/README.md) | Designs a holdout test a small store can actually run (a welcome email holdout, or a region held back from one ad channel) sized from its own orders, with the split, the duration, the one number to read and the decision rule written before it starts. | shopify | nothing | [Runbook](kits/holdout-planner/AGENT.md) |
| [Marginal return](kits/marginal-return/README.md) | Reads what the last step up or down in a channel's spend did to Shopify net revenue, new orders and margin after ads, by comparing two spend levels, and gives scale, hold or cut against the store's own break-even. | shopify, meta | nothing | [Runbook](kits/marginal-return/AGENT.md) |
| [Meta ads diagnosis](kits/meta-ads-diagnosis/README.md) | Reads a Meta ad account against the owner's funnel numbers, names the one constraint (leads, bookings, shows or closes), and writes a funnel diagnosis report with kill, keep and scale calls the owner approves. | meta | nothing | [Runbook](kits/meta-ads-diagnosis/AGENT.md) |
| [Meta spend check](kits/meta-spend-check/README.md) | A weekly read-only look at Meta ad spend against Shopify net revenue, with Meta's own purchase claims kept apart and labeled. | shopify, meta | nothing | [Runbook](kits/meta-spend-check/AGENT.md) |
| [Packaging review](kits/packaging-review/README.md) | Sends a title, thumbnail idea, hook, script or post to Cosmic Cloud's packaging review and shows the verdict, the fixes and the rewrites. Pro and Agency. |  | Nothing. It shows the review in the conversation, and saves a copy on this computer only if the owner asks. | [Runbook](kits/packaging-review/AGENT.md) |
| [Revenue per flow](kits/revenue-per-flow/README.md) | Ranks flows by attributed revenue per recipient and shows the share of Shopify revenue. | klaviyo, shopify | nothing | [Runbook](kits/revenue-per-flow/AGENT.md) |
| [SaaS funnel and churn](kits/saas-funnel/README.md) | A monthly look at a subscription business from Stripe, covering visits to paid, new paying customers, MRR and net new MRR, churn and failed payments, and blended cost per new customer. | stripe | nothing | [Runbook](kits/saas-funnel/AGENT.md) |
| [Static ads](kits/static-ads/README.md) | Finds the angles a brand's running Meta ads miss, proposes five concepts, and generates the images the owner picks on the owner's own Kie or fal key. |  | A concepts file, image files, prompts and a cost ledger on this computer. Uploads to Meta only as a separate step the owner approves. | [Runbook](kits/static-ads/AGENT.md) |
| [Store health check](kits/store-health-check/README.md) | Reads the status of every source and the reconcile checks, then tells the owner in plain words what to fix first. | shopify | nothing | [Runbook](kits/store-health-check/AGENT.md) |
| [UGC video](kits/ugc-video/README.md) | Writes a short presenter script from the brand's site and reviews, renders voice and an AI presenter on the owner's own accounts, checks the render word by word, and adds captions. |  | A script, voice and video files, captions, a word check and a cost ledger on this computer. Uploads to Meta only as a separate step the owner approves. | [Runbook](kits/ugc-video/AGENT.md) |
| [Weekly numbers](kits/weekly-numbers/README.md) | A Monday summary built from verified metrics only, leading with the trust line and how fresh each source is. | shopify | nothing | [Runbook](kits/weekly-numbers/AGENT.md) |
| [Weekly pipeline numbers](kits/weekly-pipeline/README.md) | A Monday page of B2B pipeline numbers checked against HubSpot's own counts, with leads and pipeline by original source and cost per lead beside pipeline created. | hubspot | nothing | [Runbook](kits/weekly-pipeline/AGENT.md) |
| [Win-back segment](kits/winback-segment/README.md) | Proposes a win-back segment from the brand's own repeat timing, and creates it only after review. | klaviyo, shopify | one Klaviyo segment, after a reviewed plan and --confirm. Never sends. | [Runbook](kits/winback-segment/AGENT.md) |
<!-- catalog:end -->

## How to use them

In the Cosmic AI app, ask an agent for the job by name, such as "run the store health check".

With the CLI:

1. Install the CLI: see [Cosmic Lifecycle](https://github.com/jbauman-26/cosmic-lifecycle).
2. `lifecycle kits list`, then `lifecycle kits add NAME`.
3. Tell your agent: "Follow lifecycle-kits/NAME/AGENT.md."

Or run `lifecycle skills sync` once and ask for the job by name, such as `/lifecycle:kits:flow-audit`.

The CLI downloads this repo on first use and refreshes it every 10 minutes, so kit fixes reach you without a new CLI release.

## Help

Questions and setups get shared in [Cosmic AI](https://store.jakebauman.io/community), the free community this comes from.

MIT license.
