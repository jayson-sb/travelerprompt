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
    title: "Compare flight bookings to get the best total value",
    summary:
      "A step-by-step workflow to compare fares across channels, including baggage, fees, and flexibility—so you pay less overall.",
    category: "Flights",
    intent: "comparison",
    purpose:
      "Helps travelers look past headline prices and choose the option with the lowest true cost and the right flexibility for their trip.",
    tags: ["flights", "comparison", "fees", "flexibility"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "couple" },
      { key: "origin", label: "Origin city", placeholder: "e.g. Singapore", example: "Singapore" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Tokyo", example: "Tokyo" },
      { key: "month", label: "Travel month", placeholder: "e.g. October", example: "October" },
      { key: "budget", label: "Flight budget", placeholder: "e.g. $900 per person or 'mid-range'", example: "$900 per person" },
    ],
    whenToUse: [
      "When you have a route in mind and want the best total price (not just the cheapest fare)",
      "Before booking on any single site",
      "When baggage/seat fees and change rules might swing the real cost",
    ],
    promptTemplate: `I want to book a return flight from {{origin}} to {{destination}} in {{month}}. I'm traveling as a {{party}} and my rough budget is {{budget}}. Help me build a comparison workflow to get the best total value.

Step 1 — Where to check: List the main places I should compare (airline direct, major OTAs, metasearch tools). Include what each is best for (price, flexibility, customer support, easy changes).

Step 2 — A comparison worksheet: Create a blank table I can fill in with these columns:
Channel | Fare | Bags (carry-on/checked) | Seat selection | Payment fees / FX fees | Change/cancel rules | Total all-in cost | Notes (layovers, arrival time, reliability).

Step 3 — “Cheapest” vs “best value”: Explain the tradeoffs between booking direct vs an OTA (support during disruptions, changes/refunds, seat selection, schedule changes).

Step 4 — Before you click “Pay” checklist: Remind me to verify (a) passenger names match passport, (b) baggage rules, (c) fare class and what’s included, (d) total price in the right currency, (e) whether the site is offering dynamic currency conversion and how to avoid it, (f) refund/change rules and deadlines, (g) contact/support path.

Step 5 — After I collect 3–5 quotes: Suggest 2–3 follow-up prompts I can ask you to help me pick the best option.`,
  },
  {
    id: "flight-budget-maximizer",
    title: "Budget airline booking playbook (avoid add-on traps)",
    summary:
      "A practical strategy for low-cost carriers covering timing, add-ons, fare types, and checkout gotchas.",
    category: "Flights",
    intent: "optimization",
    purpose:
      "Helps travelers reduce the real cost of budget flights by planning add-ons intentionally and choosing the right booking path.",
    tags: ["budget airlines", "add-ons", "savings", "strategy"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "friends" },
      { key: "origin", label: "Origin city", placeholder: "e.g. Kuala Lumpur", example: "Kuala Lumpur" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Bali", example: "Bali" },
      { key: "budget", label: "Flight budget", placeholder: "e.g. $250 per person or 'tight'", example: "$250 per person" },
    ],
    whenToUse: [
      "When booking low-cost carriers",
      "When you want to decide which add-ons are worth it",
      "When you want to avoid common checkout upsells and fees",
    ],
    promptTemplate: `I'm booking a budget airline flight from {{origin}} to {{destination}}. I'm traveling as a {{party}} and my rough budget is {{budget}}. Help me maximize savings with a structured approach.

1. Booking timing: Share general patterns that can help (when prices typically move, what to watch for, and when to set price alerts).

2. Fare types explained: Compare “basic” vs “bundle” vs “flex” style fares. When does paying more up front reduce the total cost (bags, seats, changes)?

3. Add-on economics: For each add-on (checked baggage, seats, meals, priority boarding, insurance), explain when to buy at booking vs later vs skip. Flag the add-ons that are usually poor value.

4. Channel choices: Should I book via the airline site, airline app, or an OTA? Compare price differences, ease of changes, and support during disruptions.

5. Checkout checklist: Remind me to double-check currency, payment fees, baggage rules, seat charges, and any pre-ticked boxes before paying.

6. Suggest 2 follow-up prompts I can use after I find 2–3 fare options to choose the best one.`,
  },
  {
    id: "flight-error-fare-alert",
    title: "Error fares: how to verify and book safely",
    summary:
      "A speed-and-risk playbook for spotting error fares, booking fast, and reducing the chance of expensive mistakes.",
    category: "Flights",
    intent: "strategy",
    purpose:
      "Teaches a calm, repeatable workflow for error fares—move quickly, protect yourself, and avoid locking in non-refundable extras too early.",
    tags: ["error fares", "speed", "risk", "workflow"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "family" },
      { key: "budget", label: "Budget", placeholder: "e.g. $2000 total or 'tight'", example: "$2000 total" },
    ],
    whenToUse: [
      "When you see a suspiciously cheap flight",
      "When you want a safe protocol for booking fast",
      "When you need to understand what to do after booking",
    ],
    promptTemplate: `I might book an error fare. I'm traveling as a {{party}} and my rough budget is {{budget}}. Explain flight error fares and give me a complete speed-and-risk playbook for acting on them.

1. What are error fares? Briefly explain how they happen and how often airlines honor them.

2. How to spot them: List reliable places to verify quickly (metasearch, airline site, known communities/alerts). What patterns suggest “error” vs a real sale?

3. Speed protocol: Give a step-by-step action plan optimized for speed but safe decision-making (verify once, book once, avoid unnecessary calls, use a payment method with strong dispute protections).

4. Post-booking caution: What NOT to book immediately (non-refundable hotels, tours), and what you can do safely (refundable options, holding plans). Include a timeline for waiting for ticketing confirmation.

5. If it gets canceled: What are my realistic outcomes and next steps (refund timeline, documentation to keep, how to rebook smartly).

6. Suggest 2 follow-up prompts for monitoring sources and understanding cancellation policies.`,
  },

  // ── Hotels ───────────────────────────────────────────────────────────
  {
    id: "hotel-cashback-stacking",
    title: "Book hotels smarter: direct vs OTA and true total cost",
    summary:
      "Compare direct and OTA bookings with a focus on total cost, fees, flexibility, and real value (not just the nightly rate).",
    category: "Hotels",
    intent: "optimization",
    purpose:
      "Helps travelers choose the best-value hotel booking by factoring in taxes, resort fees, cancellation rules, and included perks like breakfast or parking.",
    tags: ["hotels", "direct vs OTA", "fees", "value"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "couple" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Bangkok", example: "Bangkok" },
      { key: "nights", label: "Number of nights", placeholder: "e.g. 4", example: "4" },
      { key: "budget", label: "Nightly budget (USD)", placeholder: "e.g. 150", example: "150" },
    ],
    whenToUse: [
      "When choosing between booking direct vs an OTA",
      "When fees and cancellation rules might change the best option",
      "When you’re trying to maximize value at a specific budget",
    ],
    promptTemplate: `I'm booking a hotel in {{destination}} for {{nights}} nights at around \${{budget}}/night. I'm traveling as a {{party}}. Help me pick the best-value booking option.

1. Direct vs OTA tradeoffs: Compare booking direct vs OTAs with focus on: cancellation flexibility, support during issues, room type accuracy, fees, and chances of upgrades/benefits.

2. True total cost checklist: List what I must include to compare fairly (taxes, resort/city fees, breakfast, parking, Wi‑Fi, extra bed, deposit/holds).

3. Rate types explained: Prepaid vs pay-at-property vs refundable vs non-refundable. When does paying more for flexibility save money overall?

4. Worked worksheet: Provide a fillable table:
Channel | Nightly rate | Taxes/fees | Value of inclusions | Cancellation terms | Total trip cost | Notes.

5. Booking checklist: Remind me to verify the final price, currency, cancellation deadline, and what exactly is included before paying.

6. Suggest 2 follow-up prompts once I’ve gathered 3–5 quotes.`,
  },
  {
    id: "hotel-last-minute-deals",
    title: "Last-minute hotel booking strategy",
    summary:
      "A fast workflow for booking on short notice: best channels, mobile vs desktop, and refundable vs non-refundable tradeoffs.",
    category: "Hotels",
    intent: "strategy",
    purpose:
      "Gives travelers a clear, repeatable way to book quickly without overpaying or choosing the wrong cancellation policy.",
    tags: ["last-minute", "hotels", "channels", "workflow"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "solo" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Seoul", example: "Seoul" },
      { key: "budget", label: "Budget", placeholder: "e.g. $180/night or 'mid-range'", example: "$180/night" },
    ],
    whenToUse: [
      "When you need a hotel within the next 48 hours",
      "When comparing app-only prices vs desktop",
      "When you need to balance price vs flexibility fast",
    ],
    promptTemplate: `I need a hotel in {{destination}} within the next 48 hours. I'm traveling as a {{party}} and my rough budget is {{budget}}. Give me a channel strategy for finding the best price quickly.

1. Channel comparison: Compare hotel direct, major OTAs, last-minute/same-day apps, and calling the property. Note typical price behavior and flexibility.

2. Urgency tactics:
   - 24–48 hours out: what works best?
   - Same-day: what changes (negotiation, app flash prices, nearby neighborhoods)?

3. Refundable vs non-refundable: Give decision rules and examples of when it’s worth paying more for refundability.

4. Fast checklist (30 seconds): A minimal checklist before booking: final price, fees, location, cancellation deadline, and room type.

5. Suggest 2 follow-up prompts for comparing my top 3 options.`,
  },
  {
    id: "hotel-vs-rental",
    title: "Hotel vs short-term rental: true cost comparison",
    summary:
      "A worksheet-style comparison that includes all fees, space needs, and flexibility—so you pick the best-value stay.",
    category: "Hotels",
    intent: "comparison",
    purpose:
      "Helps travelers avoid surprise fees and choose the stay that best matches their group size, plans, and risk tolerance.",
    tags: ["comparison", "rental", "total cost", "fees"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "family" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Barcelona", example: "Barcelona" },
      { key: "nights", label: "Number of nights", placeholder: "e.g. 5", example: "5" },
      { key: "travelers", label: "Number of travelers", placeholder: "e.g. 4", example: "4" },
      { key: "budget", label: "Budget", placeholder: "e.g. $250/night or '$1200 total'", example: "$250/night" },
    ],
    whenToUse: [
      "When deciding between a hotel and a short-term rental",
      "When traveling as a group and comparing space vs cost",
      "When you want to factor in cleaning/service fees and policies",
    ],
    promptTemplate: `I'm traveling to {{destination}} for {{nights}} nights with {{travelers}} people. We're traveling as a {{party}} and our rough budget is {{budget}}. Help me compare a hotel vs a short-term rental based on true total cost and practicality.

1. True cost worksheet: Create a side-by-side table I can fill in.
Hotel: nightly rate, taxes, resort/city fees, parking, breakfast, total.
Rental: nightly rate, cleaning fee, service fee, taxes, deposits, utilities/extras, total.

2. Practicality factors: Compare location convenience, check-in friction, space/privacy, laundry/kitchen value, and cancellation risk.

3. Hybrid idea: When does it make sense to split (some nights hotel, some nights rental)?

4. Hidden costs: List the common “gotchas” that change the real cost.

5. Suggest 2 follow-up prompts after I gather 2 hotel options and 2 rental options.`,
  },

  // ── Packages ─────────────────────────────────────────────────────────
  {
    id: "package-deal-builder",
    title: "Bundle vs separate: what’s cheaper for your trip?",
    summary:
      "A decision framework to compare packages against separate bookings using total cost, flexibility, and hassle factor.",
    category: "Packages",
    intent: "optimization",
    purpose:
      "Helps travelers make a clean bundle-vs-separate decision by comparing like-for-like prices and the real cost of changes and cancellations.",
    tags: ["packages", "bundling", "comparison", "total cost"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "friends" },
      { key: "destination", label: "Destination city", placeholder: "e.g. Osaka", example: "Osaka" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 7", example: "7" },
      { key: "travelers", label: "Number of travelers", placeholder: "e.g. 2", example: "2" },
      { key: "budget", label: "Total budget", placeholder: "e.g. $2500 total or 'mid-range'", example: "$2500 total" },
    ],
    whenToUse: [
      "When choosing between a flight+hotel package vs separate bookings",
      "When you want to compare flexibility and support, not just price",
      "When you want a worksheet to decide quickly",
    ],
    promptTemplate: `Help me plan a {{duration}}-day trip to {{destination}} for {{travelers}} people. We're traveling as a {{party}} and our rough budget is {{budget}}. I want to decide whether bundling (flight + hotel package) or booking separately is cheaper and smarter.

1. Bundle vs separate tradeoffs: Compare pros/cons focusing on total cost, cancellation/change rules, and how easy it is to fix problems.

2. Fillable worksheet: Create a table:
Component | Bundle option price | Separate option price | What’s included | Cancellation/change rules | Notes.
Rows: Flights, Accommodation, Airport Transfer, Activities/Tours, Travel Insurance.

3. Where bundles hide cost: Call out common areas where the “headline” package price differs from the real cost (room types, baggage, transfer assumptions, taxes/fees).

4. Decision rules: Give simple rules of thumb for when bundles usually win vs when separate booking is safer/better value.

5. Suggest 2 follow-up prompts after I gather quotes.`,
  },
  {
    id: "honeymoon-savings-plan",
    title: "Plan a honeymoon with smart splurge-vs-save choices",
    summary:
      "Design a honeymoon itinerary with a realistic budget, clear tradeoffs, and smart places to save without sacrificing the experience.",
    category: "Packages",
    intent: "planning",
    purpose:
      "Turns a big trip into a calm plan: prioritize what matters, control the big-ticket items, and avoid expensive last-minute decisions.",
    tags: ["honeymoon", "luxury", "planning", "budget"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "couple" },
      { key: "destination", label: "Destination", placeholder: "e.g. Maldives", example: "Maldives" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 10", example: "10" },
      { key: "budget", label: "Total budget (USD)", placeholder: "e.g. 8000", example: "8000" },
    ],
    whenToUse: [
      "When planning a honeymoon or special occasion trip",
      "When you want to balance splurges with smart savings",
      "When you want a budget-first itinerary",
    ],
    promptTemplate: `Plan a {{duration}}-day honeymoon to {{destination}}. We're traveling as a {{party}} with a budget of \${{budget}}. I want an itinerary that feels special but stays on budget.

1. Itinerary outline: Suggest a day-by-day outline: flights, accommodation options (2 tiers), dining, activities/excursions, and transfers.

2. Booking strategy per component: For each component, suggest the best approach (when to book, what to compare, refundable vs non-refundable, where upgrades matter most).

3. Budget worksheet: Create a fillable budget table:
Component | Estimated cost | Booking approach | Flexibility level | Notes.

4. Splurge vs save: Recommend where to splurge (high-impact experiences) and where to save (low-impact swaps).

5. Booking checklist: A short checklist before each purchase to avoid expensive mistakes.

6. Suggest 2 follow-up prompts once I pick my top options.`,
  },

  // ── Transport ────────────────────────────────────────────────────────
  {
    id: "car-rental-cashback",
    title: "Car rental costs explained (get the best rate, avoid surprises)",
    summary:
      "Compare channels, prepay vs pay-at-counter, insurance choices, and hidden fees to lower the real cost of renting a car.",
    category: "Transport",
    intent: "comparison",
    purpose:
      "Helps travelers reduce car rental cost by understanding insurance, deposit holds, fuel policies, and common fee traps.",
    tags: ["car rental", "insurance", "hidden fees", "comparison"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "family" },
      { key: "destination", label: "Destination city/country", placeholder: "e.g. Italy", example: "Italy" },
      { key: "days", label: "Rental duration (days)", placeholder: "e.g. 5", example: "5" },
      { key: "budget", label: "Budget", placeholder: "e.g. $60/day or '$400 total'", example: "$60/day" },
    ],
    whenToUse: [
      "When renting a car and you want the lowest all-in cost",
      "When comparing prepay vs pay-at-counter",
      "When deciding insurance vs credit card coverage",
    ],
    promptTemplate: `I need to rent a car in {{destination}} for {{days}} days. I'm traveling as a {{party}} and my rough budget is {{budget}}. Help me find the best all-in price without getting hit by surprise fees.

1. Channel comparison: List booking options (aggregators, direct rental companies, local providers). Explain typical pros/cons and when each wins.

2. Prepay vs pay-at-counter: Explain tradeoffs (price, flexibility, cancellation, deposit holds).

3. Insurance decision tree: Walk me through common insurance choices (CDW/LDW, third-party, credit card coverage). Flag the questions I must answer (coverage limits, exclusions, documentation).

4. Hidden fees checklist: List the usual cost inflators (airport surcharges, young/additional driver, fuel policy, cross-border, toll devices, FX/DCC).

5. Fillable table: Channel | Base rate | Insurance | Fees | Deposit/hold | Total | Notes.

6. Suggest 2 follow-up prompts after I collect quotes.`,
  },
  {
    id: "airport-transfer-deals",
    title: "Airport transfer chooser (cheapest vs fastest vs easiest)",
    summary:
      "Compare transfer options with a simple table and decision rules based on cost, time, luggage, and arrival time.",
    category: "Transport",
    intent: "comparison",
    purpose:
      "Helps travelers pick the right transfer without overpaying—especially when tired, late, or carrying luggage.",
    tags: ["airport", "transfers", "comparison", "decision"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "couple" },
      { key: "airport", label: "Airport name or code", placeholder: "e.g. NRT (Narita)", example: "NRT (Narita)" },
      { key: "budget", label: "Budget", placeholder: "e.g. under $25 or 'comfort'", example: "under $25" },
    ],
    whenToUse: [
      "When deciding between taxi/ride-hail, train, bus, or pre-booked transfers",
      "When traveling with luggage or a group",
      "When you want a fast choice without regret",
    ],
    promptTemplate: `I'm arriving at {{airport}} and need to get to the city center. I'm traveling as a {{party}} and my rough budget is {{budget}}. Help me compare options and pick the best one for my situation.

1. Options overview: List main options (ride-hailing, taxi, pre-booked transfer, shuttle/bus, train/metro). Include typical cost range and time.

2. Fillable comparison table: Option | Cost | Time | Comfort | Reliability | Late-night friendliness | Notes.

3. Decision rules: Give a quick decision tree based on party size, luggage, arrival time, and budget.

4. Suggest 1–2 follow-up prompts after I tell you my arrival time, hotel area, and luggage count.`,
  },

  // ── Planning ─────────────────────────────────────────────────────────
  {
    id: "travel-budget-planner",
    title: "Build a trip budget you can actually stick to",
    summary:
      "Create a detailed trip budget with clear assumptions (prices, buffers, and optional upgrades) so you can stay in control.",
    category: "Planning",
    intent: "planning",
    purpose:
      "Makes budgeting practical: track the big costs, add realistic buffers, and identify the few levers that save the most money.",
    tags: ["budget", "planning", "worksheet", "savings"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "couple" },
      { key: "destination", label: "Destination", placeholder: "e.g. Vietnam", example: "Vietnam" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 10", example: "10" },
      { key: "travelers", label: "Number of travelers", placeholder: "e.g. 2", example: "2" },
      { key: "currency", label: "Budget currency", placeholder: "e.g. USD", example: "USD" },
      { key: "total_budget", label: "Total budget (optional)", placeholder: "e.g. 2500", example: "2500" },
    ],
    whenToUse: [
      "When planning a trip and you want a complete budget template",
      "When you want to see where your money will really go",
      "When you want a clear plan for saving without ruining the trip",
    ],
    promptTemplate: `Create a detailed travel budget for a {{duration}}-day trip to {{destination}} for {{travelers}} people in {{currency}}. We're traveling as a {{party}} and our rough total budget is {{total_budget}} (if blank, assume mid-range and show options).

1. Budget categories: Estimate ranges for flights, accommodation, food, local transport, activities, shopping, travel insurance, and misc. Give budget / mid-range / comfortable ranges.

2. Assumptions block (editable): Create a section where I set assumptions like:
   - Exchange rate buffer: __%
   - Price-change buffer for flights/hotels: __%
   - Baggage/seat add-ons: $__ (or __%)
   - Transport daily average: $__
   - “Nice to have” upgrades: $__

3. Master worksheet: Category | Estimated cost | Notes/assumptions | Where to save | Minimum acceptable option.

4. Biggest savings levers: Identify the top 3 ways to reduce cost without reducing enjoyment.

5. Booking checklist: A short checklist to avoid budget blow-ups (fees, cancellations, upgrades, hidden costs).

6. Suggest 2 follow-up prompts to refine the budget after I get real quotes.`,
  },
  {
    id: "seasonal-travel-deals",
    title: "When to book flights and hotels for maximum savings",
    summary:
      "A monitoring plan for seasonality, booking windows, and major sale periods—focused on real prices, not hype.",
    category: "Planning",
    intent: "strategy",
    purpose:
      "Helps travelers time bookings intelligently by balancing price trends, flexibility, and predictable sale windows.",
    tags: ["timing", "seasonality", "price alerts", "strategy"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "solo" },
      { key: "destination", label: "Destination", placeholder: "e.g. Japan", example: "Japan" },
      { key: "budget", label: "Budget", placeholder: "e.g. 'tight' / 'mid-range' / 'comfort'", example: "mid-range" },
    ],
    whenToUse: [
      "When your travel dates are flexible and you want the best value",
      "When planning months ahead and you want a monitoring plan",
      "When deciding whether to wait for a sale or book now",
    ],
    promptTemplate: `I want to travel to {{destination}} and have flexible dates. I'm traveling as a {{party}} and my rough budget is {{budget}}. Help me build a monitoring plan to book at the best time for price and value.

1. Destination seasonality: Identify peak/shoulder/low seasons. When are flights/hotels cheapest, and what’s the weather tradeoff?

2. General booking windows: Share common patterns for flights vs hotels (how far out to watch, when last-minute works, when it doesn’t).

3. Major sale periods to watch: List common promo windows (e.g., mid-year, 9.9/10.10/11.11, Black Friday/Cyber Monday, year-end) as “times when many travel sites run discounts”—no promises.

4. Monitoring checklist: Price alerts, a simple tracking spreadsheet, and a weekly routine (what to check and how often).

5. Decision framework: How to decide “book now” vs “wait,” including a breakeven calculation (how much price increase would wipe out a discount).

6. Suggest 2 follow-up prompts for when I’m close to booking.`,
  },
  {
    id: "travel-rewards-checklist",
    title: "Pre-booking savings SOP",
    summary:
      "A printable SOP for booking travel smarter: compare properly, avoid fee traps, and keep receipts and policies organized.",
    category: "Planning",
    intent: "checklist",
    purpose:
      "Creates a repeatable workflow that reduces mistakes and saves money through better comparisons, cleaner checkout, and better documentation.",
    tags: ["checklist", "SOP", "booking", "savings"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "family" },
      { key: "budget", label: "Budget", placeholder: "e.g. $3000 total or 'mid-range'", example: "$3000 total" },
    ],
    whenToUse: [
      "Before any travel booking to avoid expensive mistakes",
      "When you want a consistent workflow you can reuse every trip",
      "When you’re coordinating bookings for multiple people",
    ],
    promptTemplate: `Create a comprehensive, printable Standard Operating Procedure (SOP) I should follow before and after every travel booking to save money and reduce problems. Tailor it for a {{party}} trip with a rough budget of {{budget}}.

BEFORE BOOKING:
1. Compare properly: Compare at least 3 sources and ensure you’re comparing the same thing (same dates, baggage, room type, cancellation terms).
2. Fee audit: Check taxes/fees, resort/city fees, payment/FX fees, baggage/seat add-ons, and any mandatory extras.
3. Promo discipline: If using a promo code, confirm eligibility, minimum spend, excluded dates/categories, and whether it changes cancellation terms.
4. Flexibility check: Decide upfront how much flexibility you need (refundable vs non-refundable) and what you’re willing to risk.
5. Documentation: Save screenshots/receipts and the cancellation policy page for anything expensive or non-refundable.

DURING BOOKING:
6. Clean checkout: Re-check currency, pre-ticked add-ons, traveler names, passport requirements, and contact details.
7. One-session rule: Avoid changing devices/tabs mid-checkout; confirm you get a final confirmation page.

AFTER BOOKING:
8. Confirmation audit: Confirm email received, booking reference, total charged, and policy deadlines.
9. Calendar reminders: Add reminders for free-cancellation deadlines, check-in windows, and any required pre-arrival steps.
10. Record-keeping: Keep a simple tracker: Date | Provider | Amount | Policy type | Deadline | Notes.

Format this as a one-page checklist with checkboxes.`,
  },

  // ── Cards & Miles ────────────────────────────────────────────────────
  {
    id: "travel-card-comparison",
    title: "Best travel cards for fees, perks, and protections",
    summary:
      "Compare travel cards by FX fees, travel insurance, lounge access, and how you book—so your payments help you travel smarter.",
    category: "Cards & Miles",
    intent: "comparison",
    purpose:
      "Shifts the focus from “earning” to smart travel payments: lower fees, better protections, and perks that actually reduce trip friction and cost.",
    tags: ["credit cards", "fees", "protections", "comparison"],
    variables: [
      { key: "country", label: "Country of residence", placeholder: "e.g. Singapore", example: "Singapore" },
      { key: "frequency", label: "Trips per year", placeholder: "e.g. 4", example: "4" },
    ],
    whenToUse: [
      "When choosing a travel card based on fees and protections",
      "When comparing annual fees vs perks you’ll actually use",
      "When you travel internationally and care about FX costs",
    ],
    promptTemplate: `I live in {{country}} and travel about {{frequency}} times per year. Help me choose a travel credit card that helps me save money and reduce travel stress.

IMPORTANT: Credit card products change frequently. Use a structured comparison, but remind me to verify all details with issuers before applying.

1. Inputs I should define:
   - Annual travel spend: $__
   - Typical bookings: flights / hotels / rides / tours (which are biggest?)
   - Countries/currencies I spend in most: __
   - Priorities: low FX fees, travel insurance, lounge access, hotel perks, customer support

2. Comparison framework (up to 5 cards): Card | Annual fee | FX fees | Travel insurance highlights | Lounge access | Key perks | Best for.

3. Real-world scenarios: For each card, explain how it helps in scenarios like cancellations, delays, lost baggage, rental car damage, or disputes.

4. Value calculator template: A worksheet to estimate whether the annual fee is worth it based on perks you’ll actually use.

5. Suggest 2 follow-up prompts for narrowing to 2 final choices.`,
  },
  {
    id: "miles-vs-cashback",
    title: "Points vs cash savings: which fits your travel style?",
    summary:
      "A math-driven comparison that helps you decide whether points/miles or simple discounts and statement credits are better for you.",
    category: "Cards & Miles",
    intent: "analysis",
    purpose:
      "Keeps it practical: compare strategies with clear assumptions so you choose the one that saves you more, with less effort and fewer surprises.",
    tags: ["points", "cash savings", "analysis", "strategy"],
    variables: [
      { key: "monthly_spend", label: "Monthly travel spend (USD)", placeholder: "e.g. 500", example: "500" },
    ],
    whenToUse: [
      "When deciding between a points-focused card vs a cash-savings approach",
      "When you want clear math based on your spend and habits",
      "When you don’t want a complicated strategy that’s hard to redeem",
    ],
    promptTemplate: `I spend roughly \${{monthly_spend}} per month on travel bookings. Help me compare a points/miles strategy vs a simple cash-savings strategy with transparent math.

1. Define my assumptions (I’ll fill these in):
   - Points earn rate: __ points per $
   - Realistic redemption value: __ cents per point (conservative and optimistic)
   - Likelihood I can redeem well: low / medium / high
   - Cash-savings option: __% average discount or statement credit equivalent
   - Annual fees: $__

2. Strategy A — Points/miles: Estimate annual points, realistic value, and effort/constraints (availability, blackout, surcharges).

3. Strategy B — Cash savings: Estimate guaranteed annual value (discounts/credits) and simplicity.

4. Head-to-head table: Strategy | Annual value (conservative) | Annual value (optimistic) | Fees | Complexity | Best for.

5. Recommendation: Based on my inputs, recommend the simpler strategy unless the other clearly wins.

6. Suggest 2 follow-up prompts for optimizing whichever strategy I pick.`,
  },
  {
    id: "lounge-access-deals",
    title: "Get airport lounge access for less",
    summary:
      "Compare lounge access methods—cards, memberships, day passes, and pay-per-visit—to find the cheapest option that fits your travel frequency.",
    category: "Cards & Miles",
    intent: "comparison",
    purpose:
      "Helps travelers avoid overpaying for lounge access by choosing the access method with the best breakeven point.",
    tags: ["lounges", "airport", "passes", "comparison"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "couple" },
      { key: "airport", label: "Airport name or code", placeholder: "e.g. SIN (Changi)", example: "SIN (Changi)" },
      { key: "budget", label: "Budget", placeholder: "e.g. <$40/visit or 'premium ok'", example: "<$40/visit" },
    ],
    whenToUse: [
      "When you want lounge access without paying for a premium card blindly",
      "When comparing memberships vs day passes",
      "When you want a breakeven calculation",
    ],
    promptTemplate: `What are the most cost-effective ways to get airport lounge access at {{airport}}? I'm traveling as a {{party}} and my rough lounge budget is {{budget}}. Help me compare all options and choose the cheapest one that fits my travel habits.

1. My inputs:
   - Credit cards I hold: __
   - Frequent flyer status: __
   - Flights per year: __
   - Typical cabin class: economy / premium economy / business

2. Access methods to compare:
   - Credit card lounge benefits
   - Lounge membership programs
   - Airline lounge day passes
   - Pay-per-visit at the door
   - Lounge aggregator apps

3. Comparison table: Method | Cost | Lounges at {{airport}} | Guest policy | Convenience | Notes.

4. Breakeven: Show me how to decide when a membership or premium card makes sense vs paying per visit.

5. Suggest 1–2 follow-up prompts for my specific cards and airports.`,
  },

  // ── Smart savings prompts ───────────────────────────────────────────
  {
    id: "promo-vs-cashback-decision",
    title: "Promo code vs alternative offer: which saves more?",
    summary:
      "A simple decision framework for comparing a promo code against another offer (member rate, bundle discount, or credit).",
    category: "Planning",
    intent: "decision",
    purpose:
      "Helps travelers pick the real best deal by comparing like-for-like and checking the fine print that changes total cost.",
    tags: ["promo codes", "discounts", "fine print", "decision"],
    variables: [
      { key: "promo_value", label: "Promo value", placeholder: "e.g. 15% off or $20 off", example: "15% off" },
      { key: "alt_offer", label: "Alternative offer", placeholder: "e.g. member rate -10% or $30 credit", example: "member rate -10%" },
      { key: "order_value", label: "Estimated order value", placeholder: "e.g. $300", example: "$300" },
    ],
    whenToUse: [
      "When you have a promo code and another offer and aren’t sure which is better",
      "When terms and conditions might change what’s included or refundable",
      "When you want a quick way to compare apples-to-apples",
    ],
    promptTemplate: `I have a promo worth {{promo_value}} and an alternative offer: {{alt_offer}} on a booking worth about {{order_value}}. Help me decide which saves more.

1. Basic math: Convert both offers into dollar value (including whether they apply before/after taxes and fees).

2. Fine print checklist: What to verify for each offer (eligible dates, minimum spend, excluded room types/fare classes, cancellation/refund changes, caps, “new users only” rules).

3. Total cost comparison: Show a mini worksheet:
Option | Base price | Taxes/fees | Discount/credit | Final price | Policy changes | Notes.

4. Decision tree: Give a short flow to pick the winner, prioritizing lowest final price AND acceptable flexibility.

5. Suggest 1–2 follow-up prompts once I paste the real terms.`,
  },
  {
    id: "split-booking-optimizer",
    title: "Should I split bookings to save money?",
    summary:
      "Decide when splitting flights, hotels, and activities across providers lowers total cost vs booking everything in one place.",
    category: "Packages",
    intent: "optimization",
    purpose:
      "Helps travelers weigh real savings against added complexity, so they don’t create a fragile itinerary to save a tiny amount.",
    tags: ["split booking", "optimization", "convenience", "total cost"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "friends" },
      { key: "destination", label: "Destination", placeholder: "e.g. South Korea", example: "South Korea" },
      { key: "duration", label: "Trip duration (days)", placeholder: "e.g. 7", example: "7" },
      { key: "budget", label: "Total budget", placeholder: "e.g. $2000 total or 'tight'", example: "$2000 total" },
    ],
    whenToUse: [
      "When you’re tempted to book everything through one site for convenience",
      "When different providers show different prices for each component",
      "When you want rules for when splitting is worth it",
    ],
    promptTemplate: `I'm planning a {{duration}}-day trip to {{destination}}. We're traveling as a {{party}} with a rough budget of {{budget}}. Help me decide whether to book everything in one place or split across multiple providers to save money without creating chaos.

1. Explain the tradeoff: What you gain (potential savings, better fit per component) vs what you lose (more policies, more support channels, harder changes).

2. Component-by-component checklist: For flights, hotels, activities, and transfers—where do price differences usually matter most, and where should I prioritize flexibility?

3. Comparison table: Component | One-place option | Price | Split option | Price | Savings | Complexity cost.

4. Decision rules: Give thresholds like:
   - Split when savings is > $__ or > __% AND cancellation risk is low
   - Don’t split when the itinerary is fragile or support matters more

5. Suggest 2 follow-up prompts once I have real quotes.`,
  },
  {
    id: "boosted-rate-timing",
    title: "Plan bookings around sales periods (without overpaying)",
    summary:
      "A strategy for timing purchases around predictable travel sale windows while tracking real prices and avoiding hype.",
    category: "Planning",
    intent: "strategy",
    purpose:
      "Helps travelers avoid false savings by pairing sale timing with real price tracking and a clear breakeven calculation.",
    tags: ["sales", "timing", "promotions", "price tracking"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "couple" },
      { key: "trip_month", label: "Planned travel month", placeholder: "e.g. December", example: "December" },
      { key: "budget", label: "Budget", placeholder: "e.g. 'tight' / 'mid-range' / 'comfort'", example: "mid-range" },
    ],
    whenToUse: [
      "When your trip is months away and you can wait for discounts",
      "When you want to avoid rushing because a sale is live",
      "When you want a clear booking timeline by component",
    ],
    promptTemplate: `I'm planning to travel in {{trip_month}}. I'm traveling as a {{party}} and my rough budget is {{budget}}. Help me build a strategy for timing my bookings around common sales periods without overpaying on base price.

1. Common sale windows: List major periods when travel sites often run promotions (mid-year, 9.9/10.10/11.11, Black Friday, year-end). Note these are “watch windows,” not guarantees.

2. Price vs sale conflict: Walk me through how to decide whether to wait. Include a breakeven calculation: how much price increase would erase a discount?

3. Booking priority order: Suggest a booking timeline for flights vs hotels vs activities vs insurance, based on price volatility and flexibility.

4. Monitoring plan: A simple checklist for price alerts, weekly checks, and tracking a “normal” price.

5. Anti-rush rule: Remind me to compare final prices (after fees) and not chase a discount on an overpriced listing.

6. Suggest 2 follow-up prompts for evaluating a specific sale I’ve found.`,
  },
  {
    id: "rewards-stacking-audit",
    title: "Audit your trip for missed savings opportunities",
    summary:
      "Review an already-planned trip to find quick wins: cheaper rebooking, better policies, lower fees, and smarter add-ons.",
    category: "Planning",
    intent: "audit",
    purpose:
      "Catches trips that are already in progress and helps travelers reduce cost and risk without restarting the whole plan.",
    tags: ["audit", "optimization", "quick wins", "rebooking"],
    variables: [
      { key: "party", label: "Travel party", placeholder: "solo / couple / family / friends", example: "family" },
      { key: "destination", label: "Destination", placeholder: "e.g. Europe", example: "Europe" },
      { key: "budget", label: "Budget", placeholder: "e.g. $4000 total or 'mid-range'", example: "$4000 total" },
    ],
    whenToUse: [
      "When you’ve already booked part of your trip and want to see what you can still improve",
      "When you want to check if rebooking is worth the hassle",
      "When you want a short list of the highest-impact fixes",
    ],
    promptTemplate: `I have a trip to {{destination}} that’s partially booked. We're traveling as a {{party}} with a rough budget of {{budget}}. Help me audit my bookings for missed savings opportunities and low-risk optimizations.

1. Booking audit checklist (per booking): Ask me:
   - Did I compare at least 3 sources for the same product?
   - Is there a cheaper option with similar policies?
   - Are there hidden fees/add-ons I can avoid (bags, seats, resort fees, transfers)?
   - Is the cancellation policy too risky for my situation?

2. Rebooking decision framework: For any booking, help me evaluate:
   - Is it refundable/cancellable? What’s the fee?
   - Is the net savings worth it after fees and time?
   - Does rebooking make the trip more fragile (multiple policies/support channels)?

3. Not-yet-booked checklist: Create a prioritized list of what to book next (and what to keep flexible), with money-saving tactics for each.

4. Quick wins: Identify the top 3 highest-impact, lowest-effort changes I can still make.

5. Suggest 1–2 follow-up prompts after I paste my booking details.`,
  },
];
