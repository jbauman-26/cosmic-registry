# Static ads runbook

Goal: hand the owner finished static ads for angles their current Meta ads do not cover, with every claim sourced and every dollar shown before it is spent.

What this kit touches:
- Reads public pages of the brand's site and the brand's own ads in Meta's public Ad Library.
- Writes files on this computer only: concepts, images, prompts and a cost ledger.
- Spends money on the owner's Kie or fal account for images, and on their ScrapeCreators or Apify account for the Ad Library read.
- Uploads nothing to Meta unless the owner asks and step 11 allows it.

## How to run a step

Each step names a tool first, then the terminal command that does the same job. Use the tool if it is in your tool list. The Cosmic app and the `lifecycle mcp` server both provide them. Use the command only if you have a terminal. If you have neither, stop and tell the owner which tool is missing. Do not get around a missing tool with a browser, a script or a direct API call.

## Steps

1. Ask the owner four things: the store's web address, the name of the Facebook Page the ads run from, the product or collection to advertise, and a spend limit for this job. In the Cosmic app the creative budget in Settings is the limit, and the creative tools refuse to run until one is set. Without a limit, do the reading and the concepts, then stop before step 7.
2. Find out which providers have a key. Terminal: `lifecycle tools providers --format json`. In the app, check whether `generate_image` is in your tool list. Never print, ask for, or paste a key. If no image provider is connected, tell the owner how to add one and carry on through step 6.
3. Read the site with whatever page-reading tool you have: the home page, the page for each product in scope, and the about page. Write down product names, prices as shown, stated benefits, offers, guarantees, and proof printed on the page. Keep the page address beside every fact. From reviews, take themes only. Never copy a reviewer's name.
4. Read the brand's running ads. State the cost before the call.
   - ScrapeCreators: find the Page with `scrapecreators:v1/facebook/adLibrary/search/companies`, show the owner the match, and get a yes that it is their Page. Then read its ads with `scrapecreators:v1/facebook/adLibrary/company/ads`, passing the Page's id. A lookup by name alone can pick the wrong company. Each call reports the credits it charged.
   - Apify: pick a Meta Ad Library actor at https://apify.com/store, read its input page and its price, and run it as `apify:<owner~actor>`. A finished run reports its cost in US dollars.
   - Terminal form for either: `lifecycle tools run REF --input '{...}' --wait`. Input names are on the provider's page for that id. Read that page first.
   - Keep the ad text, headline, button, format, start date, landing page and creative link. Drop everything about people.
   - With no key for either provider, ask the owner for their Ad Library link or screenshots. If you get nothing, write "Current ads: not read" in the concepts file and say the missed-angle list rests on the site alone.
5. Map the angles. Give every running ad one angle, such as problem, benefit, proof, offer, how it works, objection, founder story, or gift. Then list the angles the site supports that no running ad uses. Beside each missed angle put the page that supports it. A missed angle is a gap in what is running. It is not a forecast.
6. Propose five concepts in the shape of `files/concepts.md`: the angle, the evidence that it is missing, a headline, the primary text, what the image shows, the aspect ratio, and each claim with its source page. Mark a gap as [NEEDS OFFER] or [NEEDS PROOF]. Edit the copy under `../shared/editing-standard.md`. If you cannot open that file, hold to this much: no em or en dashes, no invented facts, plain verbs, and a second read of the draft before the owner sees it. Show the five to the owner and stop. The owner chooses which to generate.
7. Plan the spend before the first image. For each chosen concept name the model ref, the number of images, and the price from the provider's own page with its address. Add the total and compare it with the limit. Example refs seen on 2026-11-24: `kie:gpt-image-2-text-to-image`, `kie:nano-banana-2`, `fal:fal-ai/nano-banana-pro/edit`. Ids and prices change, so confirm both on https://kie.ai/market or https://fal.ai/models. If you cannot find a price, say so and ask the owner before running that model. Wait for the owner to approve the plan.
8. Generate one image at a time.
   - Before each call, print one line: the ref, the expected cost, the total so far, and what is left of the limit. If the call would pass the limit, stop and ask.
   - Tool: `generate_image` in the Cosmic app. Terminal: `lifecycle tools run REF --input '{...}' --wait --out FILE`. Open provider refs are not in the `lifecycle mcp` server today. With no `generate_image` tool and no terminal, hand the owner the prompts and stop.
   - Give the model the brand's real product photo as a reference when the model accepts one. A product the model invents is not the product.
   - Never start a job twice. If a wait times out, the job is still running and still billing: check it with `lifecycle tools get RUN`. If the provider gave no answer at the start, ask the owner to look in the provider's dashboard before you try again.
   - After each call, add a row to the ledger in the shape of `files/cost-ledger.md`: run id, ref, prompt, file, and the cost the provider reported. Kie reports credits. fal reports no cost, so write "not reported by fal" and the page price you used.
9. Check every image before the owner sees it. The product matches the real product photo. Every word in the image is spelled right and matches the approved copy. There is no badge, award, star rating or press logo that is not on the site. No person in it looks like a real, known person. No other brand's logo appears. The aspect ratio is the one planned. Report each failure. A new attempt is a new paid call with its own cost line.
10. Hand over. For each finished ad give the file, headline, primary text, button, landing page, angle, claims with sources, and cost. Ask the owner to approve, change or reject each one. The kit ends here unless the owner asks for an upload.
11. Upload to Meta only when all of these hold: the owner asked to upload this ad, `upload_ad` is in your tool list, and the Meta connection's agent access is not `Read only`.
    - On `Ask before changes`, call `request_approval` with the image, the copy, the ad account, any budget, and whether the ad lands paused or live. Wait for the answer.
    - On `Change without asking`, you may call `upload_ad` without a card. Tell the owner what you are about to upload first, and what happened after.
    - Paused or live follows the owner's setting for that ad account. If none is set, ask. If the answer is unclear, upload paused.
    - With no `upload_ad` tool, upload nothing. Give the owner the files and copy to upload in Ads Manager themselves.

## Rules

- No invented numbers and no performance claims. Do not say an ad will win, convert or lower costs.
- Superlatives, awards and discounts appear only if the site prints them or the owner supplies them.
- Customer names, emails and addresses are never read or written. A review is never quoted as a testimonial unless the owner confirms they have the right to use it.
- Do not copy another brand's ad.
- Nothing is sent to anyone. Nothing changes in Meta outside step 11.

## Verify

- [ ] The owner set a spend limit, and the ledger total is at or under it.
- [ ] The owner confirmed the Facebook Page before its ads were read, or the concepts file says "Current ads: not read".
- [ ] Every missed angle names the site page that supports it.
- [ ] Every claim in every concept has a source page or is marked [NEEDS OFFER] or [NEEDS PROOF].
- [ ] The owner chose the concepts and approved the spend plan before the first paid image call.
- [ ] A cost line was shown before every paid call, and every call has a ledger row.
- [ ] No job was started twice.
- [ ] Every delivered image passed the step 9 checks.
- [ ] The copy passed the editing standard at 16 of 20 or better.
- [ ] Nothing was uploaded, or the upload followed step 11 and the owner was told whether it landed paused or live.
- [ ] No customer name, email or address appears in any file this kit wrote.
