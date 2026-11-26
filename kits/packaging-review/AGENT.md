# Packaging review runbook

Goal: before the owner publishes a piece of content, get Cosmic Cloud's packaging review of it and show the owner the verdict, the fixes and the rewrites exactly as they came back.

What this kit touches:
- Sends the draft the owner gives you to Cosmic Cloud, and nothing else.
- Writes nothing unless the owner asks for a copy.
- The judging runs on Cosmic Cloud. This runbook does not know how drafts are judged, and you should not guess or add rules of your own to the review.

## How to run a step

Use the Cosmic MCP tool if it is in your tool list. Use the direct call in step 3 only if it is not. If you have neither, stop and tell the owner how to connect Cosmic Cloud (Developers, then MCP, in Cosmic Cloud).

## Steps

1. Ask the owner for the draft if they have not given it: the exact text, or a short description of the thumbnail. Ask what it is (idea, title, thumbnail, hook, intro, script, outro, short, x_post, linkedin_post) and where it will run. If it sits under a title or beside a thumbnail, take those too as context.
2. Call the tool `packaging_review` on the Cosmic MCP server with `draft`, `asset`, `platform`, and `context` if you have it. Send the draft as written. Do not fix it first.
3. With no MCP tool, make one request: `POST https://cloud.cosmicai.tech/api/v1/skills/packaging/review` with the header `Authorization: Bearer $COSMIC_CLOUD_TOKEN` and a JSON body of the same fields. Never print, ask for or paste the token.
4. Handle the answer:
   - `402 pro_only`: tell the owner packaging review is part of Pro and Agency, and give them https://cosmicai.tech/pricing. Do not review the draft yourself instead.
   - `429 rate_limited`: say when they can try again, from `retry_after_seconds`.
   - `400 invalid_input`: fix the field it names and send once more.
   - Any other error: say the review could not run and try once more a minute later. Never retry more than once.
5. Show the review in the shape of `files/review-format.md`. Keep the review's own words for every problem, fix and rewrite. Keep every number exactly as it came back, with its month.
6. If the owner asks you to apply a fix or a rewrite, do it in their draft, fill each slot such as [YOUR REAL NUMBER] only with a fact the owner gives you, and offer to send the new version for one more review.

## Rules

- Do not invent a number, a result, a client or a quote. A slot stays a slot until the owner fills it.
- Do not describe or guess how the review scores. If the owner asks, say it uses a private playbook on Cosmic Cloud plus the workspace's checked numbers.
- Never quote a number from this workspace that the review did not return, and never one the owner's Cosmic verdict holds back.
- Nothing is published or sent to anyone.
- Edit anything you write yourself under `../shared/editing-standard.md`. If you cannot open it: no em or en dashes, no invented facts, plain verbs.

## Verify

- [ ] The draft sent was the owner's own text, unchanged.
- [ ] The verdict, score, fixes and rewrites shown match the review word for word.
- [ ] Every number shown came from the review, with its month.
- [ ] On a 402, the owner was pointed to the plans page and no review was made up.
- [ ] No more than one retry was made.
