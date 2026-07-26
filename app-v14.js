// Final plain-language audit for lesson introductions and lesson reviews.
(function () {
  const lessonLanguage = [
    {
      purpose: 'Learn how AI agents add new decision points and new evidence to familiar fraud and dispute work.',
      objectives: [
        'Explain how an AI agent can change the risk in an otherwise familiar transaction.',
        'Identify whether a concern involves the agent, product information, customer instructions, payment, or fulfillment.',
        'Choose a response using evidence from the complete transaction.'
      ]
    },
    {
      purpose: 'Learn how to distinguish a legitimate shopping agent from a bot that copies trusted-looking details.',
      objectives: [
        'Recognize agent details that are easy for an attacker to copy.',
        'Use current signatures, request details, and behavior to verify an agent.',
        'Choose a proportionate response when identity evidence is missing or conflicting.'
      ]
    },
    {
      purpose: 'Learn how harmful content or a compromised service can cause a legitimate agent to take an unsafe action.',
      objectives: [
        'Recognize where harmful instructions can enter an agent’s decision process.',
        'Limit what an agent can change, access, or purchase without confirmation.',
        'Contain a suspected manipulation while preserving useful evidence.'
      ]
    },
    {
      purpose: 'Learn how false or changing product information can mislead an agent and affect the final transaction.',
      objectives: [
        'Recognize suspicious changes in products, prices, reviews, inventory, and purchase terms.',
        'Preserve the exact information the agent used when it made its decision.',
        'Pause and investigate orders when seller, product, or checkout details conflict.'
      ]
    },
    {
      purpose: 'Learn how to investigate a dispute when the completed purchase may not match what the customer intended.',
      objectives: [
        'Distinguish unauthorized use, exceeded limits, transaction errors, and customer dissatisfaction.',
        'Trace the purchase from the customer’s request through confirmation, payment, and delivery.',
        'Build an evidence package that clearly shows what is known, missing, or conflicting.'
      ]
    },
    {
      purpose: 'Learn how payment and fulfillment timing affect what a merchant can still stop or recover.',
      objectives: [
        'Explain the difference between payment approval, settlement, return, and dispute processes.',
        'Identify what can still be stopped after a suspected fraudulent transaction.',
        'Match the response to the payment method and fulfillment stage.'
      ]
    },
    {
      purpose: 'Learn how merchant teams can investigate responsibility and coordinate an agent-related incident.',
      objectives: [
        'Identify the facts, controls, agreements, and rules that may affect responsibility.',
        'Separate what the agent did from what caused the agent to act.',
        'Assign clear roles for containment, customer support, recovery, and follow-up.'
      ]
    }
  ];

  const reviews = [
    {
      summary: 'Review the entire transaction, not only the payment approval. Confirm the agent, customer instructions, information used, final order, and fulfillment status.',
      takeaways: [
        ['Agent-led transactions add new questions', 'In addition to the account and payment, merchants need to know which agent acted, what the customer allowed, and what information shaped the order.'],
        ['Conflicting evidence requires a pause', 'A valid signature or approved payment does not cancel out a changed address, unusual order pattern, or mismatch with the customer’s instructions.'],
        ['Use a four-step response', 'Prevent unsafe actions, detect unusual activity, contain what can still be stopped, and resolve the case using the complete transaction record.']
      ],
      next: 'Next, you will learn how to tell a verified shopping agent from a malicious bot using copied details.'
    },
    {
      summary: 'Verify an agent with evidence that is difficult to copy. Then separately confirm the customer’s permission and the risk of the order.',
      takeaways: [
        ['Names and logos can be copied', 'A familiar name, image, browser label, or request format does not prove who sent the request.'],
        ['Use current, transaction-specific proof', 'Check the signature, current key, timestamp, one-time request identifier, intended merchant, and protected transaction details.'],
        ['Respond in proportion to the risk', 'Request fresh proof, limit access, slow repeated failures, hold suspicious orders, and block confirmed abuse.']
      ],
      next: 'Next, you will see how a legitimate agent can be misled by harmful content or a compromised connected service.'
    },
    {
      summary: 'A legitimate agent can still be manipulated. Limit the actions it can take and require confirmation when the transaction changes in a meaningful way.',
      takeaways: [
        ['Harmful instructions can hide in content', 'Product pages, files, images, reviews, tools, and stored information may attempt to redirect the agent.'],
        ['Limit the possible harm', 'Restrict tools, destinations, credentials, amounts, and order changes to what the customer and transaction require.'],
        ['Stop and trace suspicious actions', 'Preserve the content the agent received, the changes it made, and the tools it used before removing the harmful input.']
      ],
      next: 'Next, you will examine false or changing product information that can distort an agent’s recommendation.'
    },
    {
      summary: 'Product information is part of the fraud risk. Preserve what the agent actually saw and verify important terms again at checkout.',
      takeaways: [
        ['Look for meaningful product changes', 'Product identity, price, availability, seller, fees, subscriptions, delivery, and return terms can all change the customer’s decision.'],
        ['Keep the original record', 'Save the exact listing and product-feed details shown to the agent, including the source, seller, time, and later changes.'],
        ['Review related activity', 'A sudden price change, payout change, review surge, or cluster of similar orders may indicate a coordinated campaign.']
      ],
      next: 'Next, you will investigate disputes about whether the completed purchase matched the customer’s request.'
    },
    {
      summary: 'Resolve an intent dispute by tracing the customer’s request through the final cart, payment, and delivery.',
      takeaways: [
        ['Start with the customer’s request', 'Identify whether the customer allowed comparison, reservation, or purchase and record all limits and conditions.'],
        ['Track every meaningful change', 'Connect the selected item, cart versions, amount, fees, delivery details, confirmation, and the party responsible for each change.'],
        ['Be clear about evidence gaps', 'Explain what the records show, what is missing or conflicting, and which customer, payment, or dispute process applies.']
      ],
      next: 'Next, you will compare what can be stopped or recovered across different payment and fulfillment stages.'
    },
    {
      summary: 'Payment settlement does not prove a purchase was legitimate. Act quickly on any goods, services, or digital value that can still be stopped.',
      takeaways: [
        ['Payment methods have different recovery options', 'Cards, fast bank payments, and digital-asset transfers may provide different ways and timeframes to stop or recover funds.'],
        ['Fulfillment creates another decision window', 'Shipment, service activation, voucher use, or account credit may still be stopped even after funds move.'],
        ['Use the process that actually applies', 'Contact the correct provider, preserve records, notify the customer, and do not promise a card-style chargeback for every method.']
      ],
      next: 'Finally, you will examine how teams determine responsibility and coordinate an agent-related incident.'
    },
    {
      summary: 'Do not assign responsibility based only on the system that took the final action. Review the cause, control ownership, agreements, and applicable rules.',
      takeaways: [
        ['Separate the action from the cause', 'An agent may exceed a limit, misunderstand data, use a compromised tool, or follow harmful content supplied by another party.'],
        ['Give each team a clear role', 'Fraud, payments, security, product, support, legal, compliance, and partners need defined authority and communication paths.'],
        ['Preserve the complete record', 'Keep customer instructions, agent actions, content versions, order changes, payment, fulfillment, communications, and relevant agreements.']
      ],
      next: 'You have completed the seven lessons. Review the course resources, then begin the final exam.'
    }
  ];

  lessonLanguage.forEach((item, index) => {
    lessons[index].purpose = item.purpose;
    lessons[index].objectives = item.objectives;
  });
  lessonReviews.splice(0, lessonReviews.length, ...reviews);

  const previousReviewScreen = renderReviewScreen;
  renderReviewScreen = function () {
    if (state.screen !== 0 && state.screen !== 1) return previousReviewScreen();
    const skills = [
      'Review agent identity, customer instructions, order changes, payment, and fulfillment together.',
      'Distinguish verified agents from bots that copy familiar names or request details.',
      'Limit and contain harmful instructions that redirect a legitimate agent.',
      'Detect false or changing products, prices, reviews, seller details, and purchase terms.',
      'Trace a disputed purchase from the customer’s request through delivery.',
      'Act on goods, services, or digital value that can still be stopped or recovered.',
      'Coordinate the teams and evidence needed to investigate responsibility.'
    ];
    const controls = [
      ['Verify the agent', 'Check current signatures, request freshness, intended merchant, and behavior.'],
      ['Confirm customer permission', 'Compare the final purchase with the customer’s current request, limits, and confirmation.'],
      ['Protect the agent’s actions', 'Limit tools, credentials, destinations, and meaningful changes that can occur without confirmation.'],
      ['Preserve what shaped the order', 'Keep the product information, customer instructions, cart changes, and other records used at decision time.'],
      ['Contain what remains', 'Stop additional orders, payment completion, shipment, service, or digital-value use when possible.'],
      ['Determine responsibility from evidence', 'Review the cause, failed control, agreements, payment rules, and applicable law before assigning fault.']
    ];
    if (state.screen === 0) return '<section class="screen-panel review-screen"><span class="screen-eyebrow">Course Review</span><h3>What You Can Now Do</h3><p class="section-lead">You can now apply the following skills to agent-related fraud and disputes:</p><div class="review-skill-list">' + skills.map(function (value, index) { return '<div><span>' + (index + 1) + '</span><p>' + esc(value) + '</p></div>'; }).join('') + '</div></section>';
    return '<section class="screen-panel review-screen"><span class="screen-eyebrow">Key Takeaways</span><h3>Six Checks to Make</h3><p class="section-lead">Use these checks when an AI agent influences a transaction.</p><div class="review-control-grid">' + controls.map(function (value) { return '<article><h4>' + esc(value[0]) + '</h4><p>' + esc(value[1]) + '</p></article>'; }).join('') + '</div></section>';
  };
})();
