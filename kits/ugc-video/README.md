# UGC video

Writes a 15 to 30 second presenter script from your store's site and its public reviews, renders the voice and an AI presenter, checks the render against the script word by word, and adds captions. In the Cosmic app, ask an agent to run the UGC video playbook. With the CLI, run `lifecycle kits add ugc-video` and ask your agent to follow `AGENT.md`.

- Reads: public pages of your store and the review text shown on them. It never reads customer names, emails or addresses, and it never copies a reviewer's name.
- Writes: the script, the voice file, the video, a captions file, the word check and a cost ledger, all on your computer.
- Costs: the voice and the render are billed to your own account with fal, Kie, ElevenLabs or HeyGen. Renders are usually priced by the second, so a re-render costs again. Cosmic adds nothing on top. Your agent shows the cost before each paid call and stops at the limit you set.
- You approve: the exact script before anything is rendered, the spend limit, the voice and presenter, the finished video, and any upload to Meta. An upload is a separate step. It lands paused or live, whichever you set for that ad account.

The presenter is AI-generated and is not a customer. The script never has it claim to have bought or used the product. Rules on labeling AI-made people in ads change, so the hand-off includes a note for you to check before launch.
