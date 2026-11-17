// Curated Menu Data for Virar & Beach Belt Demo
const MENU_ITEMS = [
  {
    id: 1,
    name: "Classic Wood-Fired Margherita",
    category: "pizzas",
    price: 280,
    isVeg: true,
    isBestseller: true,
    description: "San Marzano tomato sauce, fresh buffalo mozzarella, fresh basil & extra virgin olive oil.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Fiery Peri-Peri Paneer Pizza",
    category: "pizzas",
    price: 340,
    isVeg: true,
    isBestseller: true,
    description: "Spicy marinated cottage cheese, roasted bell peppers, red paprika & mozzarella cheese.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "BBQ Smoked Chicken Pizza",
    category: "pizzas",
    price: 390,
    isVeg: false,
    isBestseller: true,
    description: "Tender shredded chicken glazed in hickory BBQ sauce, caramelized onions & fresh coriander.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Koliwada Crispy Prawns Fry",
    category: "coastal",
    price: 380,
    isVeg: false,
    isBestseller: true,
    description: "Authentic coastal spiced prawns fried crisp, served with mint chutney & onion salad.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Surmai Rava Fry (Catch of the Day)",
    category: "coastal",
    price: 420,
    isVeg: false,
    isBestseller: false,
    description: "Fresh coastal kingfish coated in spiced semolina, tawa fried to golden crispness.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Truffle Cheese Loaded Fries",
    category: "starters",
    price: 190,
    isVeg: true,
    isBestseller: true,
    description: "Golden fries drizzled with aromatic white truffle oil, melted cheese sauce & herbs.",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Crispy Peri-Peri Chicken Wings (6 pcs)",
    category: "starters",
    price: 260,
    isVeg: false,
    isBestseller: false,
    description: "Crunchy fried wings tossed in our signature hot peri-peri glaze with garlic aioli.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "The Double Smashed Cheeseburger",
    category: "burgers",
    price: 240,
    isVeg: false,
    isBestseller: true,
    description: "Double seasoned patty, melted American cheddar, gherkins & secret house sauce in brioche.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Crispy Paneer Supreme Burger",
    category: "burgers",
    price: 210,
    isVeg: true,
    isBestseller: false,
    description: "Herb-crusted cottage cheese steak, crunchy iceberg lettuce & creamy tandoori mayo.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    name: "Belgian Chocolate Thick Shake",
    category: "shakes",
    price: 180,
    isVeg: true,
    isBestseller: true,
    description: "Rich dark Belgian chocolate ganache blended with creamy vanilla ice cream & choco chips.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 11,
    name: "Blue Ocean Sunset Cooler",
    category: "shakes",
    price: 150,
    isVeg: true,
    isBestseller: false,
    description: "Curacao citrus cooler with crushed ice, fresh mint sprigs, lemon wedges & club soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 12,
    name: "Classic Cold Brew with Ice Cream",
    category: "shakes",
    price: 160,
    isVeg: true,
    isBestseller: false,
    description: "16-hour steeped Arabica cold brew poured over artisan vanilla bean scoop.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 13,
    name: "Sizzling Brownie with Vanilla Scoop",
    category: "desserts",
    price: 190,
    isVeg: true,
    isBestseller: true,
    description: "Warm walnut fudge brownie served on a cast iron sizzler plate with Belgian hot fudge.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 14,
    name: "New York Baked Blueberry Cheesecake",
    category: "desserts",
    price: 220,
    isVeg: true,
    isBestseller: true,
    description: "Creamy baked Philadelphia style cheesecake topped with compote of sweet blueberries.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80"
  }
];

const CATEGORIES = [
  { id: "all", label: "🌟 All Specials" },
  { id: "pizzas", label: "🍕 Wood-Fired Pizzas" },
  { id: "coastal", label: "🍤 Coastal Seafood" },
  { id: "starters", label: "🍟 Starters & Bites" },
  { id: "burgers", label: "🍔 Burgers & Wraps" },
  { id: "shakes", label: "🥤 Shakes & Coolers" },
  { id: "desserts", label: "🍰 Desserts" }
];
