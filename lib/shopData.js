// All Morrow Café info in one place — the claim-offer popup reads from here.
// Change the name, address, number, images, or menu and it updates everywhere.

export const shop = {
  name: "Morrow Café",
  address: "Sector 104, Noida",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  instagram: "@morrow.cafe",
  hours: "8am – 9pm, all week",
  logo: "☕", // swap for an <img> path once you have a real logo, e.g. "/morrow-logo.png"
  image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
};

export const offer = {
  amountLabel: "₹150",
  headline: "Get ₹150 off your next visit",
  description:
    "Show this at the counter next time you're at Morrow — on coffee, matcha, or anything on the menu.",
  windowMinutes: 15,
  claimCodePrefix: "MORROW",
  terms: "One claim per visitor. Valid on any single order at Morrow Café, Sector 104.",
};

// Featured drinks — used if you want to show a preview strip in the popup later.
export const coffeeMenu = [
  {
    name: "Flat White",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Iced Matcha Latte",
    price: "₹220",
    image: "https://images.unsplash.com/photo-1536013455962-8d2eb0bb0a55?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Cold Brew",
    price: "₹190",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Cappuccino",
    price: "₹170",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop",
  },
];
