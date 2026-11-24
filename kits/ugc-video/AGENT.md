# UGC video runbook

Goal: hand the owner one short presenter video whose spoken words match an approved script exactly, with captions, a cost ledger and a plain note that the presenter is AI.

What this kit touches:
- Reads public pages of the brand's site and the review text on them.
- Writes files on this computer only: script, voice, video, captions, word check and cost ledger.
- Spends money on the owner's fal, Kie, ElevenLabs or HeyGen account. Renders are usually priced by the second.
- Uploads nothing to Meta unless the owner asks and step 13 allows it.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing. Do not get around a missing tool with a browser, a script or a direct API call.

## Steps

1. Ask the owner for the store's web address, the product, a length between 15 and 30 seconds, and a spend limit for this job. In the Cosmic app the creative budget in Settings is the limit, and the creative tools refuse to run until one is set. Without a limit, write the script, get it approved, and stop before step 7.
2. Settle whose voice and whose face. A cloned voice is allowed only for the owner's own voice, or for a person whose written consent the owner says they hold. Otherwise use a stock voice from the provider. The presenter is a stock avatar from the provider, or a person who gave the owner written consent. Never a customer, a celebrity or a public figure. Write the owner's answers at the top of the script file.
3. Find out which providers have a key. Terminal: `lifecycle tools providers --format json`. In the app, check your tool list for `generate_video`. Never print, ask for, or paste a key.
4. Read the site with whatever page-reading tool you have: the product page, the home page, and the reviews shown on the product page. Write down the benefits, the price as shown, any offer or guarantee, and the themes that come up again and again in reviews, with a count of how many reviews you read. Keep the page address beside every fact. Never copy a reviewer's name, and never lift a review whole.
5. Write the script in the shape of `files/script.md`: a hook, the problem, the product, the proof, and one clear next step. Aim for about two and a half spoken words per second, so 40 to 75 words. The presenter talks about the product. It does not claim to have bought it, used it or seen results, because an AI presenter has done none of those. Every claim carries its source page, and a gap is marked [NEEDS PROOF] or [NEEDS OFFER]. Edit under `../shared/editing-standard.md`. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it.
6. Show the script and stop. The owner approves the exact wording. After approval the script is frozen: save it, and change no word without asking again.
7. Plan the spend before the first paid call. List each call: voice, presenter render, transcription, and captions if a paid tool makes them. For each give the ref, the length in seconds, and the price from the provider's own page with its address. Add the total and compare it with the limit. Plan the first render at the lowest resolution the owner accepts. If you cannot find a price, say so and ask before running that model. Wait for the owner to approve the plan.
8. Make the voice. Before the call, print one line: the ref, the expected cost, the total so far, and what is left of the limit.
   - fal or Kie: run a voice model by ref. `fal:fal-ai/minimax/voice-clone` was seen on 2026-11-24, and both providers list ElevenLabs voice models. Confirm the id, its inputs and its price on https://fal.ai/models or https://kie.ai/market first.
   - ElevenLabs direct: only if your tool list has an ElevenLabs tool. The CLI has no ref for it.
   - Terminal form: `lifecycle tools run REF --input '{...}' --wait --out FILE`.
9. Render the presenter, with the same cost line first.
   - Tool: `generate_video` in the Cosmic app. Terminal: an avatar or lipsync model on fal by ref, or a video model on Kie. Ids seen on 2026-11-24: `fal:heygen/avatar-6/turbo/identity-to-video`, `fal:fal-ai/creatify/aurora`, `fal:veed/fabric-1.0`. Confirm the id, its inputs and its price before use.
   - HeyGen direct: only if your tool list has a HeyGen tool. The CLI has no ref for it.
   - Open provider refs are not in the `lifecycle mcp` server today. With no `generate_video` tool and no terminal, hand the owner the approved script and the plan, and stop.
   - Never start a job twice. If a wait times out, the job is still running and still billing: check it with `lifecycle tools get RUN`. If the provider gave no answer at the start, ask the owner to look in the provider's dashboard before you try again.
   - After each paid call, add a row to the ledger in the shape of `files/cost-ledger.md`. fal reports no cost, so write "not reported by fal" and the page price you used.
10. Check the render word by word. Transcribe the rendered audio with a transcription model, cost line first, and compare the transcript with the frozen script one word at a time. Fill in `files/word-check.md` with every missing, added or changed word and its time in the video. The brand name, the product name, the price and every number must match exactly. If any of those is wrong, the render fails. Tell the owner, and render again only as a new paid call inside the limit. A transcript can mishear, so list words you are unsure of for the owner to listen to. With no transcription tool, ask the owner to watch the video against the script and write "checked by the owner" in the file.
11. Write the captions from the frozen script, never from the transcript, timed with the transcript's timestamps. Save them as an .srt file beside the video. Burn them into the picture only if you have a tool for it. Read the captions once more for the brand and product names.
12. Hand over the video, the captions, the script with its sources, the word check and the ledger. Give the owner this note in your own plain words: the presenter and voice are AI-generated, the presenter is not a customer, and the script makes no claim of personal use. Meta's rules and local ad law on labeling AI-made people change, so the owner checks the current rule before launch. Ask whether to add an on-screen line such as "AI-generated presenter", and record the answer. Then ask the owner to approve, change or reject the video. The kit ends here unless the owner asks for an upload.
13. Upload to Meta only when all of these hold: the owner asked to upload this video, `upload_ad` is in your tool list, and the Meta connection's agent access is not `Read only`.
    - On `Ask before changes`, call `request_approval` with the video, the copy, the ad account, any budget, and whether the ad lands paused or live. Wait for the answer.
    - On `Change without asking`, you may call `upload_ad` without a card. Tell the owner what you are about to upload first, and what happened after.
    - Paused or live follows the owner's setting for that ad account. If none is set, ask. If the answer is unclear, upload paused.
    - With no `upload_ad` tool, upload nothing. Give the owner the files to upload in Ads Manager themselves.

## Rules

- No invented numbers and no performance claims. Do not say the video will win, convert or lower costs.
- No fake testimonial. The presenter never speaks as a customer, and no review is read out as the presenter's own experience.
- Customer names, emails and addresses are never read or written.
- No voice or face of a real person without the consent described in step 2.
- Nothing is sent to anyone. Nothing changes in Meta outside step 13.

## Verify

- [ ] The owner set a spend limit, and the ledger total is at or under it.
- [ ] The voice and presenter choices, and any consent the owner holds, are written at the top of the script file.
- [ ] The owner approved the exact script before the first paid call, and no word changed after.
- [ ] Every claim in the script has a source page or is marked [NEEDS PROOF] or [NEEDS OFFER].
- [ ] The script has no line in which the presenter claims to have bought or used the product.
- [ ] A cost line was shown before every paid call, and every call has a ledger row.
- [ ] No job was started twice.
- [ ] The word check lists every difference, and the brand name, product name, price and numbers match the script. Or it says "checked by the owner".
- [ ] The captions were written from the script and saved beside the video.
- [ ] The owner received the AI-presenter note, and their answer on the on-screen line is recorded.
- [ ] The script passed the editing standard at 16 of 20 or better.
- [ ] Nothing was uploaded, or the upload followed step 13 and the owner was told whether it landed paused or live.
- [ ] No customer or reviewer name appears in any file this kit wrote.
