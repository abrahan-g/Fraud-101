// Learner-facing interactive activities for Course 3.
(function () {
  const activities = [
    {
      title: 'Where Can Risk Enter?',
      intro: 'Select each area to see what can go wrong and what the merchant should verify.',
      cards: [
        ['Agent identity', 'The request claims to come from a recognized agent.', 'Verify the agent signature, current key, request freshness, and intended merchant.'],
        ['Agent integrity', 'The agent appears legitimate but behaves unexpectedly.', 'Check whether content, stored information, or a connected tool may have changed its behavior.'],
        ['Product information', 'The agent relies on a listing, feed, price, or review.', 'Confirm the source, version, seller, product identity, and material terms shown to the agent.'],
        ['Customer intent', 'The agent submits a purchase for the customer.', 'Compare the final order with the customer’s current instructions, limits, and approvals.'],
        ['Payment and fulfillment', 'The payment is approved or already settled.', 'Determine what has been paid and whether shipment, service, or digital value can still be stopped.'],
        ['Evidence trail', 'Several systems hold parts of the transaction record.', 'Link identity, customer instructions, order changes, payment events, and fulfillment using the same transaction reference.']
      ]
    },
    {
      title: 'Claimed or Verified?',
      intro: 'Select each signal to learn how much confidence it provides about an agent’s identity.',
      cards: [
        ['Agent name', 'A familiar agent name appears in the request.', 'Low confidence. Names, logos, and browser labels are easy for a malicious bot to copy.'],
        ['Request format', 'The request uses the expected fields and structure.', 'Supporting context only. An attacker can imitate the format without being the legitimate agent.'],
        ['Verified signature', 'The request verifies with a current agent key.', 'Strong identity evidence. Also confirm which request details the signature protects.'],
        ['Timestamp and one-time ID', 'The request includes freshness information.', 'Check both values and reject expired or reused requests to prevent replay.'],
        ['Intended recipient', 'The request identifies the merchant and service.', 'Confirm the request was created for your environment and cannot be reused elsewhere.'],
        ['Behavior pattern', 'The agent’s speed, volume, and path appear familiar.', 'Useful supporting evidence, but normal behavior should never override failed identity verification.']
      ]
    },
    {
      title: 'How Manipulation Reaches an Agent',
      intro: 'Select each entry point to see the risk and the control that limits it.',
      cards: [
        ['Direct message', 'A person tells the agent to ignore its rules or take an unsafe action.', 'Treat the input as untrusted and prevent it from overriding system rules or customer limits.'],
        ['Product page or file', 'Hidden instructions appear in content the agent retrieves.', 'Treat retrieved content as information, not authority to change the cart, account, or payment.'],
        ['Connected tool', 'A plug-in or service returns false information or an unexpected action.', 'Limit the tool’s permissions, destinations, and access to customer or payment data.'],
        ['Stored information', 'A harmful instruction remains in memory or cached data.', 'Review stored context after an incident and remove content that could affect later sessions.'],
        ['Payment credential', 'A manipulated agent attempts to use a valid credential.', 'Restrict the credential to the intended merchant, amount, use, and authorization period.'],
        ['Material change', 'The agent adds a gift card, subscription, higher amount, or new destination.', 'Pause the action and ask the customer to confirm the complete updated transaction.']
      ]
    },
    {
      title: 'Spot the Product-Data Risk',
      intro: 'Select each signal to see why it matters and what evidence the merchant should preserve.',
      cards: [
        ['Product mismatch', 'The title, image, and product identifier describe different items.', 'Pause the order and preserve the exact listing and feed fields shown to the agent.'],
        ['Unusual price change', 'A popular product drops sharply in price just before agent traffic increases.', 'Compare price history, seller activity, related listings, and the checkout price.'],
        ['False availability', 'The feed promises inventory or delivery the seller cannot support.', 'Confirm inventory and fulfillment terms before payment or customer confirmation.'],
        ['Changed purchase terms', 'Fees, subscription terms, or return conditions change at checkout.', 'Display the final terms clearly and require confirmation when the change is material.'],
        ['Artificial reviews', 'A burst of similar reviews makes the listing appear trustworthy.', 'Review timing, account relationships, repeated language, and independent seller signals.'],
        ['Seller account change', 'The seller’s ownership or payout destination changes before a sales surge.', 'Verify the seller, hold affected fulfillment, and review linked listings and orders.']
      ]
    },
    {
      title: 'Build the Intent Timeline',
      intro: 'Select each stage to see what evidence helps determine whether the final purchase matched the customer’s request.',
      cards: [
        ['Customer request', 'What did the customer ask the agent to do?', 'Preserve the authenticated request, date, purpose, and whether it permitted comparison, reservation, or purchase.'],
        ['Limits and conditions', 'What boundaries did the customer set?', 'Record the merchant, product, amount, timing, substitution, delivery, and confirmation limits.'],
        ['Agent selection', 'What item or service did the agent choose?', 'Retain the offer, seller, product details, and information that shaped the selection.'],
        ['Cart changes', 'What changed before the order was submitted?', 'Track items, amount, fees, terms, delivery details, and the party responsible for each change.'],
        ['Customer confirmation', 'What final transaction did the customer see and approve?', 'Link the confirmation to the final cart, amount, merchant, payment method, and destination.'],
        ['Payment and delivery', 'What was paid for and ultimately provided?', 'Connect authorization, settlement, shipment, service, refund, and customer-contact records.']
      ]
    },
    {
      title: 'What Can Still Be Stopped?',
      intro: 'Select each transaction stage to identify the most useful immediate action.',
      cards: [
        ['Before payment', 'The order has not been authorized or submitted.', 'Block the transaction, request confirmation, or correct the order before funds move.'],
        ['Authorized, not captured', 'The payment is approved but has not been completed.', 'Stop fulfillment and void or reverse the authorization when the payment method allows it.'],
        ['Settled, not fulfilled', 'Funds moved, but goods or services have not been delivered.', 'Stop delivery and begin the payment method’s return, recall, or recovery process immediately.'],
        ['Digital value issued', 'A voucher, credit, or credential exists but has not been used.', 'Freeze or cancel the value when possible and check for linked orders or redemption attempts.'],
        ['Already fulfilled', 'The goods, service, or digital value has been delivered or used.', 'Preserve evidence and follow the applicable refund, return, dispute, or recovery process.'],
        ['More activity queued', 'Additional agent orders or actions are waiting.', 'Stop the queued activity, secure affected accounts or credentials, and review related transactions.']
      ]
    },
    {
      title: 'Who Owns the Response?',
      intro: 'Select each team to see its role in an agent-related fraud or dispute incident.',
      cards: [
        ['Fraud and payments', 'Assess the transaction, payment status, and linked activity.', 'Decide what to hold, decline, recover, refund, or escalate under the applicable payment process.'],
        ['Security', 'Investigate possible compromise or manipulation.', 'Review agent access, credentials, content, connected tools, logs, and other affected activity.'],
        ['Product and engineering', 'Evaluate how the agent-facing experience behaved.', 'Correct unsafe permissions, confirmation gaps, data handling, and integration weaknesses.'],
        ['Customer support', 'Coordinate communication with the affected customer.', 'Explain what is known, available remedies, required information, and expected next steps.'],
        ['Legal, compliance, and partners', 'Review obligations and agreements.', 'Assess notifications, contracts, payment rules, customer terms, jurisdiction, and partner responsibilities.'],
        ['Incident owner', 'Coordinate the complete response.', 'Maintain the timeline, decisions, evidence, owners, communications, recovery actions, and post-incident review.']
      ]
    }
  ];

  activities.forEach((activity, index) => {
    lessons[index].activityTitle = activity.title;
    lessons[index].activityIntro = activity.intro;
    lessons[index].cards = activity.cards;
  });
})();
