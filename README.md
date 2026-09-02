# ResourceLink Pro

Build a frontend-only, fully interactive hackathon MVP called:

Hospitality Resource Exchange

Smart B2B Marketplace for Shared Hospitality Resources

The product connects hotels, restaurants, caterers, resorts and event companies that have underutilized resources with businesses that temporarily need them.

The main USP is logistics-aware smart matching: we don't just find who has the resource — we find the best resource + price + distance + availability + transportation combination.

Tech

Use React + TypeScript + Tailwind.

Frontend only. Use mock data and local state. No backend, authentication, database, payments, APIs or real maps.

Keep the implementation small and polished. Every visible button should work.

1. Dashboard

Create a minimal dashboard for demo business:

The Grand Horizon Hotel — Mumbai

Show 3–4 KPI cards:

Available Resources: 24

Active Requests: 7

Upcoming Bookings: 12

Potential Idle Revenue: ₹42,000/month

Show Resource Utilization with simple bars:

Chairs — 38%

Tables — 51%

AV Equipment — 24%

Vehicles — 63%

Highlight:

AV Equipment is idle 76% of the time. Potential revenue: ₹42,000/month.

Add buttons:

Find Resources
Post Requirement

2. Find Resources

Create a simple marketplace page with search/filter controls and 4–5 realistic listings.

Example:

300 Banquet Chairs

The Royal Orchid Hotel · Andheri

₹6,000/day · 4.2 km away
Available Sept 10–12

92% Match

Kitchen Capacity

Spice Garden Restaurant · Bandra

₹4,500 / 4 hours
Available Sept 11

88% Match

Clicking a listing opens a detail modal showing:

Quantity

Price

Availability

Distance

Match score

Logistics option

Button:

Request Resource

3. Post Requirement → Smart Matching

Create a simple form:

Post Requirement

Resource: Banquet Chairs
Quantity: 250
Location: Bandra
Date: Sept 11
Time: 4 PM–10 PM
Budget: ₹8,000

Button:

Find Smart Matches

On click, show a short loading state, then display ranked matches.

Top result:

94% Match

The Royal Orchid Hotel

250 available
₹7,200
3.4 km away
Available for required time

Show a compact breakdown:

Availability ✓

Quantity ✓

Price ✓

Distance ✓

Logistics ✓

Button:

View Logistics

4. Logistics Optimization — MAIN USP

This is the hero feature.

Create a simple visual route using cards/nodes rather than a real map:

Royal Orchid Hotel → Event Venue

Show:

Option A — Dedicated Transport

Transport: ₹8,000

Option B — Shared Transport

Existing vehicle already travelling this route.

Transport: ₹1,500

₹6,500 SAVED

Add a prominent:

LOGISTICS OPTIMIZED

Button:

Use Shared Transport

On click, update the UI:

Shared logistics reserved.

Then button:

Request Resource

5. Request → Booking

Clicking Request Resource should show a simple confirmation modal:

Request sent to The Royal Orchid Hotel.

Simulate provider approval.

Allow:

Accept

Then show:

Booking Confirmed

250 Banquet Chairs
Sept 11 · 4 PM–10 PM
₹7,200
Logistics: Shared Transport

Status:

Confirmed

Demo Flow

The entire application should be optimized for this 2-minute judge demonstration:

Dashboard
↓
Post Requirement
↓
250 chairs in Bandra
↓
94% Smart Match
↓
Logistics Optimization
↓
₹8,000 → ₹1,500 transport
↓
₹6,500 SAVED
↓
Request
↓
Booking Confirmed

Design

Make it look like a polished modern B2B SaaS product:

Minimal

Professional

Spacious

Clean typography

Subtle shadows

Rounded cards

Simple charts

Smooth transitions

Responsive

Avoid unnecessary pages and features.

Do NOT build:

Complex authentication

Payment systems

Chat

Notifications

Advanced analytics

Reviews

Surge pricing

Complex calendars

Real maps

Admin panels

The goal is a small, polished, highly interactive MVP that clearly demonstrates the core USP:

Find the right resource and optimize how it gets there.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/574f4db5-6d01-4ed6-8482-5b534ab78a5a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
