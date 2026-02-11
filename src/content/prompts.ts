export type PromptCategory =
  | "Flights"
  | "Hotels"
  | "Packages"
  | "Transport"
  | "Planning"
  | "Cards & Miles";

export type PromptVariable = {
  key: string;
  label: string;
  placeholder?: string;
  example?: string;
};

export type PromptEntry = {
  id: string;
  slug?: string;
  title: string;
  summary: string;
  category: PromptCategory;
  intent?: string;
  purpose?: string;
  tags: string[];
  promptTemplate: string;
  variables?: PromptVariable[];
  whenToUse?: string[];
};

export const categories: PromptCategory[] = [
  "Flights",
  "Hotels",
  "Packages",
  "Transport",
  "Planning",
  "Cards & Miles",
];

export const promptLibrary: PromptEntry[] = [
  // ── Flights ──────────────────────────────────────────────────────────
  {
    id: "flight-cashback-compare",
    title: "Compare flight bookings to maximize savings and rewards",
    summary:
      "Walk through a step-by-step workflow to compare flight booking channels, factoring in rebates, card rewards, and net effective cost.",
    category: "Flights",
    intent: "comparison",
    purpose:
      "Teaches users to evaluate flight bookings through a rewards lens instead of just looking at base price. The workflow normalizes checking reward platforms and card benefits as a standard part of flight booking.",
    tags: ["flights", "rewards", "comparison", "workflow"],
    variables: [
      { key: "origin", label: "Origin city", placeholder: "e.g. Singapore", example: "Singapore" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Tokyo", example: "Tokyo" },
      { key: "month", label: "Travel month", placeholder: "e.g. October", example: "October" },
    ],
    whenToUse: [
      "When you have a specific flight route in mind and want to find the best overall price across channels",
      "Before committing to any single booking site",
      "When you want to factor in rebates and card rewards — not just the ticket price",
    ],
    promptTemplate: `I want to book a return flight from {{origin}} to {{destination}} in {{month}}. Help me build a comparison workflow to find the best overall price factoring in rebates and card rewards.

Step 1 — Identify booking channels: List the major channels where I could book this route (online travel agencies, airline direct, metasearch tools). For each, note whether it typically supports rewards platform tracking and whether booking direct earns airline loyalty points.

Step 2 — Comparison worksheet: Create a blank table I can fill in as I gather quotes, with these columns: Channel | Base Price | Fees & Taxes | Promo Code Value | Rebate Rate (illustrative: typically 1–6% for flights) | Rebate Cap | Card Rewards Rate | Net Effective Cost | Notes (loyalty points, flexibility, baggage).

Step 3 — Tradeoff analysis: Explain the key tradeoffs between booking via an OTA with rebates vs. booking direct with the airline (loyalty points, seat selection, change/cancel flexibility, price matching).

Step 4 — Rewards Capture Checklist: Before I click "book," remind me to: (a) open my rewards platform first, (b) verify the current rate and any caps, (c) check cookie/tracking hygiene (clear cookies, disable ad blockers if needed, use web vs. in-app as required), (d) screenshot the activation, (e) note the order ID for claims, (f) confirm no conflicting coupon terms that void rewards.

Step 5 — Suggest 2–3 follow-up prompts I can ask after I collect real quotes to help me make the final decision.`,
  },
  {
    id: "flight-budget-maximizer",
    title: "Maximize savings on budget airline tickets",
    summary:
      "A complete strategy for budget carriers covering add-on economics, promo stacking, and a rewards tracking checklist.",
    category: "Flights",
    intent: "optimization",
    purpose:
      "Helps users see budget airline bookings as multi-layered savings opportunities — not just cheap base fares — by incorporating add-on economics and rewards tracking into the decision.",
    tags: ["budget airlines", "savings", "add-ons", "stacking"],
    variables: [
      { key: "origin", label: "Origin city", placeholder: "e.g. Kuala Lumpur", example: "Kuala Lumpur" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Bali", example: "Bali" },
    ],
    whenToUse: [
      "When booking low-cost carriers",
      "When you want to understand if add-ons (bags, seats, meals) are worth it vs. booking separately",
      "When deciding between using a promo code or going through a rewards platform",
    ],
    promptTemplate: `I'm booking a budget airline flight from {{origin}} to {{destination}}. Help me maximize my total savings with a structured approach.

1. Booking timing: When should I book relative to my travel date for the best base fare? Cover any general patterns for budget carriers (e.g., mid-week pricing, advance purchase windows).

2. Add-on economics: For each common add-on (checked baggage, seat selection, meals, priority boarding, travel insurance), explain when it's better to buy it bundled at booking vs. separately later vs. skipping entirely. Note which add-ons might be covered by my credit card benefits.

3. Promo code vs. rebates decision rules: If the airline has an active promo code and my rewards platform also offers a rate, walk me through how to decide which to use. Cover: Can they stack? If not, which typically delivers more value? What are the common exclusion rules that void rewards when using certain promo codes?

4. Booking channel comparison: Should I book via the airline's website, app, or through a third-party OTA? For each channel, note the rewards eligibility, price differences, and flexibility tradeoffs.

5. Rewards Capture Checklist: Before completing the booking, remind me to: (a) activate my rewards platform, (b) verify the current rate and cap for the airline or OTA, (c) check tracking requirements (web vs. app, cookie hygiene), (d) screenshot the activation and note the order confirmation number, (e) verify promo code and rewards compatibility.

6. Suggest 2 follow-up prompts I can use after booking to track my savings and optimize future budget flights.`,
  },
  {
    id: "flight-error-fare-alert",
    title: "Spot and act on flight error fares",
    summary:
      "A speed-and-risk playbook for identifying error fares, booking fast, and understanding rewards tracking risks.",
    category: "Flights",
    intent: "strategy",
    purpose:
      "Teaches users the error fare workflow while being transparent about rewards tracking risks — building trust in the rewards ecosystem even when outcomes are uncertain.",
    tags: ["error fares", "savings", "speed", "risk"],
    variables: [],
    whenToUse: [
      "When you see a suspiciously cheap flight and want to verify if it's an error fare",
      "When you want a ready-made action plan for the next time an error fare appears",
      "When you want to understand whether rewards will track on error fares",
    ],
    promptTemplate: `Explain flight error fares and give me a complete speed-and-risk playbook for acting on them.

1. What are error fares? Briefly explain how they happen (pricing system glitches, currency conversion errors, missing fuel surcharges) and how often airlines actually honour them.

2. How to spot them: List the most reliable sources to monitor for error fares (communities, social media accounts, alert services, fare comparison tools). What price thresholds or patterns suggest a fare is an error vs. a legitimate sale?

3. Speed protocol — when I find one: Give me a step-by-step action plan optimized for speed: (a) verify the fare on a second source, (b) book immediately (don't wait), (c) use a credit card with travel protections, (d) book refundable if possible, (e) don't call the airline to ask about the fare.

4. Rewards considerations: Be honest about tracking risks — will rewards platforms typically honour transactions on error fares? What happens if the fare is cancelled — do rewards get clawed back? Should I still route through my rewards platform, and what evidence should I capture (screenshots, confirmation emails, activation proof)?

5. Post-booking: What to do after booking — when to book hotels/activities (wait vs. go ahead), how to monitor if the airline cancels, timeline expectations, and how to file a chargeback or rewards claim if things go wrong.

6. Suggest 2 follow-up prompts for monitoring error fare sources and understanding airline cancellation policies.`,
  },

  // ── Hotels ───────────────────────────────────────────────────────────
  {
    id: "hotel-cashback-stacking",
    title: "Stack hotel rewards for maximum savings",
    summary:
      "Navigate the tradeoffs between booking direct vs. OTAs, and learn how to layer loyalty points, card perks, and rebates without conflicts.",
    category: "Hotels",
    intent: "optimization",
    purpose:
      "Normalizes the habit of evaluating hotel bookings across three reward layers (loyalty, card benefits, rebates) and understanding when they can coexist vs. conflict.",
    tags: ["hotels", "rewards stacking", "loyalty", "direct vs OTA"],
    variables: [
      { key: "destination", label: "Destination city", placeholder: "e.g. Bangkok", example: "Bangkok" },
      { key: "nights", label: "Number of nights", placeholder: "e.g. 4", example: "4" },
      { key: "budget", label: "Nightly budget (USD)", placeholder: "e.g. 150", example: "150" },
    ],
    whenToUse: [
      "When you want to earn the most from a hotel stay across loyalty, credit card, and rebates",
      "When deciding whether to book directly with the hotel or through an OTA",
      "When you want to understand which reward layers can stack and which conflict",
    ],
    promptTemplate: `I'm booking a hotel in {{destination}} for {{nights}} nights at around \${{budget}}/night. Help me maximize rewards by stacking loyalty points, credit card perks, and rebates.

1. Direct vs. OTA tradeoffs: Compare booking directly on the hotel's website vs. through online travel agencies. For each path, explain what I gain and lose: loyalty points, member-only rates, room upgrades, status nights, cancellation flexibility, and rewards platform eligibility.

2. The three reward layers: For a hotel stay at this price point, walk me through each stacking layer:
   - Layer 1: Hotel loyalty program (points per dollar, status benefits, member rates)
   - Layer 2: Credit card rewards (travel cards with bonus hotel categories, card-linked offers, complimentary perks like breakfast or upgrades)
   - Layer 3: Rewards platform (illustrative range: typically 2–8% for hotels through OTAs)
   Explain which combinations can stack and which are mutually exclusive (e.g., OTA rebates usually mean no hotel loyalty points).

3. Double-dip caveats: What are the common gotchas? Cover: OTA bookings not earning loyalty points, prepaid vs. pay-at-hotel rebate differences, rate parity issues, and promo code conflicts with rewards tracking.

4. Worked example template: Provide a worksheet I can fill in with real numbers, with columns: Booking Channel | Room Rate | Loyalty Points Value | Card Rewards Value | Rebates Value | Net Effective Cost | Flexibility Rating. Include one illustrative example row (clearly labeled as illustrative).

5. Rewards Capture Checklist: Before booking, remind me to: (a) check if the hotel has a loyalty program I should join first, (b) activate my rewards platform, (c) verify the rate and cap, (d) compare the OTA-with-rebates price against the direct member rate, (e) screenshot activation, (f) check my card's hotel category bonus.

6. Suggest 2 follow-up prompts to help me decide between direct and OTA for my specific booking.`,
  },
  {
    id: "hotel-last-minute-deals",
    title: "Find last minute hotel savings with rewards",
    summary:
      "A channel strategy for short-notice hotel bookings covering mobile vs. desktop, refundable vs. non-refundable, and rewards tracking.",
    category: "Hotels",
    intent: "strategy",
    purpose:
      "Ensures users don't abandon the rewards mindset when booking under time pressure. Establishes a rapid-booking workflow that still captures rebates and card rewards.",
    tags: ["last-minute", "hotels", "channel strategy", "mobile"],
    variables: [
      { key: "destination", label: "Destination city", placeholder: "e.g. Seoul", example: "Seoul" },
    ],
    whenToUse: [
      "When you need a hotel within the next 48 hours",
      "When comparing mobile app vs. desktop booking for last-minute stays",
      "When you want to earn rewards even on rushed bookings",
    ],
    promptTemplate: `I need a hotel in {{destination}} within the next 48 hours. Give me a channel strategy for finding the best price while still earning rewards.

1. Channel comparison: Compare the main channels for last-minute bookings: hotel apps with mobile-only rates, online travel agencies, same-day booking apps, and calling the hotel directly. For each, note: typical discount vs. standard rate, rewards platform compatibility, and any mobile-vs-desktop price differences.

2. Booking strategy by urgency:
   - 24–48 hours out: What approaches work best? (flexible date search, nearby alternatives, prepay discounts)
   - Same-day: Different tactics? (walk-in negotiation, app-only flash prices, loyalty member rates)

3. Refundable vs. non-refundable: When does it make sense to pay more for a refundable rate at last-minute, and when should I commit to non-refundable for the deeper discount? How does this interact with rewards (does refundable vs. non-refundable affect tracking)?

4. Rewards on rushed bookings: Even when booking fast, walk me through how to still capture rewards: (a) which rewards platforms support mobile booking, (b) whether to book via app or web for tracking purposes, (c) credit card travel category bonuses to consider.

5. Rewards Capture Checklist (speed version): A quick 30-second checklist for activating rewards even under time pressure: (a) open rewards platform or app, (b) verify the hotel/OTA is eligible, (c) click through, (d) screenshot, (e) complete booking.

6. Suggest 2 follow-up prompts for comparing the quotes I find and verifying my rewards tracked correctly.`,
  },
  {
    id: "hotel-vs-rental",
    title: "Hotel vs. short term rental: total cost with rewards",
    summary:
      "Compare hotels and short-term rentals factoring in rewards availability, hidden fees, and which booking channels earn rewards.",
    category: "Hotels",
    intent: "comparison",
    purpose:
      "Highlights that rewards availability differs significantly between hotels and short-term rentals, helping users factor this into their accommodation decision.",
    tags: ["comparison", "rental", "rewards", "total cost"],
    variables: [
      { key: "destination", label: "Destination city", placeholder: "e.g. Barcelona", example: "Barcelona" },
      { key: "nights", label: "Number of nights", placeholder: "e.g. 5", example: "5" },
      { key: "travelers", label: "Number of travelers", placeholder: "e.g. 4", example: "4" },
    ],
    whenToUse: [
      "When deciding between a hotel and a short-term rental for your trip",
      "When traveling with a group and weighing cost vs. reward earning potential",
      "When you want to understand which accommodation types earn rebates",
    ],
    promptTemplate: `I'm traveling to {{destination}} for {{nights}} nights with {{travelers}} people. Help me compare staying at a hotel vs. a short-term rental with a focus on total cost including rewards.

1. True cost comparison: Build a side-by-side worksheet I can fill in:
   Hotel column: Nightly rate, taxes, resort/city fees, parking, breakfast cost, total before rewards.
   Rental column: Nightly rate, cleaning fee, service fee, taxes, utilities/extras, total before rewards.

2. Rewards availability gap: Explain honestly which option earns more rewards. Cover:
   - Hotels: rewards platforms typically offer rates on OTA hotel bookings (illustrative: 2–8%); hotel loyalty points; credit card hotel category bonuses.
   - Short-term rentals: rewards availability is often more limited — many rental platforms have minimal or no rewards platform coverage.

3. Hybrid approach: For groups, is it ever better to split — some nights in a hotel (earning rewards) and some in a rental (more space)? When does this make sense?

4. Hidden costs and flexibility: Compare cancellation policies, deposit requirements, check-in flexibility, and any costs that aren't immediately obvious (currency conversion fees, damage deposits, key exchange fees).

5. Rewards Capture Checklist: For whichever option I choose, remind me to: (a) check if the booking platform is available through my rewards platform, (b) verify tracking requirements, (c) use the right credit card for the accommodation category, (d) screenshot activation.

6. Suggest 2 follow-up prompts for making the final decision after I've gathered real quotes.`,
  },

  // ── Packages ─────────────────────────────────────────────────────────
  {
    id: "package-deal-builder",
    title: "Bundle vs. separate bookings: maximize trip rewards",
    summary:
      "Decide when to bundle flights + hotel vs. booking separately to earn more rebates and rewards overall.",
    category: "Packages",
    intent: "optimization",
    purpose:
      "Teaches users that the best total rewards outcome often comes from strategically choosing when to bundle and when to book separately — normalizing rebates as a key decision factor.",
    tags: ["packages", "bundling", "separate bookings", "rewards"],
    variables: [
      { key: "destination", label: "Destination city", placeholder: "e.g. Osaka", example: "Osaka" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 7", example: "7" },
      { key: "travelers", label: "Number of travelers", placeholder: "e.g. 2", example: "2" },
    ],
    whenToUse: [
      "When planning a trip and wondering if a package or separate bookings will save more overall",
      "When you want to understand where rebates apply — bundles vs. individual components",
      "When comparing OTA packages against booking flights and hotels independently",
    ],
    promptTemplate: `Help me plan a {{duration}}-day trip to {{destination}} for {{travelers}} people. I want to understand whether bundling (flight + hotel package) or booking each component separately earns me more total rewards.

1. Bundle vs. separate tradeoffs: Explain the pros and cons of each approach:
   - Bundled package (OTA packages): typically lower headline price, but how does rewards tracking work on bundles? Are rates applied to the total or just one component? What about loyalty points and flexibility?
   - Separate bookings (flight + hotel + activities independently): more control, ability to optimize rebates per component, earn loyalty points per channel, but potentially higher total base price.

2. Component-by-component worksheet: Create a table I can fill in with real quotes:
   Component | Bundle Price | Separate Price | Rewards Channel | Illustrative Rebate % | Card Rewards | Loyalty Points | Net Cost
   Rows: Flights, Accommodation, Airport Transfer, Activities/Tours, Travel Insurance.

3. Where rebates commonly apply: For each trip component, note which booking channels typically offer rewards platform tracking. Be honest about where rebates are strong (OTA hotels, some flights) vs. weak (activities, local transport).

4. Decision framework: Give me a simple rule of thumb for when bundles beat separate bookings from a total-rewards perspective, and vice versa.

5. Rewards Capture Checklist: For each component I end up booking, remind me to: (a) check my rewards platform for that merchant category, (b) note any caps or exclusions, (c) activate and screenshot before each booking, (d) use the optimal credit card per category.

6. Suggest 2 follow-up prompts for once I've gathered quotes in both approaches.`,
  },
  {
    id: "honeymoon-savings-plan",
    title: "Plan a honeymoon with rewards on every booking",
    summary:
      "Design a honeymoon itinerary with a rewards strategy for each booking, using conditional rebate estimates.",
    category: "Packages",
    intent: "planning",
    purpose:
      "Shows that even premium/luxury travel benefits from a rewards-first approach. Uses conditional language for rebates to stay honest while reinforcing the checking habit.",
    tags: ["honeymoon", "luxury", "rewards", "planning"],
    variables: [
      { key: "destination", label: "Destination", placeholder: "e.g. Maldives", example: "Maldives" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 10", example: "10" },
      { key: "budget", label: "Total budget (USD)", placeholder: "e.g. 8000", example: "8000" },
    ],
    whenToUse: [
      "When planning a honeymoon or special occasion trip with a larger budget",
      "When you want to earn meaningful rewards on premium bookings",
      "When you want a full itinerary with a rewards strategy built in",
    ],
    promptTemplate: `Plan a {{duration}}-day honeymoon to {{destination}} with a budget of \${{budget}}. For every booking in the itinerary, include a rewards strategy.

1. Itinerary outline: Suggest a day-by-day outline covering: flights, luxury accommodation (1–2 options at different price tiers), romantic dining, activities/excursions, and transfers.

2. Rewards strategy per booking: For each component in the itinerary, note:
   - Recommended booking channel (direct vs. OTA)
   - Whether rewards platform tracking is typically available for this type of booking (be honest — if it's unlikely, say so)
   - If available, an illustrative rebate range (clearly labeled as "typical range, verify on your platform": e.g., hotels via OTA 3–7%, flights 1–4%)
   - Credit card category that would earn bonus rewards
   - Loyalty program to enroll in before booking

3. Budget worksheet: Create a budget table with columns: Component | Estimated Cost | Booking Channel | Rebates Available? | Illustrative Rebates | Card Rewards | Loyalty Points | Notes. Leave it fillable so I can plug in real numbers.

4. Splurge-vs-save guide: For a honeymoon, where should I splurge (experiences, room quality) vs. save (transfers, certain meals)? Factor in where rewards offset the cost most.

5. Rewards Capture Checklist: Before each booking, remind me to: (a) check if the merchant/platform is on my rewards platform, (b) activate tracking, (c) use the right card, (d) screenshot and record. Note that honeymoon bookings are often high-value, so even small rebate percentages yield meaningful amounts.

6. Suggest 2 follow-up prompts for finalizing the itinerary and maximizing rewards on the specific bookings I choose.`,
  },

  // ── Transport ────────────────────────────────────────────────────────
  {
    id: "car-rental-cashback",
    title: "Save on car rentals with rewards",
    summary:
      "Compare rental channels covering prepay vs. pay-at-counter, insurance decisions, and rewards tracking.",
    category: "Transport",
    intent: "comparison",
    purpose:
      "Brings the rewards lens into car rental decisions, which travelers often book without considering rebates. Covers the full cost picture including insurance and hidden fees.",
    tags: ["car rental", "insurance", "rewards", "hidden fees"],
    variables: [
      { key: "destination", label: "Destination city/country", placeholder: "e.g. Italy", example: "Italy" },
      { key: "days", label: "Rental duration (days)", placeholder: "e.g. 5", example: "5" },
    ],
    whenToUse: [
      "When renting a car and wanting to factor in rebates and card benefits",
      "When comparing prepay vs. pay-at-counter options",
      "When deciding whether to buy rental insurance through the company, a portal, or rely on credit card coverage",
    ],
    promptTemplate: `I need to rent a car in {{destination}} for {{days}} days. Help me find the best price while maximizing rewards.

1. Channel comparison: List the major car rental booking channels (aggregators, activity marketplaces, direct from rental companies). For each, note: typical price competitiveness, whether rewards platform tracking is available, and any loyalty programs worth joining.

2. Prepay vs. pay-at-counter: Explain the tradeoffs: prepay (often cheaper, locks in rate, but less flexible) vs. pay-at-counter (more flexible, but may not track through rewards platforms the same way). How does each option affect rebates and credit card protections?

3. Insurance decision tree: Walk me through the insurance options: (a) rental company's CDW/LDW, (b) third-party insurance (bookable through portals with potential rebates), (c) credit card rental insurance. Which cards typically cover this? What are the common exclusions?

4. Hidden fees to watch for: List fees that inflate the real cost: currency conversion, cross-border charges, fuel policies, young/additional driver fees, airport surcharges, deposit holds on my card.

5. Comparison worksheet: Create a fillable table: Channel | Base Rate | Insurance Cost | Estimated Fees | Rebate Rate (illustrative: 3–8% on aggregators) | Card Rewards | Net Cost | Notes.

6. Rewards Capture Checklist: Before booking, (a) check my rewards platform for the rental channel, (b) verify tracking works for prepaid vs. pay-later, (c) confirm my credit card offers rental insurance, (d) activate rewards and screenshot, (e) note the booking reference.

7. Suggest 2 follow-up prompts for comparing specific quotes and understanding insurance coverage.`,
  },
  {
    id: "airport-transfer-deals",
    title: "Find the best airport transfer with rewards",
    summary:
      "Compare transfer options with a focus on which booking channels are rewards-eligible and app-vs-web considerations.",
    category: "Transport",
    intent: "comparison",
    purpose:
      "Extends the rewards mindset to ground transport — an area where many travelers default to whatever's convenient without checking rewards availability.",
    tags: ["airport", "transfers", "app vs web", "rewards channels"],
    variables: [
      { key: "airport", label: "Airport name or code", placeholder: "e.g. NRT (Narita)", example: "NRT (Narita)" },
    ],
    whenToUse: [
      "When arriving at an airport and wanting to compare transfer options including rewards",
      "When deciding between ride-hailing, pre-booked transfers, and public transit",
      "When you want to know which transport channels support rewards tracking",
    ],
    promptTemplate: `I'm arriving at {{airport}} and need to get to the city center. Help me compare transport options, focusing on which channels let me earn rewards.

1. Options overview: List the main transfer options: ride-hailing apps, pre-booked private transfer (via activity marketplaces or OTAs), airport shuttle/bus, train/metro, and taxi. For each, estimate typical cost range and travel time.

2. Rewards-eligible channels: Be specific about which options can be booked through a rewards platform or app:
   - Pre-booked transfers via OTAs: typically rewards-eligible
   - Ride-hailing apps: generally NOT rewards-eligible through portals (but may have in-app rewards)
   - Public transit: no portal rewards, but cheapest option
   Note any app-only vs. web booking considerations that affect rewards tracking.

3. Comparison table: Create a fillable table: Option | Estimated Cost | Travel Time | Comfort Level | Rewards Eligible? | Illustrative Rebates | Flexibility (cancel/change) | Notes.

4. Decision framework: When should I prioritize cost (public transit), comfort (private transfer), or rewards (pre-booked via rewards-eligible platform)? Give me a quick decision tree based on party size, luggage, and time of arrival.

5. Rewards Capture Checklist: If booking a transfer through a rewards-eligible channel, (a) activate the platform before booking, (b) verify the merchant is listed, (c) note whether to book via app or web for tracking, (d) screenshot activation.

6. Suggest 1–2 follow-up prompts for comparing specific transfer quotes.`,
  },

  // ── Planning ─────────────────────────────────────────────────────────
  {
    id: "travel-budget-planner",
    title: "Build a travel budget with rewards assumptions",
    summary:
      "Create a detailed trip budget with a dedicated rewards assumptions block so rebate projections are transparent and adjustable.",
    category: "Planning",
    intent: "planning",
    purpose:
      "Makes rewards a first-class line item in trip budgeting. The explicit 'rewards assumptions' block teaches users to think of rebates as a concrete savings lever they should actively manage.",
    tags: ["budget", "planning", "rewards assumptions", "worksheet"],
    variables: [
      { key: "destination", label: "Destination", placeholder: "e.g. Vietnam", example: "Vietnam" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 10", example: "10" },
      { key: "travelers", label: "Number of travelers", placeholder: "e.g. 2", example: "2" },
      { key: "currency", label: "Budget currency", placeholder: "e.g. USD", example: "USD" },
    ],
    whenToUse: [
      "When planning a trip and wanting a complete budget template",
      "When you want to see how rebates and card rewards reduce your effective trip cost",
      "When comparing destination costs and wanting rewards factored into the comparison",
    ],
    promptTemplate: `Create a detailed travel budget for a {{duration}}-day trip to {{destination}} for {{travelers}} people in {{currency}}.

1. Budget categories: Estimate costs for: flights, accommodation, food & dining, local transport, activities & tours, shopping, travel insurance, and miscellaneous. Give a realistic range (budget / mid-range / comfortable) for each category.

2. Rewards assumptions block: Before calculating savings, create a dedicated section where I set my assumptions (I'll fill these in with real numbers from my platforms):
   - My rewards platform's rate for flights: __% (illustrative default: 1–4%)
   - My rewards platform's rate for hotels/OTAs: __% (illustrative default: 3–8%)
   - My rewards platform's rate for activities: __% (illustrative default: 2–5%)
   - My credit card's travel rewards rate: __%
   - Any rebate caps per transaction or per month: $__
   Label all defaults as "illustrative — verify on your platform."

3. Budget worksheet: Create a master table with columns: Category | Estimated Cost | Booking Channel | Rebate Rate (from assumptions) | Projected Rebates | Card Rewards | Net Effective Cost. Include a total row.

4. Savings levers: Identify the top 3 categories where optimizing the booking channel or timing could increase my rewards the most.

5. Rewards Capture Checklist: For each booking category, remind me to check my rewards platform, activate tracking, and use the optimal credit card.

6. Suggest 2 follow-up prompts for refining the budget as I gather real quotes and rates.`,
  },
  {
    id: "seasonal-travel-deals",
    title: "When to book travel for maximum savings",
    summary:
      "A monitoring checklist for booking windows, seasonal pricing, and reward platform promotions — without claiming specific rates.",
    category: "Planning",
    intent: "strategy",
    purpose:
      "Teaches users to monitor rewards platforms for boosted rates as a standard part of trip timing, without making false claims about specific promotions.",
    tags: ["timing", "seasonal", "monitoring", "strategy"],
    variables: [
      { key: "destination", label: "Destination", placeholder: "e.g. Japan", example: "Japan" },
    ],
    whenToUse: [
      "When you have flexibility on travel dates and want to optimize timing for both price and rewards",
      "When planning ahead and wanting to know when rewards platforms tend to run promotions",
      "When creating a trip monitoring plan months in advance",
    ],
    promptTemplate: `I want to travel to {{destination}} and have flexible dates. Help me build a monitoring plan to book at the best time for both price and rewards.

1. Destination seasonality: What are the peak, shoulder, and low seasons for {{destination}}? When are flights and hotels cheapest? When is the weather best? Help me identify the sweet spot of good weather + lower prices.

2. General booking timing: What are the well-known patterns for booking windows? (e.g., how far in advance for cheapest flights, mid-week booking advantages, etc.)

3. Rewards platform promotion calendar — things to watch for: Rewards platforms often run boosted-rate promotions during major shopping events. List the key dates to monitor throughout the year (e.g., platform anniversary sales, mid-year sales, 9.9/10.10/11.11, Black Friday/Cyber Monday, year-end sales). DO NOT claim specific rates — instead, note these as "periods when boosted rebate rates have historically been offered; check your platform closer to the date."

4. Monitoring checklist: Create a practical checklist I can follow in the months before my trip:
   - Set price alerts on flights (metasearch tools, price alert apps)
   - Set calendar reminders for major rewards promotion periods
   - Join email/push notifications from my rewards platform for travel savings
   - Monitor hotel prices weekly starting X months out
   - Check credit card portal for rotating travel bonuses

5. Decision framework: How do I balance "cheapest price" vs. "highest rebate rate" when they don't align? Give me a simple way to calculate the net best time.

6. Suggest 2 follow-up prompts for when I'm closer to booking and want to finalize timing.`,
  },
  {
    id: "travel-rewards-checklist",
    title: "Prebooking rewards SOP",
    summary:
      "A comprehensive standard operating procedure for never missing rewards, covering tracking hygiene, coupon conflicts, and claims.",
    category: "Planning",
    intent: "checklist",
    purpose:
      "Creates a reusable, printable workflow that normalizes rewards activation as an automatic step in any travel booking — the core behavior this site aims to instill.",
    tags: ["checklist", "SOP", "tracking", "claims"],
    variables: [],
    whenToUse: [
      "Before any travel booking to ensure you capture all available rewards",
      "When setting up your reward-earning workflow for the first time",
      "When you've had rewards fail to track and want a reliable process going forward",
    ],
    promptTemplate: `Create a comprehensive, printable Standard Operating Procedure (SOP) I should follow before and after every travel booking to ensure I never miss rewards.

BEFORE BOOKING:
1. Research phase: Compare prices across at least 3 platforms. Check if each platform is available on my rewards platform. Note the rebate rate and any caps for each.
2. Promo code audit: Search for valid promo codes, but check whether using a code voids rewards (some platforms have exclusion rules). Document the decision: code OR rewards, whichever yields more.
3. Credit card selection: For this booking category (flights, hotels, transport, etc.), which of my cards offers the best rewards rate? Check for any card-linked offers or rotating bonuses.
4. Loyalty enrollment: Am I a member of the relevant loyalty program? If not, sign up BEFORE booking (don't miss the points).
5. Rewards activation: Open my rewards platform. Navigate to the specific merchant. Click through to the merchant's site. Verify the activation (look for a confirmation banner or popup).
6. Tracking hygiene: Clear cookies or use a clean browser session. Disable ad blockers temporarily. Confirm whether to book via web or app (some platforms only track one). Do NOT open the merchant in a separate tab — use only the platform's redirect link.
7. Screenshot everything: Screenshot the rewards activation page, the rate shown, and the timestamp.

DURING BOOKING:
8. Complete the booking in one session. Avoid navigating away or opening new tabs.
9. Note the order ID, confirmation number, and total amount paid.

AFTER BOOKING:
10. Verification: Check my rewards platform within 24–48 hours to confirm the transaction appears as "pending."
11. If NOT tracked: Wait 7 days, then file a missing rewards claim. Attach: screenshots of activation, order confirmation, payment proof.
12. Record-keeping: Log the booking in a simple tracker (spreadsheet or app): Date, Merchant, Amount, Rewards Platform, Rate, Status (pending/confirmed/claimed).
13. Post-trip: Verify rewards moved from "pending" to "confirmed" after the stay/travel is complete. Note the typical confirmation timeline (30–90 days for travel).

Format this as a printable checklist with checkboxes. Make it concise enough to fit on one page.`,
  },

  // ── Cards & Miles ────────────────────────────────────────────────────
  {
    id: "travel-card-comparison",
    title: "Best travel credit cards for rewards stacking",
    summary:
      "Compare travel cards that pair with rewards platforms, with explicit inputs for your country, spend, and travel patterns.",
    category: "Cards & Miles",
    intent: "comparison",
    purpose:
      "Positions credit cards as a complementary layer to rewards platforms — reinforcing the stacking mindset. Forces explicit assumptions to avoid hallucinated card details.",
    tags: ["credit cards", "rewards stacking", "comparison"],
    variables: [
      { key: "country", label: "Country of residence", placeholder: "e.g. Singapore", example: "Singapore" },
      { key: "frequency", label: "Trips per year", placeholder: "e.g. 4", example: "4" },
    ],
    whenToUse: [
      "When choosing a new travel credit card and wanting one that complements rewards platforms",
      "When you want to understand how card rewards stack with portal rebates",
      "When comparing annual fees against projected travel rewards",
    ],
    promptTemplate: `I live in {{country}} and travel about {{frequency}} times per year. Help me find the best travel credit card that stacks well with rewards platforms.

IMPORTANT: Credit card products change frequently. Use the following structure but note that I should verify all details directly with the card issuers. Present any specific numbers as "approximate / as of last knowledge" and recommend I confirm before applying.

1. Inputs I should define (fill in before evaluating):
   - Annual travel spend: $__
   - Main booking channels: (OTAs, direct, mix)
   - Priority: miles accumulation vs. rebates vs. travel perks (lounges, insurance)
   - Existing loyalty programs I'm in: __

2. Card comparison framework: For up to 5 recommended cards, create a table: Card Name | Annual Fee | Travel Rewards Rate | Lounge Access | Travel Insurance | Portal Stacking (does the card's rewards stack with platform rebates?) | Best For.

3. Stacking explanation: For each card, explain how the rewards interact with rewards platforms. Example scenario: "If I book a $500 hotel through an OTA via my rewards platform, and pay with this card, what layers of rewards do I earn?" Walk through the math with illustrative numbers.

4. Annual value calculator template: Create a worksheet: Spending Category | Annual Spend | Card Rewards Rate | Rewards Platform Rate | Total Rewards Value. Help me estimate whether a card's annual fee is justified by my travel patterns.

5. Suggest 2 follow-up prompts for doing a deeper comparison on specific cards or optimizing my card-portal strategy.`,
  },
  {
    id: "miles-vs-cashback",
    title: "Miles vs. rebates: which strategy saves more?",
    summary:
      "A math-driven comparison with explicit inputs for spend, redemption assumptions, and travel patterns.",
    category: "Cards & Miles",
    intent: "analysis",
    purpose:
      "Helps users make an informed choice between miles and rebates strategies with transparent assumptions. Either path reinforces the rewards-aware booking behavior.",
    tags: ["miles", "rebates", "analysis", "strategy"],
    variables: [
      { key: "monthly_spend", label: "Monthly travel spend (USD)", placeholder: "e.g. 500", example: "500" },
    ],
    whenToUse: [
      "When deciding whether to focus on collecting airline miles or earning rebates",
      "When you want to see the math behind each strategy for your specific spending level",
      "When evaluating whether to switch from a miles card to a rebates card or vice versa",
    ],
    promptTemplate: `I spend roughly \${{monthly_spend}} per month on travel bookings. Help me compare a miles strategy vs. a rebates strategy with transparent math.

1. Define my assumptions (I'll fill in real values):
   - Miles earn rate on my card: __ miles per $ (illustrative default: 1.2–2 miles per $)
   - Miles redemption value: __ cents per mile (illustrative: 1–2 cents for economy, 3–5 cents for business class)
   - Rewards platform rate for travel bookings: __% (illustrative: 2–6%)
   - Rebates card rewards rate: __% (illustrative: 1–3%)
   - How I typically redeem miles: economy / business / transfer to partners

2. Strategy A — Miles-focused: Calculate annual miles earned, estimated redemption value based on my assumptions, and factor in card annual fee and perks. Note the breakeven point.

3. Strategy B — Rebates-focused: Calculate annual rebates from platform + card, net of any annual fee. Show the guaranteed dollar value.

4. Head-to-head comparison table: Strategy | Annual Earn | Redemption Value (conservative) | Redemption Value (optimistic) | Card Fee | Net Annual Value | Certainty Level.

5. Key insight: Highlight that rebates value is guaranteed and immediate, while miles value depends on redemption skill and availability. When does the miles strategy clearly win (high redemption value travelers), and when do rebates win (casual travelers, value certainty)?

6. Suggest 2 follow-up prompts for calculating my specific numbers and optimizing whichever strategy I choose.`,
  },
  {
    id: "lounge-access-deals",
    title: "Get airport lounge access for less",
    summary:
      "Compare lounge access methods including cards, passes, and rewards opportunities on pass purchases.",
    category: "Cards & Miles",
    intent: "comparison",
    purpose:
      "Extends the rewards lens to a premium travel perk — showing that even lounge access has a rewards angle when purchasing passes through platforms.",
    tags: ["lounges", "airport", "perks", "passes"],
    variables: [
      { key: "airport", label: "Airport name or code", placeholder: "e.g. SIN (Changi)", example: "SIN (Changi)" },
    ],
    whenToUse: [
      "When you want lounge access but don't have a premium card",
      "When comparing the cost of different lounge access methods",
      "When wondering if you can earn rewards on lounge pass purchases",
    ],
    promptTemplate: `What are the most cost-effective ways to get airport lounge access at {{airport}}? Help me compare all options, including any rewards opportunities.

1. My inputs (I'll fill these in):
   - Credit cards I hold: __
   - Frequent flyer status: __
   - How often I fly per year: __
   - Typical cabin class: economy / premium economy / business

2. Access methods ranked by cost-effectiveness: Create a comparison for each method:
   - Credit card complimentary access (which cards at my airport include lounge access?)
   - Lounge membership programs (annual cost, is it purchasable through a rewards platform?)
   - Airline lounge day passes (typical cost, any rewards angle if booked online?)
   - Airline status/elite tier access
   - Pay-per-visit at the door
   - Lounge aggregator apps

3. Comparison table: Method | Annual/Per-Visit Cost | Lounges Available at {{airport}} | Rewards Opportunity? | Guest Policy | Notes.

4. Rewards on lounge passes: Can I earn rewards when purchasing lounge memberships through my rewards platform? If a platform carries the merchant, note it as a potential saving (verify availability on your platform).

5. Decision framework: Based on how often I fly, what's the breakeven point for an annual membership vs. paying per visit? At what frequency does a premium credit card with lounge access justify its fee?

6. Suggest 1–2 follow-up prompts for evaluating specific lounge options at my most-visited airports.`,
  },

  // ── NEW: Upper-funnel behavior-shaping prompts ──────────────────────
  {
    id: "cashback-merchant-discovery",
    title: "Find rewards merchants for your trip",
    summary:
      "Before booking anything, search your rewards platform for every travel merchant you might need.",
    category: "Planning",
    intent: "discovery",
    purpose:
      "Directly normalizes the behavior of opening a rewards platform and searching for merchants before booking — the core upper-funnel habit this site aims to build.",
    tags: ["merchant discovery", "rewards", "pre-booking", "planning"],
    variables: [
      { key: "destination", label: "Destination", placeholder: "e.g. Thailand", example: "Thailand" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 7", example: "7" },
    ],
    whenToUse: [
      "At the very start of trip planning, before you've booked anything",
      "When you want a checklist of what to search on your rewards platform",
      "When you're not sure which travel merchants your rewards platform covers",
    ],
    promptTemplate: `I'm planning a {{duration}}-day trip to {{destination}}. Before I book anything, help me create a list of merchant categories and search terms I should look for inside my rewards platform.

1. Merchant search list by trip component: For each component of my trip, suggest the categories and search terms I should look up on my rewards platform:
   - Flights: airlines, OTAs
   - Hotels: OTAs, hotel chain websites
   - Activities & tours: activity marketplaces, local tour operators
   - Car rental: aggregators, rental companies
   - Airport transfers: pre-booked transfer providers
   - Travel insurance: insurance providers
   - Shopping: department stores, duty-free, outlet malls at destination

2. Search strategy: How should I search — by merchant name, by category, or both? Remind me to check for "travel" category pages which often aggregate all travel merchants.

3. Rate comparison worksheet: Create a quick table I can fill in as I search: Merchant/Category | Available on My Platform? | Current Rate | Cap | Notes.

4. Bookmark the winners: Suggest I bookmark or favorite the merchants I'll actually use, so I can quickly activate them when it's time to book.

5. Suggest 2 follow-up prompts for comparing the rates I've found and deciding my booking order.`,
  },
  {
    id: "promo-vs-cashback-decision",
    title: "Promo code or rebates: which wins?",
    summary:
      "A decision framework for when you have both a promo code and a rebates rate — and they might conflict.",
    category: "Planning",
    intent: "decision",
    purpose:
      "Addresses one of the most common rewards frustrations (promo codes voiding rebates) and builds user confidence in navigating these tradeoffs.",
    tags: ["promo codes", "rebates", "conflicts", "decision"],
    variables: [
      { key: "promo_value", label: "Promo code value", placeholder: "e.g. 15% off or $20 off", example: "15% off" },
      { key: "cashback_rate", label: "Rebates rate offered", placeholder: "e.g. 5%", example: "5%" },
      { key: "order_value", label: "Estimated order value", placeholder: "e.g. $300", example: "$300" },
    ],
    whenToUse: [
      "When you have a promo code and a rebates offer and aren't sure which to use",
      "When you've had rebates voided by a promo code before and want to avoid it",
      "When the rewards platform's terms mention promo code exclusions",
    ],
    promptTemplate: `I have a promo code worth {{promo_value}} and my rewards platform is offering {{cashback_rate}} on a booking worth approximately {{order_value}}. Help me decide which to use.

1. Basic math comparison: Calculate the dollar value of the promo code vs. the rebates at this order value. Which yields more savings in raw terms?

2. Can they stack? Explain the common scenarios:
   - Some platforms allow promo codes AND rebates to coexist
   - Some promo codes are "affiliate exclusive" and will void rewards tracking
   - Some platforms have specific promo codes distributed through rewards platforms that are designed to stack
   What should I look for in the terms and conditions to figure out if mine can stack?

3. Hidden considerations:
   - Rebates cap: Is there a maximum rebates amount that would limit my earnings?
   - Promo code conditions: Minimum spend, specific products/categories only, first-time customer only?
   - Rewards tracking reliability: Promo code entry sometimes breaks the tracking pixel. What's the risk?

4. Decision tree: Give me a step-by-step decision flow:
   Can they stack? -> Yes: Use both -> No: Which has higher dollar value? -> Factor in rewards certainty (confirmed rate vs. "may not track") -> Choose.

5. Pro tip: If the promo wins but I lose rebates, remind me to still check if there's a lower rebates rate on a different platform that IS compatible, or a platform-exclusive promo that stacks.

6. Suggest 1–2 follow-up prompts for verifying promo code compatibility with my specific platform.`,
  },
  {
    id: "cashback-tracking-troubleshoot",
    title: "My rewards didn't track — what to do",
    summary:
      "A step-by-step troubleshooting and claims guide when rewards fail to appear after a booking.",
    category: "Planning",
    intent: "troubleshooting",
    purpose:
      "Builds user trust in the rewards ecosystem by providing a clear recovery path. Users who successfully file claims become more committed rewards users.",
    tags: ["tracking", "claims", "troubleshooting", "missing rewards"],
    variables: [],
    whenToUse: [
      "When your rewards didn't appear as pending after a booking",
      "When you want a reusable claims process for any rewards platform",
      "When you want to prevent tracking failures on future bookings",
    ],
    promptTemplate: `My rewards didn't track after a travel booking. Give me a complete troubleshooting guide and claims process.

1. Common reasons rewards fail to track:
   - Used a promo code that conflicts with rewards terms
   - Navigated away from the merchant or opened a new tab after activation
   - Ad blocker or cookie blocker interfered with the tracking pixel
   - Booked via app when the platform only tracks web (or vice versa)
   - Transaction amount fell below minimum threshold
   - Booked a product/category excluded from rewards (e.g., taxes, fees, add-ons)

2. Immediate steps (within 7 days):
   - Check if the transaction appears as "pending" — it may just be delayed (some travel merchants take 48–72 hours)
   - Check the exact terms for the merchant — was there a cap, exclusion, or minimum?
   - Gather evidence: screenshots of rewards activation, order confirmation, payment confirmation, email receipts

3. Filing a claim (after 7–14 days):
   - Where to find the claims/missing rewards form on most platforms
   - What information to include: date, merchant, order ID, amount, screenshots
   - Expected timeline for resolution (typically 30–90 days for travel)

4. Escalation: If the claim is denied:
   - Request a specific reason for denial
   - If the denial seems wrong, what are the escalation options? (re-submit with evidence, contact support, social media)

5. Prevention checklist for next time: Create a quick 5-point checklist to prevent tracking failures on future bookings: (a) clean browser, (b) activate + screenshot, (c) single session, (d) check promo compatibility, (e) verify pending within 48 hours.

6. Suggest 1–2 follow-up prompts for understanding my specific platform's claims process and prevention best practices.`,
  },
  {
    id: "split-booking-optimizer",
    title: "Should I split bookings to maximize rewards?",
    summary:
      "Decide when splitting a trip across multiple merchants earns more total rewards vs. booking everything in one place.",
    category: "Packages",
    intent: "optimization",
    purpose:
      "Introduces the advanced rewards strategy of splitting bookings — which deepens engagement with rewards platforms by encouraging users to check rates per merchant.",
    tags: ["split booking", "optimization", "multi-merchant", "rewards"],
    variables: [
      { key: "destination", label: "Destination", placeholder: "e.g. South Korea", example: "South Korea" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 7", example: "7" },
    ],
    whenToUse: [
      "When you're considering booking everything through one OTA vs. splitting across multiple platforms",
      "When different rebate rates across merchants make you wonder if splitting would earn more",
      "When convenience vs. rewards is the tradeoff you're weighing",
    ],
    promptTemplate: `I'm planning a {{duration}}-day trip to {{destination}}. Help me decide whether to book everything through one platform or split across multiple merchants to maximize total rewards.

1. The split booking concept: Explain how booking flights, hotels, activities, and transfers through different merchants — each chosen for the best rebate rate — can yield more total rewards than booking everything in one place. But also cover the downsides: more complexity, multiple cancellation policies, harder to manage changes.

2. Component-by-component analysis: For each trip component, help me identify where the rebate rate is likely to vary most:
   - Flights: airline direct vs. OTA (rates may differ significantly)
   - Hotels: OTA A vs. OTA B vs. direct (rates often vary by 2–5%)
   - Activities: activity marketplaces vs. local operators
   - Transfers: pre-booked vs. on-demand

3. Split vs. single worksheet: Create a comparison table:
   Component | Single Platform (name it) | Rebate Rate | vs. Best Split Option | Rebate Rate | Savings Difference.

4. Convenience cost: Help me quantify the hassle factor. If splitting saves an extra $X in rebates but means managing 4 separate bookings with 4 cancellation policies, what's my personal threshold?

5. Decision rules:
   - Split when: the rebate rate difference is > X% between platforms AND the booking total for that component is > $Y
   - Don't split when: the difference is marginal, the booking is low-value, or flexibility/cancellation matters more

6. Suggest 2 follow-up prompts for comparing specific merchants and calculating my split vs. single total.`,
  },
  {
    id: "boosted-rate-timing",
    title: "Plan bookings around boosted reward windows",
    summary:
      "Build a strategy for timing travel purchases around rewards platform promotions without overpaying on base price.",
    category: "Planning",
    intent: "strategy",
    purpose:
      "Normalizes the habit of monitoring rewards platforms for promotional windows — and teaches users to balance timing of rewards boosts against price changes.",
    tags: ["boosted rates", "timing", "promotions", "patience"],
    variables: [
      { key: "trip_month", label: "Planned travel month", placeholder: "e.g. December", example: "December" },
    ],
    whenToUse: [
      "When your trip is months away and you want to time bookings for best rewards",
      "When you know rewards platforms run promotions but aren't sure how to plan around them",
      "When you want to avoid rushing a booking just because a promotion is live",
    ],
    promptTemplate: `I'm planning to travel in {{trip_month}}. Help me build a strategy for timing my bookings around boosted reward windows without overpaying on base price.

1. Common promotion windows: List the major promotional periods when rewards platforms have historically offered boosted rates (e.g., platform anniversary sales, mid-year sales, 9.9, 10.10, 11.11, Black Friday, year-end). Note: I should NOT assume specific rates — these are periods to monitor, not guarantees.

2. Price vs. rebates timing conflict: Sometimes the cheapest base price and the highest rebate rate don't align. Walk me through how to think about this:
   - If flights are cheapest 3 months out but rebates might boost during 11.11, should I wait?
   - How to calculate the breakeven: does a 2% rebate boost justify waiting if prices might rise by 5%?

3. Booking priority order: For my trip in {{trip_month}}, suggest an ideal booking timeline:
   - When to book flights (least flexible on timing, book for price)
   - When to book hotels (more flexible, can wait for promotions)
   - When to book activities (most flexible, often has the best promotional boosts)
   - When to buy travel insurance (usually last, check for platform availability)

4. Monitoring plan: Create a simple calendar/checklist:
   - Which platforms to check weekly for rate changes
   - Set alerts for upcoming promotional dates
   - Track historical base prices so I know if a "savings" is actually a saving

5. Anti-rush rule: Remind me that a boosted rebate rate on an overpriced booking is still a bad deal. Always compare the net effective cost (price minus rebates) against the non-promotional price.

6. Suggest 2 follow-up prompts for evaluating a specific promotion I've spotted and deciding whether to act.`,
  },
  {
    id: "rewards-stacking-audit",
    title: "Audit your trip for missed reward opportunities",
    summary:
      "Review an already-planned trip to find bookings where you could still add rebates, loyalty points, or card rewards.",
    category: "Planning",
    intent: "audit",
    purpose:
      "Catches users who have already started booking without a rewards strategy — bringing them into the rewards mindset even mid-planning. A powerful rescue prompt.",
    tags: ["audit", "missed rewards", "optimization", "rescue"],
    variables: [
      { key: "destination", label: "Destination", placeholder: "e.g. Europe", example: "Europe" },
    ],
    whenToUse: [
      "When you've already booked part of your trip and wonder if you missed reward opportunities",
      "When reviewing existing bookings to see if anything can be rebooked for better rewards",
      "When a friend tells you about rewards platforms and you want to apply it to your upcoming trip",
    ],
    promptTemplate: `I have a trip to {{destination}} that's partially booked. Help me audit my existing bookings for missed reward opportunities and identify what I can still optimize.

1. Booking audit checklist — for each existing booking, ask me:
   - Did I go through a rewards platform when booking? (If no: can I cancel and rebook?)
   - Did I use the optimal credit card for this category?
   - Am I enrolled in the relevant loyalty program?
   - Did I miss a promo code or platform-exclusive deal?

2. Rebooking decision framework: For any booking where I missed rewards, help me evaluate:
   - Is the booking cancellable/refundable? What's the cancellation cost?
   - How much rebates/rewards would I earn if I rebooked through a platform?
   - Is the net gain (rewards minus cancellation cost) worth the hassle?
   - Are prices still similar, or has the rate gone up since I booked?

3. Not-yet-booked opportunities: For trip components I haven't booked yet, create a checklist:
   - Activities & tours: check rewards platform for activity marketplaces
   - Dining: any restaurant booking platforms with rewards?
   - Airport transfers: check for pre-booked options on rewards-eligible platforms
   - Shopping: check for department stores, outlets, or duty-free with platform rewards
   - Travel insurance: often available through rewards platforms

4. Quick wins: Identify the 3 highest-impact, lowest-effort changes I can still make to earn more rewards on this trip.

5. Future prevention: Suggest I save the Pre-Booking Rewards SOP prompt so I start with a rewards strategy from the beginning next time.

6. Suggest 1–2 follow-up prompts for evaluating whether specific rebookings are worth it.`,
  },
];
