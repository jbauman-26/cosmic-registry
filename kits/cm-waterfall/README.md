# Contribution margin waterfall

Shows what the store keeps from its sales after product costs, then after shipping and payment fees, then after ad spend, for the last 30 days beside the 30 before and the last 90, and names the layer that moved most. It also says what is left out of the count, so the margin is never read as more complete than it is.

- Reads: Shopify orders and the costs you set in the Cosmic app or with `lifecycle costs set`, plus Meta spend when Meta is connected.
- Writes: nothing. It sends nothing either.
- Costs: nothing from a provider. Your agent's model usage is on your own account.
- You approve: nothing, because nothing changes.

With no costs set, it says so and shows no margin.
