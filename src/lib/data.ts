import chairsImg from "@/assets/chairs.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import avImg from "@/assets/av.jpg";
import tablesImg from "@/assets/tables.jpg";
import vehicleImg from "@/assets/vehicle.jpg";

export type Category = "Chairs" | "Kitchen" | "AV" | "Tables" | "Vehicles";

export type Listing = {
  id: string;
  title: string;
  provider: string;
  area: string;
  category: Category;
  quantity: string;
  price: string;
  priceUnit: string;
  distanceKm: number;
  availability: string;
  match: number;
  logistics: string;
  image: string;
};

export const listings: Listing[] = [
  {
    id: "chairs-royal-orchid",
    title: "300 Banquet Chairs",
    provider: "The Royal Orchid Hotel",
    area: "Andheri",
    category: "Chairs",
    quantity: "300 units",
    price: "₹6,000",
    priceUnit: "/day",
    distanceKm: 4.2,
    availability: "Available Sept 10–12",
    match: 92,
    logistics: "Shared transport available on the Andheri → Bandra corridor",
    image: chairsImg,
  },
  {
    id: "kitchen-spice-garden",
    title: "Kitchen Capacity",
    provider: "Spice Garden Restaurant",
    area: "Bandra",
    category: "Kitchen",
    quantity: "2 stations · 200 covers",
    price: "₹4,500",
    priceUnit: " / 4 hours",
    distanceKm: 6.8,
    availability: "Available Sept 11",
    match: 88,
    logistics: "On-site use — no transport required",
    image: kitchenImg,
  },
  {
    id: "av-meridian",
    title: "AV & Stage Lighting",
    provider: "Meridian Events",
    area: "Worli",
    category: "AV",
    quantity: "1 full stage kit",
    price: "₹9,500",
    priceUnit: "/day",
    distanceKm: 8.1,
    availability: "Available Sept 12–13",
    match: 85,
    logistics: "Dedicated transport with technician, ₹4,200",
    image: avImg,
  },
  {
    id: "tables-seaview",
    title: "120 Round Banquet Tables",
    provider: "Seaview Convention Centre",
    area: "Lower Parel",
    category: "Tables",
    quantity: "120 units",
    price: "₹5,400",
    priceUnit: "/day",
    distanceKm: 5.6,
    availability: "Available Sept 9–14",
    match: 79,
    logistics: "Shared transport possible with a Worli pickup",
    image: tablesImg,
  },
  {
    id: "vehicle-blueline",
    title: "Refrigerated Tempo (2)",
    provider: "Blueline Catering Co.",
    area: "Santacruz",
    category: "Vehicles",
    quantity: "2 vehicles",
    price: "₹3,800",
    priceUnit: "/trip",
    distanceKm: 3.1,
    availability: "Available Sept 10–11",
    match: 74,
    logistics: "Returns empty from Bandra daily at 6 PM",
    image: vehicleImg,
  },
];

export const categories: Array<Category | "All"> = [
  "All",
  "Chairs",
  "Kitchen",
  "AV",
  "Tables",
  "Vehicles",
];

export const utilization = [
  { label: "Chairs", value: 38, tone: "sky" as const },
  { label: "Tables", value: 51, tone: "sky" as const },
  { label: "AV Equipment", value: 24, tone: "amber" as const },
  { label: "Vehicles", value: 63, tone: "pine" as const },
];

export type Requirement = {
  resource: string;
  quantity: string;
  location: string;
  date: string;
  time: string;
  budget: string;
};

export const defaultRequirement: Requirement = {
  resource: "Banquet Chairs",
  quantity: "250",
  location: "Bandra",
  date: "Sept 11",
  time: "4 PM–10 PM",
  budget: "8000",
};

export type SmartMatch = {
  id: string;
  provider: string;
  area: string;
  match: number;
  available: string;
  price: string;
  distance: string;
  timing: string;
  criteria: { label: string; ok: boolean; note: string }[];
};

export const smartMatches: SmartMatch[] = [
  {
    id: "royal-orchid",
    provider: "The Royal Orchid Hotel",
    area: "Andheri",
    match: 94,
    available: "250 available",
    price: "₹7,200",
    distance: "3.4 km away",
    timing: "Available for required time",
    criteria: [
      { label: "Availability", ok: true, note: "Sept 11, 2 PM–11 PM free" },
      { label: "Quantity", ok: true, note: "250 of 300 units" },
      { label: "Price", ok: true, note: "₹7,200 under ₹8,000 budget" },
      { label: "Distance", ok: true, note: "3.4 km from Bandra venue" },
      { label: "Logistics", ok: true, note: "Shared vehicle on this route" },
    ],
  },
  {
    id: "seaview",
    provider: "Seaview Convention Centre",
    area: "Lower Parel",
    match: 81,
    available: "250 available",
    price: "₹7,900",
    distance: "5.6 km away",
    timing: "Available from 5 PM",
    criteria: [
      { label: "Availability", ok: false, note: "Free only after 5 PM" },
      { label: "Quantity", ok: true, note: "250 of 400 units" },
      { label: "Price", ok: true, note: "₹7,900 within budget" },
      { label: "Distance", ok: true, note: "5.6 km from venue" },
      { label: "Logistics", ok: false, note: "Dedicated transport only" },
    ],
  },
  {
    id: "grand-palm",
    provider: "Grand Palm Banquets",
    area: "Kurla",
    match: 68,
    available: "220 available",
    price: "₹6,400",
    distance: "11.2 km away",
    timing: "Available all day",
    criteria: [
      { label: "Availability", ok: true, note: "Full day free" },
      { label: "Quantity", ok: false, note: "220 of 250 requested" },
      { label: "Price", ok: true, note: "₹6,400 well under budget" },
      { label: "Distance", ok: false, note: "11.2 km — long haul" },
      { label: "Logistics", ok: false, note: "No shared route found" },
    ],
  },
];
