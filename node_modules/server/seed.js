const mongoose = require('mongoose');

const sampleProducts = [
  {
    title: "Cobalt Kinetic Oversized Tee",
    description: "Heavyweight 240 GSM organic cotton t-shirt with signature cobalt kinetic back graphic.",
    price: 2499,
    originalPrice: 3499,
    category: "Streetwear",
    collectionName: "New Season",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cobalt Blue", "Charcoal Black"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 45,
    isFeatured: true,
    isTrending: true,
    rating: 4.8,
    numReviews: 12
  },
  {
    title: "Cherry Flame Statement Hoodie",
    description: "Vibrant cherry red luxury fleece hoodie featuring embroidered puff print accents and relaxed drop shoulders.",
    price: 4999,
    originalPrice: 6999,
    category: "Streetwear",
    collectionName: "Party & Statement Wear",
    sizes: ["M", "L", "XL"],
    colors: ["Vivid Cherry Red"],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 20,
    isFeatured: true,
    isLimited: true,
    rating: 4.9,
    numReviews: 24
  },
  {
    title: "Minimalist Cream Tailored Trousers",
    description: "Sophisticated cream-hued wide leg pleated trousers crafted from ultra-smooth wool blend for everyday luxury.",
    price: 5999,
    originalPrice: 7499,
    category: "Everyday Luxury",
    collectionName: "Minimal Classics",
    sizes: ["28", "30", "32", "34"],
    colors: ["Soft Cream"],
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 15,
    isFeatured: true,
    rating: 4.7,
    numReviews: 8
  },
  {
    title: "Burgundy Velvet Evening Blazer",
    description: "Rich burgundy velvet double-breasted blazer tailored for statement night-outs and high-fashion events.",
    price: 8999,
    originalPrice: 11999,
    category: "Party & Statement Wear",
    collectionName: "Limited Edition",
    sizes: ["M", "L"],
    colors: ["Rich Burgundy"],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 8,
    isLimited: true,
    rating: 5.0,
    numReviews: 5
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/nallaweb');
    const Product = require('./models/Product');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
