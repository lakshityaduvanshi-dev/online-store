const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = "mongodb+srv://Lakshit:12345@cluster0.vgysah5.mongodb.net/?appName=Cluster0"; 

const mockProducts = [
  // --- ELECTRONICS & AUDIO (TECH) ---
  {
    title: "AeroSound Max Wireless Headphones",
    description: "Experience premium active noise-canceling sound with crisp highs and deep bass. Minimalist design featuring protein leather ear cups and 40-hour battery life.",
    category: "Electronics",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.8,
    reviewCount: 124
  },
 {
    title: "NovaCharge 3-in-1 Wireless Dock",
    description: "Sleek aluminum wireless charging station for your smartphone, smartwatch, and earbuds. Eliminates cord clutter cleanly.",
    category: "Electronics",
    price: 49.99,
    // Nayi fresh verified image URL:
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLSXlDLWL7ic-INmtEJZIWZfS1t1naR-1rkJIMk0qO2Q&s",
    stockStatus: "In Stock",
    rating: 4.5,
    reviewCount: 78
  },
  {
    title: "Prism 65% Mechanical Keyboard",
    description: "Ultra-compact mechanical keyboard with hot-swappable linear switches and a premium frosted acrylic chassis with RGB underglow.",
    category: "Electronics",
    price: 110.00,
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.7,
    reviewCount: 210
  },
  {
    title: "AuraCast Portable Bluetooth Speaker",
    description: "360-degree immersive sound packed inside a sand-blasted waterproof fabric shell. Built for aesthetic outdoor or indoor setups.",
    category: "Electronics",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.7,
    reviewCount: 134
  },
  {
    title: "ProStream 4K Ultra-HD Webcam",
    description: "Crystal clear 4K streaming webcam with auto-focus, light correction, and dual noise-canceling microphones for professional meetings.",
    category: "Electronics",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.6,
    reviewCount: 95
  },
  {
    title: "Precision Ergonomic Wireless Mouse",
    description: "Advanced wireless mouse featuring an ergonomic thumb rest, customizable gesture buttons, and hyper-fast scrolling mechanics.",
    category: "Electronics",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.8,
    reviewCount: 167
  },

  // --- PREMIUM HOME & LIVING (HOME GOODS) ---
  {
    title: "Artisan Ceramic Coffee Mug Set",
    description: "Set of 2 matte-finished artisan ceramic mugs. Designed with a sleek organic silhouette that fits perfectly in your hands.",
    category: "Home Goods",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.9,
    reviewCount: 42
  },
  {
    title: "Lunar Soy Wax Sculpted Candle",
    description: "Hand-poured abstract geometric soy wax candle scented with natural amber, sandalwood, and clean vanilla notes.",
    category: "Home Goods",
    price: 24.00,
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.8,
    reviewCount: 56
  },
  {
    title: "Nordic Minimalist Desk Table Lamp",
    description: "Elegant metal desk lamp with an adjustable neck and warm wood accents, casting the perfect ambient glow for late-night work.",
    category: "Home Goods",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.5,
    reviewCount: 38
  },
  {
    title: "Minimalist Glass Pour-Over Coffee Maker",
    description: "Heat-resistant borosilicate glass brewer with a reusable stainless steel mesh filter for smooth, rich hand-brewed coffee.",
    category: "Home Goods",
    price: 39.50,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80", // Alternative sharp glassware
    stockStatus: "In Stock",
    rating: 4.7,
    reviewCount: 81
  },
  {
    title: "Apothecary Amber Glass Soap Bottle",
    description: "Thick vintage-inspired amber glass pump bottle with a matte black rustproof stainless steel dispensing nozzle head.",
    category: "Home Goods",
    price: 15.99,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.6,
    reviewCount: 112
  },

  // --- MODERN FASHION & APPAREL (FASHION) ---
  {
    title: "Minimalist Chronograph Leather Watch",
    description: "A clean aesthetic timeless masterpiece. Built with a surgical grade stainless steel casing and an Italian genuine tan leather strap.",
    category: "Fashion",
    price: 145.00,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.6,
    reviewCount: 89
  },
  {
    title: "Urban Waterproof Canvas Backpack",
    description: "Weatherproof waxed canvas shell featuring dedicated padded interior slots accommodating laptops up to 16 inches securely.",
    category: "Fashion",
    price: 115.00,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.8,
    reviewCount: 92
  },
  {
    title: "Classic Acetate Polarized Sunglasses",
    description: "Handcrafted amber-tortoise patterned bio-acetate sunglasses outfitted with dark green protective 100% UV polarized lenses.",
    category: "Fashion",
    price: 68.00,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.3,
    reviewCount: 54
  },
  {
    title: "Premium White Leather Minimalist Sneakers",
    description: "Clean silhouette low-top sneakers crafted from full-grain calfskin leather with a durable, comfortable stitched rubber cupsole.",
    category: "Fashion",
    price: 130.00,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.7,
    reviewCount: 118
  },
  {
    title: "Sleek RFID Blocking Leather Wallet",
    description: "Ultra-slim bi-fold wallet made from premium saffiano leather featuring advanced RFID protection mesh to keep cards secure.",
    category: "Fashion",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.6,
    reviewCount: 74
  },

  // --- ECO-FITNESS & LIFESTYLE (FITNESS) ---
  {
    title: "Apex High-Density Eco Yoga Mat",
    description: "6mm non-slip textured workout surface made from biodegradable TPE. Offers exceptional joint cushioning for your daily home fitness routines.",
    category: "Fitness",
    price: 55.00,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80",
    stockStatus: "Out of Stock",
    rating: 4.4,
    reviewCount: 61
  },
  {
    title: "Double-Walled Vacuum Matte Flask",
    description: "Keep cold beverages crisp for 24 hours. Finished with an industrial matte powder coating and an integrated carrying loop cap.",
    category: "Fitness",
    price: 32.00,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.8,
    reviewCount: 319
  },
  {
    title: "Ergonomic Smart Bluetooth Skipping Rope",
    description: "Smooth magnetic core ball-bearings connect instantly via Bluetooth to log jump rotations, skipping velocity, and session analytics.",
    category: "Fitness",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.5,
    reviewCount: 41
  },
  {
    title: "Sleek Matte Black Adjustable Dumbbells",
    description: "All-in-one steel weight plate configuration selector smoothly switching loads from 5lbs up to 25lbs instantly.",
    category: "Fitness",
    price: 180.00,
    imageUrl: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&auto=format&fit=crop&q=80",
    stockStatus: "In Stock",
    rating: 4.7,
    reviewCount: 88
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(mockProducts);
    console.log(`Database Seeded Successfully! Added ${mockProducts.length} Premium Unique Items.`);
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();