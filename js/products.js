// Products data and functions

// Sample product data
const products = [
  {
    id: "1",
    name: "Elegant Silk Blouse",
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.8,
    reviews: 124,
    image: "images/categories/accessories/Elegant Silk Blouse Background Removed.png",
    gallery: [
      "images/categories/accessories/Elegant Silk Blouse Background Removed.png",
      "images/categories/accessories/Elegant Silk Blouse Background Removed.png",
      "/placeholder.svg?height=600&width=600&text=Silk+Blouse+Detail",
      "/placeholder.svg?height=600&width=600&text=Silk+Blouse+Model",
    ],
    category: "clothing",
    tags: ["women", "blouse", "silk"],
    featured: true,
    new: true,
    description:
      "Luxurious silk blouse with elegant draping and pearl button details. Perfect for both formal and casual occasions.",
    date: "2023-04-15",
    colors: ["white", "black", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 25,
  },
  {
    id: "2",
    name: "Designer Leather Handbag",
    price: 249.99,
    oldPrice: 349.99,
    rating: 4.9,
    reviews: 86,
    image: "images/categories/bags/Designer Leather Handbag Background Removed.png",
    gallery: [
      "images/categories/bags/Designer Leather Handbag Background Removed.png",
      "/placeholder.svg?height=600&width=600&text=Leather+Handbag+Side",
      "/placeholder.svg?height=600&width=600&text=Leather+Handbag+Inside",
      "/placeholder.svg?height=600&width=600&text=Leather+Handbag+Detail",
    ],
    category: "accessories",
    tags: ["women", "handbag", "leather"],
    featured: true,
    sale: true,
    description:
      "Handcrafted premium leather handbag with gold-tone hardware and multiple compartments for optimal organization.",
    date: "2023-03-20",
    colors: ["black", "brown", "red"],
    stock: 12,
  },
  {
    id: "3",
    name: "Luxury Watch Collection",
    price: 599.99,
    rating: 4.7,
    reviews: 53,
    image: "images/categories/watches/Luxury Watch Collection Background Removed.png",
    gallery: [
      "images/categories/watches/Luxury Watch Collection Background Removed.png",
      "/placeholder.svg?height=600&width=600&text=Luxury+Watch+Side",
      "/placeholder.svg?height=600&width=600&text=Luxury+Watch+Back",
      "/placeholder.svg?height=600&width=600&text=Luxury+Watch+Closeup",
    ],
    category: "accessories",
    tags: ["men", "watch", "luxury"],
    featured: true,
    bestseller: true,
    description:
      "Precision crafted luxury timepiece with sapphire crystal face and genuine leather strap. Water resistant up to 100m.",
    date: "2023-02-10",
    colors: ["silver", "gold", "rose-gold"],
    stock: 8,
  },
  {
    id: "4",
    name: "Premium Cashmere Scarf",
    price: 129.99,
    oldPrice: 159.99,
    rating: 4.6,
    reviews: 42,
    image: "images/categories/accessories/Premium Cashmere Scarf Background Removed.png",
    gallery: [
      "images/categories/accessories/Premium Cashmere Scarf Background Removed.png",
      "/placeholder.svg?height=600&width=600&text=Luxury+Watch+Side",
      "/placeholder.svg?height=600&width=600&text=Luxury+Watch+Back",
      "/placeholder.svg?height=600&width=600&text=Luxury+Watch+Closeup",
    ],
    category: "accessories",
    tags: ["unisex", "scarf", "cashmere", "winter"],
    featured: true,
    new: true,
    description:
      "Ultra-soft 100% cashmere scarf woven from the finest Mongolian cashmere. Provides exceptional warmth and comfort.",
    date: "2023-05-05",
    colors: ["camel", "gray", "burgundy", "navy"],
    stock: 20,
  },
  {
    id: "5",
    name: "Designer Sunglasses",
    price: 179.99,
    rating: 4.5,
    reviews: 38,
    image: "images/categories/accessories/Designer Sunglasses1 Background Removed.png",
    gallery: [
      "images/categories/accessories/Designer Sunglasses1 Background Removed.png",
      "images/categories/accessories/Designer Sunglasses2 Background Removed.png",
      "images/categories/accessories/Designer Sunglasses3 Background Removed.png",
    ],
    category: "accessories",
    tags: ["unisex", "sunglasses", "summer"],
    bestseller: true,
    description:
      "Polarized designer sunglasses with UV400 protection and lightweight acetate frames. Includes premium case and cleaning cloth.",
    date: "2023-01-15",
    colors: ["black", "tortoise", "blue"],
    stock: 15,
  },
  {
    id: "6",
    name: "Italian Leather Shoes",
    price: 299.99,
    oldPrice: 399.99,
    rating: 4.8,
    reviews: 65,
    image: "images/categories/shoes/Italian Leather Shoes Background Removed.png",
    gallery: [
      "images/categories/shoes/Italian Leather Shoes Background Removed.png",
      "images/categories/shoes/Italian Leather Shoes-brown Background Removed.png",
      "images/categories/shoes/Italian Leather Shoes-clacks Background Removed.png",
    ],
    category: "footwear",
    tags: ["men", "shoes", "leather"],
    sale: true,
    description:
      "Handcrafted Italian leather shoes with Goodyear welt construction. Combines classic style with modern comfort.",
    date: "2023-02-28",
    colors: ["black", "brown", "tan"],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46", ],
    stock: 10,
  },
  {
    id: "7",
    name: "Diamond Pendant Necklace",
    price: 1299.99,
    rating: 4.9,
    reviews: 29,
    image: "images/categories/accessories/Diamond Pendant Necklace Background Removed.png",
    gallery: [
      "images/categories/accessories/Diamond Pendant Necklace Background Removed.png",
      "images/categories/accessories/Diamond Pendant Necklace2 Background Removed.png",
      "images/categories/accessories/Diamond Pendant Necklace3 Background Removed.png",
    ],
    category: "jewelry",
    tags: ["women", "necklace", "diamond"],
    featured: true,
    description:
      "18K white gold necklace featuring a brilliant-cut diamond pendant. Comes with certificate of authenticity.",
    date: "2023-03-10",
    stock: 5,
  },
  {
    id: "8",
    name: "Long Sleeve",
    price: 149.99,
    oldPrice: 189.99,
    rating: 4.7,
    reviews: 47,
    image: "images/categories/fashion/Long Sleeve-ash Background Removed.png",
    gallery:["images/categories/fashion/Long Sleeve-black Background Removed.png",
      "images/categories/fashion/Long Sleeve-blue Background Removed.png",
      "images/categories/fashion/Long Sleeve-wine Background Removed.png"
    ],
    category: "clothing",
    tags: ["unisex", "sweater", "wool", "winter"],
    sale: true,
    description:
      "Luxuriously soft merino wool sweater that regulates body temperature. Perfect for layering in colder months.",
    date: "2023-04-20",
    colors: ["cream", "black", "navy", "wine"],
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
  },
  {
    id: "9",
    name: "Silk Evening Dress",
    price: 399.99,
    rating: 4.8,
    reviews: 36,
    image: "images/categories/fashion/Silk Evening Dress Background Removed.png",
    gallery:[
      "images/categories/fashion/Silk Evening Dress Background Removed.png",
      "images/categories/fashion/silk evening-blue Background Removed.png",
      "images/categories/fashion/Silk-evening-mintGreen Background Removed.png",
    ],
    category: "clothing",
    tags: ["women", "dress", "evening", "silk"],
    new: true,
    description:
      "Stunning silk evening dress with delicate beading and elegant silhouette. Perfect for formal events and galas.",
    date: "2023-05-15",
    colors: ["green", "tan", "blue"],
    sizes: ["XS", "S", "M", "L"],
    stock: 8,
  },
  {
    id: "10",
    name: "Premium Leather Belt",
    price: 89.99,
    rating: 4.6,
    reviews: 52,
    image: "images/categories/accessories/Premium Leather Belt-2 Background Removed.png",
    gallery: [
      "images/categories/accessories/Premium Leather Belt-2 Background Removed.png",
      "images/categories/accessories/Premium Leather Belt-brown Background Removed.png",
      "images/categories/accessories/Premium Leather Belt-rough surface Background Removed.png",
    ],
    category: "accessories",
    tags: ["men", "belt", "leather"],
    bestseller: true,
    description:
      "Full-grain leather belt with precision stitching and classic buckle. A timeless addition to any wardrobe.",
    date: "2023-01-25",
    colors: ["black", "brown", "tan"],
    sizes: ["32", "34", "36", "38", "40", "42"],
    stock: 22,
  },
  {
    id: "11",
    name: "Voyage perfume",
    price: 129.99,
    oldPrice: 159.99,
    rating: 4.7,
    reviews: 78,
    image: "images/categories/perfumes/voyage perfume1 Background Removed.png",
    gallery: [
      "images/categories/perfumes/voyage perfume1 Background Removed.png",
      "images/categories/perfumes/voyage perfume2 Background Removed.png",
      "images/categories/perfumes/voyage perfume3 Background Removed.png",
    ],

    category: "perfumes",
    tags: ["unisex", "perfume", "fragrance"],
    sale: true,
    description:
      "Exquisite designer fragrance with notes of jasmine, bergamot, and sandalwood. Long-lasting and elegantly bottled.",
    date: "2023-03-05",
    stock: 15,
  },
  {
    id: "12",
    name: "Gucci slides",
    price: 199.99,
    rating: 4.8,
    reviews: 31,
    image: "images/categories/shoes/gucci slides Background Removed.png",
    gallery: [
      "images/categories/shoes/gucci slides Background Removed.png",
      "images/categories/shoes/gucci slides black Background Removed.png",
      "images/categories/shoes/gucci slides green Background Removed.png",
    ],
    category: "accessories",
    tags: ["unisex", "footware", "slides", "summer"],
    featured: true,
    description:
      "Stylish Gucci slides with iconic logo and cushioned footbed. Perfect for poolside lounging or casual outings.",
    date: "2023-02-18",
    colors: ["black", "blue", "green"],
    stock: 10,
  },
  {
    id: "13",
    name: "Cashmere Blend Coat",
    price: 499.99,
    oldPrice: 699.99,
    rating: 4.9,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=300&text=Cashmere+Coat",
    category: "clothing",
    tags: ["women", "coat", "cashmere", "winter"],
    sale: true,
    description:
      "Luxurious cashmere blend coat with tailored silhouette and satin lining. Provides exceptional warmth without bulk.",
    date: "2023-04-10",
    colors: ["camel", "black", "gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 7,
  },
  {
    id: "14",
    name: "Handcrafted Leather Wallet",
    price: 79.99,
    rating: 4.6,
    reviews: 58,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Wallet",
    category: "accessories",
    tags: ["men", "wallet", "leather"],
    bestseller: true,
    description:
      "Slim profile wallet handcrafted from full-grain leather. Features RFID blocking technology and multiple card slots.",
    date: "2023-01-30",
    colors: ["black", "brown", "tan"],
    stock: 25,
  },
  {
    id: "15",
    name: "Men GLasses",
    price: 75.99,
    rating: 4.0,
    reviews: 34,
    image: "images/categories/accessories/spectacles-black Background Removed.png",
    gallery: [
      "images/categories/accessories/spectacles-black Background Removed.png",
      "images/categories/accessories/spectacles-blue Background Removed.png",
      "images/categories/accessories/spectacle-red Background Removed.png",
    ],
    category: "home",
    tags: ["glasses", "spectacles", "men"],
    new: true,
    description:
      "A transitional pair of spectacles with a black frame. Perfect for reading or everyday wear.",
    date: "2023-05-08",
    stock: 12,
  },
  {
    id: "16",
    name: "Silk Pajama Set",
    price: 189.99,
    oldPrice: 229.99,
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300&text=Silk+Pajamas",
    category: "clothing",
    tags: ["women", "pajama", "silk", "sleep"],
    sale: true,
    description:
      "Luxurious 100% mulberry silk pajama set. Breathable, temperature-regulating, and incredibly soft against the skin.",
    date: "2023-03-25",
    colors: ["ivory", "black", "navy", "rose"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
  },
  // Adding new products
  {
    id: "17",
    name: "Designer Tote Bag",
    price: 50,
    oldPrice: 70,
    rating: 4.7,
    reviews: 63,
    image: "images/categories/bags/Designer Tote Bag-cream Background Removed.png",
    gallery: [
      "images/categories/bags/Designer Tote Bag-cream Background Removed.png",
      "images/categories/bags/Designer Tote Bag-black Background Removed.png",
      "images/categories/bags/Designer Tote Bag-blue Background Removed.png",
    ],
    category: "accessories",
    tags: ["women", "bag", "tote", "summer"],
    new: true,
    sale: true,
    description:
      "Spacious designer tote bag crafted from premium materials with signature hardware. Perfect for work, travel, or everyday use.",
    date: "2023-05-20",
    colors: ["cream", "black", "blue", "red"],
    stock: 18,
  },
  {
    id: "18",
    name: "Men's Tailored Suit",
    price: 899.99,
    rating: 4.9,
    reviews: 47,
    image: "/placeholder.svg?height=300&width=300&text=Tailored+Suit",
    category: "clothing",
    tags: ["men", "suit", "formal", "business"],
    featured: true,
    description:
      "Impeccably tailored suit crafted from premium Italian wool. Classic fit with modern details for a sophisticated look.",
    date: "2023-04-12",
    colors: ["navy", "charcoal", "black"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "48R"],
    stock: 10,
  },
  {
    id: "19",
    name: "Pearl Stud Earrings",
    price: 299.99,
    rating: 4.8,
    reviews: 52,
    image: "/placeholder.svg?height=300&width=300&text=Pearl+Earrings",
    category: "jewelry",
    tags: ["women", "earrings", "pearl", "classic"],
    bestseller: true,
    description:
      "Timeless freshwater pearl stud earrings set in 14K gold. The perfect accessory for both everyday wear and special occasions.",
    date: "2023-02-15",
    colors: ["white", "cream", "black"],
    stock: 20,
  },
  {
    id: "20",
    name: "Leather Ankle Boots",
    price: 249.99,
    oldPrice: 299.99,
    rating: 4.6,
    reviews: 38,
    image: "/placeholder.svg?height=300&width=300&text=Ankle+Boots",
    category: "footwear",
    tags: ["women", "boots", "leather", "autumn"],
    sale: true,
    description:
      "Stylish leather ankle boots with stacked heel and side zipper. Versatile design pairs well with jeans, dresses, and skirts.",
    date: "2023-03-18",
    colors: ["black", "brown", "tan"],
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 15,
  },
  {
    id: "21",
    name: "Basic Tops",
    price: 79.99,
    rating: 4.5,
    reviews: 29,
    image: "images/categories/fashion/basic top brown Background Removed.png",
    gallery: [
      "images/categories/fashion/basic top brown Background Removed.png",
      "images/categories/fashion/basic top cream Background Removed.png",
      "images/categories/fashion/basic top green Background Removed.png",
      "images/categories/fashion/basic top pink Background Removed.png"
    ],
    category: "clothing",
    tags: ["unisex", "tops", "basic", "casual", ],
    new: true,
    description:
      "Essential basic tops made from soft, breathable fabric. Perfect for layering or wearing alone. Available in multiple colors.",
    date: "2023-05-10",
    colors: ["brown", "cream", "pink", "burgundy"],
    sizes: ["One Size"],
    stock: 30,
  },
  {
    id: "22",
    name: "Mini Skirt",
    price: 110.00,
    rating: 4.7,
    reviews: 41,
    image: "images/categories/fashion/mini black skirt2 Background Removed.png",
    gallery: [
      "images/categories/fashion/mini black skirt2 Background Removed.png",
      "images/categories/fashion/mini black skirt3 Background Removed.png",
      "images/categories/fashion/mini black skirt4 Background Removed.png",
      "images/categories/fashion/mini black skirt Background Removed.png",
    ],
    category: "clothing",
    tags: ["women", "dress", "mini", "skirt",],
    new: true,
    description:
      "Trendy mini skirt with a flattering fit and stylish design. Made from high-quality fabric for comfort and durability.",
    date: "2023-05-22",
    colors: ["white", "beige", "blue", "sage"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 22,
  },
  {
    id: "23",
    name: "Gold Chain Bracelet",
    price: 349.99,
    oldPrice: 399.99,
    rating: 4.8,
    reviews: 33,
    image: "/placeholder.svg?height=300&width=300&text=Gold+Bracelet",
    category: "jewelry",
    tags: ["women", "bracelet", "gold", "chain"],
    sale: true,
    description:
      "Elegant 14K gold chain bracelet with toggle clasp. Versatile piece that can be worn alone or layered with other bracelets.",
    date: "2023-04-05",
    stock: 8,
  },
  {
    id: "24",
    name: "Men's Leather Loafers",
    price: 229.99,
    rating: 4.6,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Loafers",
    category: "footwear",
    tags: ["men", "shoes", "loafers", "leather"],
    bestseller: true,
    description:
      "Classic leather loafers with hand-stitched details and comfortable cushioned insole. Perfect for both casual and formal occasions.",
    date: "2023-03-12",
    colors: ["black", "brown", "burgundy"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    stock: 18,
  },
  {
    id: "25",
    name: "Silk Neck Scarf",
    price: 69.99,
    rating: 4.5,
    reviews: 27,
    image: "/placeholder.svg?height=300&width=300&text=Silk+Scarf",
    category: "accessories",
    tags: ["women", "scarf", "silk", "spring"],
    featured: true,
    description:
      "Luxurious silk scarf with vibrant print. Versatile accessory that can be worn around the neck, as a headband, or tied to a handbag.",
    date: "2023-04-18",
    colors: ["multicolor"],
    stock: 25,
  },
  {
    id: "26",
    name: "Wool Blend Blazer",
    price: 279.99,
    oldPrice: 329.99,
    rating: 4.7,
    reviews: 39,
    image: "/placeholder.svg?height=300&width=300&text=Wool+Blazer",
    category: "clothing",
    tags: ["women", "blazer", "wool", "autumn"],
    sale: true,
    description:
      "Tailored wool blend blazer with classic notched lapels and single-button closure. A versatile piece for work or evening wear.",
    date: "2023-03-28",
    colors: ["black", "navy", "camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
  },
  {
    id: "27",
    name: "Sterling Silver Cufflinks",
    price: 119.99,
    rating: 4.6,
    reviews: 22,
    image: "images/categories/accessories/Sterling Silver Cufflinks-blue.jpg",
    gallery: [
      "images/categories/accessories/Sterling Silver Cufflinks-blue.jpg",
      "images/categories/accessories/Sterling Silver Cufflinks-gold.jpg",
      "images/categories/accessories/Sterling Silver Cufflinks.jpg",
    ],
    category: "jewelry",
    tags: ["men", "cufflinks", "silver", "formal"],
    new: true,
    description:
      "Elegant sterling silver cufflinks with modern geometric design. The perfect finishing touch for formal attire.",
    date: "2023-05-08",
    stock: 15,
  },
  {
    id: "28",
    name: "Women's Leather Sneakers",
    price: 159.99,
    rating: 4.8,
    reviews: 56,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Sneakers",
    category: "footwear",
    tags: ["women", "sneakers", "leather", "casual"],
    bestseller: true,
    description:
      "Premium leather sneakers with minimalist design and cushioned insole. Versatile style that pairs with everything from jeans to dresses.",
    date: "2023-04-02",
    colors: ["white", "black", "blush"],
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 20,
  },
  {
    id: "29",
    name: "Leather Crossbody Bag",
    price: 179.99,
    oldPrice: 219.99,
    rating: 4.7,
    reviews: 48,
    image: "/placeholder.svg?height=300&width=300&text=Crossbody+Bag",
    category: "accessories",
    tags: ["women", "bag", "leather", "crossbody"],
    sale: true,
    description:
      "Compact leather crossbody bag with adjustable strap and multiple compartments. Perfect for everyday essentials.",
    date: "2023-03-15",
    colors: ["black", "brown", "navy", "red"],
    stock: 14,
  },
  {
    id: "30",
    name: "Men's Denim Jacket",
    price: 149.99,
    rating: 4.6,
    reviews: 37,
    image: "/placeholder.svg?height=300&width=300&text=Denim+Jacket",
    category: "clothing",
    tags: ["men", "jacket", "denim", "casual"],
    featured: true,
    description:
      "Classic denim jacket with button front closure and chest pockets. A timeless piece that never goes out of style.",
    date: "2023-04-25",
    colors: ["light wash", "medium wash", "dark wash"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 18,
  },
  {
    id: "31",
    name: "Diamond Tennis Bracelet",
    price: 1999.99,
    rating: 4.9,
    reviews: 19,
    image: "/placeholder.svg?height=300&width=300&text=Tennis+Bracelet",
    category: "jewelry",
    tags: ["women", "bracelet", "diamond", "luxury"],
    featured: true,
    description:
      "Exquisite diamond tennis bracelet set in 18K white gold. Features 3 carats of brilliant-cut diamonds with secure clasp.",
    date: "2023-02-20",
    stock: 5,
  },
  {
    id: "32",
    name: "Suede Chelsea Boots",
    price: 219.99,
    oldPrice: 259.99,
    rating: 4.7,
    reviews: 43,
    image: "/placeholder.svg?height=300&width=300&text=Chelsea+Boots",
    category: "footwear",
    tags: ["men", "boots", "suede", "chelsea"],
    sale: true,
    description:
      "Classic suede Chelsea boots with elastic side panels and pull tab. Versatile style that works with both casual and smart outfits.",
    date: "2023-03-22",
    colors: ["black", "brown", "tan"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 16,
  },
  {
    id: "33",
    name: "Ladies ring",
    price: 65.00,
    rating: 4,
    reviews: 31,
    image: "images/categories/accessories/ring4 Background Removed.png",
    gallery: [
      "images/categories/accessories/ring4 Background Removed.png",
      "images/categories/accessories/ring for women-gold Background Removed.png",
      "images/categories/accessories/ring for women-silver Background Removed.png",
    ],
    category: "accessories",
    tags: ["women", "ring", "silver", "formal"],
    new: true,
    description:
      "Stylish ladies ring with intricate design. Made from high-quality materials, perfect for everyday wear or special occasions.",
    date: "2023-05-12",
    colors: ["black", "brown", "burgundy"],
    sizes: ["S", "M", "L"],
    stock: 22,
  },
  {
    id: "34",
    name: "Silk Tie Collection",
    price: 79.99,
    rating: 4.6,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300&text=Silk+Ties",
    category: "accessories",
    tags: ["men", "tie", "silk", "formal"],
    bestseller: true,
    description:
      "Set of three premium silk ties in classic patterns. Handcrafted with attention to detail for a refined look.",
    date: "2023-04-08",
    colors: ["assorted"],
    stock: 20,
  },
  {
    id: "35",
    name: "Women's Trench Coat",
    price: 299.99,
    oldPrice: 349.99,
    rating: 4.8,
    reviews: 52,
    image: "/placeholder.svg?height=300&width=300&text=Trench+Coat",
    category: "clothing",
    tags: ["women", "coat", "trench", "spring"],
    sale: true,
    description:
      "Classic trench coat with double-breasted front, belted waist, and water-resistant fabric. A timeless piece for transitional weather.",
    date: "2023-03-10",
    colors: ["beige", "black", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 14,
  },
  {
    id: "36",
    name: "Earrings",
    price: 499.99,
    rating: 4.8,
    reviews: 26,
    image: "images/categories/accessories/Earrings1 Background Removed.png",
    gallery: [
      "images/categories/accessories/Earrings1 Background Removed.png",
      "images/categories/accessories/Earrings2 Background Removed.png",
      "images/categories/accessories/Earrings3 Background Removed.png",
    ],
    category: "jewelry",
    tags: ["women", "earrings", "luxury"],
    new: true,
    description:
      "Elegant earrings featuring a unique design with sparkling gemstones. Perfect for adding a touch of glamour to any outfit.",
    date: "2023-05-18",
    stock: 8,
  },
]

// Make products available globally
window.products = products

// Get all products
function getProducts() {
  return products
}

// Get product by ID
function getProductById(id) {
  return products.find((product) => product.id === id)
}

// Get products by category
function getProductsByCategory(category) {
  if (category === "all") return products
  return products.filter((product) => product.category === category)
}

// Get products by tag
function getProductsByTag(tag) {
  return products.filter((product) => product.tags && product.tags.includes(tag))
}

// Get featured products
function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}

// Get new products
function getNewProducts() {
  return products.filter((product) => product.new)
}

// Get sale products
function getSaleProducts() {
  return products.filter((product) => product.sale)
}

// Get bestseller products
function getBestsellerProducts() {
  return products.filter((product) => product.bestseller)
}

// Sort products by price (low to high)
function sortProductsByPriceLowToHigh(productsArray) {
  return [...productsArray].sort((a, b) => a.price - b.price)
}

// Sort products by price (high to low)
function sortProductsByPriceHighToLow(productsArray) {
  return [...productsArray].sort((a, b) => b.price - a.price)
}

// Sort products by name (A to Z)
function sortProductsByNameAsc(productsArray) {
  return [...productsArray].sort((a, b) => a.name.localeCompare(b.name))
}

// Sort products by name (Z to A)
function sortProductsByNameDesc(productsArray) {
  return [...productsArray].sort((a, b) => b.name.localeCompare(a.name))
}

// Sort products by newest
function sortProductsByNewest(productsArray) {
  return [...productsArray].sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Filter products by price range
function filterProductsByPriceRange(productsArray, min, max) {
  return productsArray.filter((product) => product.price >= min && product.price <= max)
}

// Search products
function searchProducts(query) {
  query = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(query))),
  )
}

// Add to cart
function addToCart(productId, quantity = 1) {
  // Get current cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if product already in cart
  const existingProductIndex = cart.findIndex((item) => item.id === productId)

  if (existingProductIndex !== -1) {
    // Update quantity if product already in cart
    cart[existingProductIndex].quantity += quantity
  } else {
    // Add new product to cart
    cart.push({
      id: productId,
      quantity: quantity,
    })
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count in UI
  updateCartCount()

  return cart
}

// Remove from cart
function removeFromCart(productId) {
  // Get current cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  // Remove product from cart
  cart = cart.filter((item) => item.id !== productId)

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count in UI
  updateCartCount()

  return cart
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
  // Get current cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  // Find product in cart
  const productIndex = cart.findIndex((item) => item.id === productId)

  if (productIndex !== -1) {
    // Update quantity
    if (quantity > 0) {
      cart[productIndex].quantity = quantity
    } else {
      // Remove product if quantity is 0 or less
      cart = cart.filter((item) => item.id !== productId)
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Update cart count in UI
    updateCartCount()
  }

  return cart
}

// Get cart
function getCart() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Get full product details for each cart item
  const cartWithDetails = cart.map((item) => {
    const product = getProductById(item.id)
    return {
      ...item,
      product: product,
      total: product.price * item.quantity,
    }
  })

  return cartWithDetails
}

// Calculate cart total
function calculateCartTotal() {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.total, 0)
}

// Update cart count in UI
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  // Update all cart count elements
  const cartCountElements = document.querySelectorAll(".cart-count")
  cartCountElements.forEach((element) => {
    element.textContent = count
  })

  return count
}

// Apply coupon
function applyCoupon(code) {
  // Sample coupon codes
  const coupons = {
    LUXE2023: {
      type: "percentage",
      value: 15,
    },
    WELCOME10: {
      type: "percentage",
      value: 10,
    },
    FREESHIP: {
      type: "shipping",
      value: "free",
    },
  }

  // Check if coupon exists
  if (coupons[code]) {
    return coupons[code]
  }

  return null
}

// Calculate shipping cost
function calculateShipping(subtotal, country = "US") {
  // Sample shipping rates
  const shippingRates = {
    US: {
      standard: 5.99,
      express: 12.99,
      freeThreshold: 100,
    },
    CA: {
      standard: 8.99,
      express: 15.99,
      freeThreshold: 150,
    },
    UK: {
      standard: 9.99,
      express: 18.99,
      freeThreshold: 150,
    },
    EU: {
      standard: 11.99,
      express: 21.99,
      freeThreshold: 200,
    },
    default: {
      standard: 14.99,
      express: 24.99,
      freeThreshold: 250,
    },
  }

  // Get shipping rates for country or use default
  const rates = shippingRates[country] || shippingRates.default

  // Free shipping if subtotal is above threshold
  if (subtotal >= rates.freeThreshold) {
    return {
      standard: 0,
      express: rates.express - rates.standard,
    }
  }

  return rates
}

// Get related products
function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId)

  if (!product) return []

  // Get products in same category
  let related = products.filter(
    (p) =>
      p.id !== productId &&
      (p.category === product.category || (p.tags && product.tags && p.tags.some((tag) => product.tags.includes(tag)))),
  )

  // Shuffle array to get random selection
  related = related.sort(() => 0.5 - Math.random())

  // Return limited number of products
  return related.slice(0, limit)
}

// Show quick view
function showQuickView(productId) {
  // Get product data
  const product = getProductById(productId)
  if (!product) {
    console.error(`Product with ID ${productId} not found`)
    return
  }

  // Create modal element
  const modal = document.createElement("div")
  modal.className = "quick-view-modal"

  // Generate modal content
  modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="product-quick-view">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="product-price">
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ""}
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        <span class="rating-count">(${product.reviews || 0} reviews)</span>
                    </div>
                    <p class="product-description">${product.description || "No description available."}</p>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="btn primary-btn add-to-cart-btn" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                    <div class="product-meta">
                        <p><strong>Category:</strong> ${product.category || "Uncategorized"}</p>
                        <p><strong>Tags:</strong> ${product.tags ? product.tags.join(", ") : "None"}</p>
                    </div>
                </div>
            </div>
        </div>
    `

  // Add to DOM
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Animate in
  setTimeout(() => {
    modal.classList.add("active")
  }, 10)

  // Close button
  const closeButton = modal.querySelector(".close-modal")
  closeButton.addEventListener("click", () => {
    closeQuickView(modal)
  })

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeQuickView(modal)
    }
  })

  // Quantity buttons
  const quantityInput = modal.querySelector(".quantity-input")
  const minusButton = modal.querySelector(".quantity-btn.minus")
  const plusButton = modal.querySelector(".quantity-btn.plus")

  minusButton.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1
    }
  })

  plusButton.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    quantityInput.value = currentValue + 1
  })

  // Add to cart button
  const addToCartButton = modal.querySelector(".add-to-cart-btn")
  addToCartButton.addEventListener("click", () => {
    const quantity = Number.parseInt(quantityInput.value)
    addToCart(product.id, quantity)
    showNotification(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart!`)
    closeQuickView(modal)
  })

  console.log(`Quick view opened for product ${productId}`)
}

// Close Quick View
function closeQuickView(modal) {
  modal.classList.remove("active")
  setTimeout(() => {
    modal.remove()
    document.body.style.overflow = ""
  }, 300)
}

// Generate star rating HTML
function generateStarRating(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>'
    } else if (i - 0.5 <= rating) {
      stars += '<i class="fas fa-star-half-alt"></i>'
    } else {
      stars += '<i class="far fa-star"></i>'
    }
  }
  return stars
}

// Show notification
function showNotification(message, type = "success", duration = 3000) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.classList.add("active")
  }, 10)

  // Auto-close
  setTimeout(() => {
    notification.classList.remove("active")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, duration)
}

// Make functions available globally
window.getProducts = getProducts
window.getProductById = getProductById
window.getProductsByCategory = getProductsByCategory
window.getProductsByTag = getProductsByTag
window.getFeaturedProducts = getFeaturedProducts
window.getNewProducts = getNewProducts
window.getSaleProducts = getSaleProducts
window.getBestsellerProducts = getBestsellerProducts
window.sortProductsByPriceLowToHigh = sortProductsByPriceLowToHigh
window.sortProductsByPriceHighToLow = sortProductsByPriceHighToLow
window.sortProductsByNameAsc = sortProductsByNameAsc
window.sortProductsByNameDesc = sortProductsByNameDesc
window.sortProductsByNewest = sortProductsByNewest
window.filterProductsByPriceRange = filterProductsByPriceRange
window.searchProducts = searchProducts
window.addToCart = addToCart
window.removeFromCart = removeFromCart
window.updateCartQuantity = updateCartQuantity
window.getCart = getCart
window.calculateCartTotal = calculateCartTotal
window.updateCartCount = updateCartCount
window.applyCoupon = applyCoupon
window.calculateShipping = calculateShipping
window.getRelatedProducts = getRelatedProducts
window.showQuickView = showQuickView

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getProducts,
    getProductById,
    getProductsByCategory,
    getProductsByTag,
    getFeaturedProducts,
    getNewProducts,
    getSaleProducts,
    getBestsellerProducts,
    sortProductsByPriceLowToHigh,
    sortProductsByPriceHighToLow,
    sortProductsByNameAsc,
    sortProductsByNameDesc,
    sortProductsByNewest,
    filterProductsByPriceRange,
    searchProducts,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCart,
    calculateCartTotal,
    updateCartCount,
    applyCoupon,
    calculateShipping,
    getRelatedProducts,
    showQuickView,
  }
}
