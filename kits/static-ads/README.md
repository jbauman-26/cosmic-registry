# Static ads

Reads your store's site and the ads your Page is running on Meta, lists the angles those ads miss, proposes five concepts, and generates the images you pick. In the Cosmic app, ask an agent to run the Static ads playbook. With the CLI, run `lifecycle kits add static-ads` and ask your agent to follow `AGENT.md`.

- Reads: public pages of your store, and your Page's ads in Meta's public Ad Library through ScrapeCreators or Apify. It never reads customer names, emails or addresses.
- Writes: a concepts file, the image files, the prompts and a cost ledger, all on your computer.
- Costs: Kie or fal bills each image to your own account. ScrapeCreators or Apify bills the Ad Library read to yours. Cosmic adds nothing on top. Your agent shows the cost before each paid call and stops at the limit you set.
- You approve: the concepts to generate, the spend limit, each finished ad, and any upload to Meta. An upload is a separate step. It lands paused or live, whichever you set for that ad account.

The kit promises no result. It finds gaps in what you are running and makes ads to test them.
