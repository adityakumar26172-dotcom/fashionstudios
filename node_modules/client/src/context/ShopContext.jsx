import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

const SAMPLE_PRODUCTS = [
  {
    _id: "1",
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
    _id: "2",
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
    _id: "3",
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
    _id: "4",
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
  },
  {
    _id: "5",
    title: "Tangerine Sunset Co-ord Shirt",
    description: "Relaxed fit satin weave Cuban collar shirt in vibrant tangerine orange.",
    price: 3299,
    originalPrice: 4299,
    category: "Everyday Luxury",
    collectionName: "New Season",
    sizes: ["S", "M", "L"],
    colors: ["Tangerine Orange"],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 18,
    isTrending: true,
    rating: 4.6,
    numReviews: 14
  },
  {
    _id: "6",
    title: "Butter Yellow Heavyweight Sweatpants",
    description: "Ultra-soft brushed fleece track pants with elasticated cuffs and subtle branding.",
    price: 3799,
    originalPrice: 4999,
    category: "Streetwear",
    collectionName: "Minimal Classics",
    sizes: ["M", "L", "XL"],
    colors: ["Butter Yellow"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 25,
    rating: 4.8,
    numReviews: 9
  }
];

export function ShopProvider({ children }) {
  const [products] = useState(SAMPLE_PRODUCTS);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'shop', 'lookbook', 'cart', 'checkout', 'account'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fashion_studios_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('fashion_studios_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fashion_studios_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    localStorage.setItem('fashion_studios_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fashion_studios_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fashion_studios_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fashion_studios_user');
    }
  }, [user]);

  const addToCart = (product, size = 'M', color = product.colors?.[0] || 'Default', qty = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item._id === product._id && item.selectedSize === size && item.selectedColor === color);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    showToast(`Added ${product.title} (${size}) to Bag!`, 'success');
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from Bag', 'info');
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) return prev.filter((_, i) => i !== index);
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item._id === product._id);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(item => item._id !== product._id);
      } else {
        showToast('Saved to Wishlist!', 'success');
        return [...prev, product];
      }
    });
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    showToast(`Welcome, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 5000;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;
  const cartTotal = cartSubtotal + shippingCost;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory || p.collectionName === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (selectedSort === 'price-low') return a.price - b.price;
    if (selectedSort === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <ShopContext.Provider value={{
      products,
      filteredProducts,
      cart,
      wishlist,
      user,
      toast,
      currentPage,
      setCurrentPage,
      selectedProduct,
      setSelectedProduct,
      isAuthOpen,
      setIsAuthOpen,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedSort,
      setSelectedSort,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      login,
      logout,
      cartSubtotal,
      cartItemCount,
      shippingCost,
      cartTotal,
      freeShippingThreshold,
      showToast
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
