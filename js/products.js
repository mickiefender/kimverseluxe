/**
 * Kimverse Luxe E-commerce Website
 * Products Data and Functions
 */

// Product Database
const products = [
    {
        id: 1,
        name: "Long Sleeves shirt",
        price: 1,
        oldPrice: 249.99,
        discount: 24,
        category: "clothing",
        gender: "unisex",
        tags: ["new", "featured", "bestseller"],
        colors: ["#000000", "#e74c3c", "#3498db"],
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
            "clothing/long sleeves shirt-1.jpg",
      "clothing/long sleeves shirt-2.jpg",
      "clothing/long sleeves shirt-3.jpg",
      "clothing/long sleeves shirt-4.jpg",
        ],
        thumbnail: "clothing/long sleeves shirt-4.jpg",
        description: "This elegant long sleeves shirt is made from high-quality cotton, offering both comfort and style. The classic design makes it suitable for both casual and formal occasions.",
        shortDescription: "Elegant long sleeves shirt made from high-quality cotton.",
        rating: 4.8,
        reviewCount: 24,
        stock: 15,
        isNew: true,
        isFeatured: true,
        isBestseller: false,
        additionalInfo: {
            material: "100% Cotton",
            careInstructions: "Machine wash cold",
            origin: "Made in Nigeria",
            modelSize: "Model wears size S"
        }
    },
    {
        id: 2,
        name: "Premium Leather Handbag",
        price: 299.99,
        oldPrice: 349.99,
        discount: 14,
        category: "accessories",
        gender: "women",
        tags: ["featured", "bestseller"],
        colors: ["#6b4423", "#000000", "#7f8c8d","red"],
        sizes: [],
        images: [
             "accessories/Designer Leather Handbag-LV-1.jpg",
      "accessories/Designer Leather Handbag-LV-Black.jpg",
      "accessories/Designer Leather Handbag-LV-Brown.jpg",
      "accessories/Designer Leather Bag-LV-red.jpg",
        ],
        thumbnail: "images/products/handbag-1-thumb.jpg",
        description: "Crafted from premium full-grain leather, this handbag combines elegance with functionality. Features multiple compartments and a detachable shoulder strap.",
        shortDescription: "Premium full-grain leather handbag with multiple compartments.",
        rating: 4.9,
        reviewCount: 42,
        stock: 8,
        isNew: false,
        isFeatured: true,
        isBestseller: true,
        additionalInfo: {
            material: "Full-grain leather",
            dimensions: "30cm x 22cm x 10cm",
            features: "Detachable shoulder strap, interior pockets",
            origin: "Made in Ghana"
        }
    },
    {
        id: 3,
        name: "Diamond Pendant Necklace",
        price: 599.99,
        oldPrice: null,
        discount: 0,
        category: "jewelry",
        gender: "women",
        tags: ["luxury", "featured"],
        colors: ["#FFD700", "#C0C0C0"],
        sizes: [],
        images: [
            "accessories/Diamond Pendant Necklace-1.jpg",
            "accessories/Diamond Pendant Necklace-2.jpg",
            "accessories/Diamond Pendant Necklace-4.jpg",
            "accessories/Diamond Pendant Necklace3.jpg"
        ],
        thumbnail: "images/products/necklace-1-thumb.jpg",
        description: "This exquisite diamond pendant necklace features a 0.5 carat diamond set in 18k gold. The delicate chain and timeless design make it perfect for any occasion.",
        shortDescription: "Exquisite 0.5 carat diamond pendant in 18k gold.",
        rating: 5.0,
        reviewCount: 18,
        stock: 5,
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        additionalInfo: {
            material: "18k Gold, 0.5 carat diamond",
            chainLength: "45cm with 5cm extender",
            certification: "Includes authenticity certificate",
            origin: "Made in South Africa"
        }
    },
    {
        id: 4,
        name: "Italian Leather Loafers",
        price: 249.99,
        oldPrice: 299.99,
        discount: 17,
        category: "footwear",
        gender: "men",
        tags: ["bestseller", "summer"],
        colors: ["#6b4423", "#000000"],
        sizes: [40, 41, 42, 43, 44, 45],
        images: [
             "footwares/Italian Leather Loafers-Francis-1.jpg",
      "footwares/Italian Leather Loafers-Francis-2.jpg",
      "footwares/Italian Leather Loafers-Francis-3.jpg",
        ],
        thumbnail: "images/products/loafers-1-thumb.jpg",
        description: "Handcrafted in Italy, these premium leather loafers combine comfort with sophisticated style. Perfect for both casual and formal occasions.",
        shortDescription: "Handcrafted Italian leather loafers for sophisticated style.",
        rating: 4.7,
        reviewCount: 36,
        stock: 12,
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            material: "Full-grain Italian leather",
            sole: "Leather sole with rubber inserts",
            features: "Cushioned insole for comfort",
            origin: "Made in Italy"
        }
    },
    {
        id: 5,
        name: "Designer Sunglasses",
        price: 179.99,
        oldPrice: null,
        discount: 0,
        category: "accessories",
        gender: "unisex",
        tags: ["new", "summer"],
        colors: ["#000000", "#8e44ad", "#e74c3c"],
        sizes: [],
        images: [
            "accessories/Designer Sunglasses-black.jpg",
      "accessories/Designer Sunglasses-gold&black.jpg",
      "accessories/Designer Sunglasses-red.jpg",
      "accessories/Designer Sunglasses-2.jpg",
        ],
        thumbnail: "images/products/sunglasses-1-thumb.jpg",
        description: "These designer sunglasses feature polarized lenses and a lightweight frame. The timeless design suits most face shapes and provides 100% UV protection.",
        shortDescription: "Designer sunglasses with polarized lenses and UV protection.",
        rating: 4.6,
        reviewCount: 29,
        stock: 20,
        isNew: true,
        isFeatured: false,
        isBestseller: false,
        additionalInfo: {
            material: "Acetate frame, polarized lenses",
            protection: "100% UV protection",
            dimensions: "Lens width: 52mm, Bridge: 21mm, Temple length: 145mm",
            includes: "Protective case and cleaning cloth"
        }
    },
    {
        id: 6,
        name: "Cashmere Scarf",
        price: 229.99,
        discount: 18,
        category: "accessories",
        gender: "unisex",
        tags: ["featured", "bestseller"],
        colors: ["#2c3e50", "#7f8c8d", "#c0392b", "#2980b9","black"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "accessories/Cashmere Scarf-multicolored.jpg",
      "accessories/Cashmere Scarf-cream-colors.jpg",
      "accessories/Cashmere Scarf-3.jpg",
      "accessories/Cashmere Scarf-4.jpg",
        ],
        thumbnail: "/placeholder.svg?height=600&width=600&text=Luxury+Watch+Closeup",
        description: "This luxurious cashmere scarf is perfect for adding a touch of elegance to any outfit. The soft, breathable fabric ensures all-day comfort.",
        shortDescription: "Luxurious cashmere scarf for all-day comfort.",
        rating: 4.1,
        reviewCount: 45,
        stock: 10,
        isNew: false,
        isFeatured: true,
        isBestseller: true,
        additionalInfo: {
            material: "100% Cashmere",
            care: "Hand wash cold or dry clean only",
            weight: "Medium weight, 12-gauge knit",
            origin: "Made in Scotland"
        }
    },
    {
        id: 7,
        name: "Gold Hoop Earrings",
        price: 149.99,
        oldPrice: null,
        discount: 0,
        category: "jewelry",
        gender: "women",
        tags: ["new", "featured"],
        colors: ["#FFD700"],
        sizes: [],
        images: [
             "accessories/Gold Hoop Earrings-1.jpg",
      "accessories/Gold Hoop Earrings-2.jpg",
      "accessories/Gold Hoop Earrings-3.jpg",
        "accessories/Gold Hoop Earrings-4.jpg",
        ],
        thumbnail: "images/products/earrings-1-thumb.jpg",
        description: "These elegant 18k gold hoop earrings feature a classic design with a modern twist. The secure clasp ensures comfortable all-day wear.",
        shortDescription: "Elegant 18k gold hoop earrings with secure clasp.",
        rating: 4.8,
        reviewCount: 22,
        stock: 15,
        isNew: true,
        isFeatured: true,
        isBestseller: false,
        additionalInfo: {
            material: "18k Gold",
            diameter: "40mm",
            weight: "4g each",
            origin: "Made in Ghana"
        }
    },
    {
        id: 8,
        name: "Leather Belt with Designer Buckle",
        price: 129.99,
        oldPrice: 159.99,
        discount: 19,
        category: "accessories",
        gender: "men",
        tags: ["bestseller"],
        colors: ["#6b4423", "#000000"],
        sizes: [90, 95, 100, 105, 110],
        images: [
"accessories/Leather Belt Infinitude-1.jpg",
      "accessories/Leather Belt Infinitude-2.jpg",
      "accessories/Leather Belt Infinitude-3.jpg",
        ],
        thumbnail: "images/products/belt-1-thumb.jpg",
        description: "This premium leather belt features a distinctive designer buckle. Crafted from full-grain leather, it offers durability and timeless style.",
        shortDescription: "Premium full-grain leather belt with distinctive designer buckle.",
        rating: 4.7,
        reviewCount: 31,
        stock: 18,
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            material: "Full-grain leather",
            buckle: "Solid brass with palladium finish",
            width: "35mm",
            origin: "Made in Ghana"
        }
    },
    {
        id: 9,
        name: "Silk Scarf",
        price: 89.99,
        discount: 25,
        category: "accessories",
        gender: "women",
        tags: ["sale", "summer"],
        colors: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"],
        sizes: [],
        images: [
            "accessories/Silk Scarf-2.jpg",
            "accessories/Silk Scarf-3.jpg",
            "accessories/Silk Scarf-4.jpg"
        ],
        thumbnail: "images/products/scarf-1-thumb.jpg",
        description: "This luxurious silk scarf features a vibrant print inspired by African art. The versatile size allows it to be worn in multiple ways.",
        shortDescription: "Luxurious silk scarf with vibrant African-inspired print.",
        rating: 4.6,
        reviewCount: 27,
        stock: 22,
        isNew: false,
        isFeatured: false,
        isBestseller: false,
        additionalInfo: {
            material: "100% Silk",
            dimensions: "90cm x 90cm",
            care: "Dry clean only",
            origin: "Made in Ghana"
        }
    },
    {
        id: 10,
        name: "Patek Philippe Watch",
        price: 1299.99,
        oldPrice: 1499.99,
        discount: 13,
        category: "accessories",
        gender: "men",
        tags: ["luxury", "featured"],
        colors: ["#C0C0C0","black", "#FFD700"],
        sizes: [],
        images: [
            "accessories/Patek Philippe-2.jpg",
            "accessories/Patek Philippe-1.jpg",
            "accessories/Patek Philippe-3.jpg"
        ],
        thumbnail: "images/products/watch-1-thumb.jpg",
        description: "This luxury watch features a Swiss automatic movement and a sapphire crystal. The stainless steel case and leather strap add to its elegance.",
        shortDescription: "Luxury timepiece with Swiss automatic movement and sapphire crystal.",
        rating: 4.9,
        reviewCount: 19,
        stock: 7,
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        additionalInfo: {
            movement: "Swiss automatic",
            case: "Stainless steel, 42mm",
            waterResistance: "100 meters",
            warranty: "2-year international warranty"
        }
    },
    {
        id: 11,
        name: "Designer Perfume",
        price: 119.99,
        oldPrice: null,
        discount: 0,
        category: "perfumes",
        gender: "women",
        tags: ["new", "luxury"],
        colors: [],
        sizes: ["50ml", "100ml"],
        images: [
            "perfumes/Designer Perfume Bakarat-1.jpg",
            "perfumes/Designer Perfume Bakarat-2.jpg",
            "perfumes/Designer Perfume Bakarat-4.jpg",
            "perfumes/Designer Perfume Bakarat-13.jpg"
        ],
        thumbnail: "images/products/perfume-1-thumb.jpg",
        description: "This exquisite perfume features notes of jasmine, rose, and sandalwood. The elegant bottle design makes it a beautiful addition to any vanity.",
        shortDescription: "Exquisite perfume with notes of jasmine, rose, and sandalwood.",
        rating: 4.8,
        reviewCount: 33,
        stock: 25,
        isNew: true,
        isFeatured: false,
        isBestseller: false,
        additionalInfo: {
            fragrance: "Floral Woody",
            notes: "Top: Bergamot, Middle: Jasmine and Rose, Base: Sandalwood and Vanilla",
            concentration: "Eau de Parfum",
            origin: "Made in France"
        }
    },
    {
        id: 12,
        name: "Ladies accessories set",
        price: 79.99,
        oldPrice: 99.99,
        discount: 20,
        category: "accessories",
        gender: "men",
        tags: ["bestseller", "sale"],
        colors: ["#6b4423", "#000000"],
        sizes: [],
        images: [
            "accessories/ladies-accessories set-1.jpg",
            "accessories/ladies-accessories set-2.jpg",
            "accessories/ladies-accessories set-3.jpg",
            "accessories/ladies-accessories set-4.jpg"
        ],
        thumbnail: "accessories/ladies-accessories set-3.jpg",
        description: "This ladies accessories set includes a matching keychain, and a chic bracelet. Perfect for gifting or personal use.",
        shortDescription: " Stylish accessories set including keychain and bracelet.",
        rating: 4.7,
        reviewCount: 48,
        stock: 30,
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            material: "Genuine leather and stainless steel",
            dimensions: "Keychain: 10cm, Bracelet: Adjustable",
            features: "Stylish design, durable materials",
            origin: "Made in Ghana"
        }
    },
    {
        id: 13,
        name: "Men summer shorts",
        price: 45,
        oldPrice: null,
        discount: 0,
        category: "clothing",
        gender: "men",
        tags: ["new", "summer"],
        colors: ["#FFFFFF", "#87CEEB", "#F5F5DC", "#FFB6C1","red"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            "clothing/men undershorts-1.jpg",
            "clothing/men undershorts-2.jpg",
            "clothing/men undershorts-3.jpg",
            "clothing/men undershorts-4.jpg"
        ],
        thumbnail: "clothing/men undershorts-3.jpg",
        description: " These premium linen shorts are perfect for summer. They feature a relaxed fit, breathable fabric, and an elastic waistband for comfort.",
        shortDescription: "Premium linen shirt with relaxed fit for summer comfort.",
        rating: 4.6,
        reviewCount: 26,
        stock: 20,
        isNew: true,
        isFeatured: false,
        isBestseller: false,
        additionalInfo: {
            material: "100% Linen",
            care: "Machine wash cold, tumble dry low",
            fit: "Relaxed fit",
            origin: "Made in Ghana"
        }
    },
    {
        id: 14,
        name: "Dior slippers",
        price: 230.99,
        discount: 13,
        category: "footwear",
        gender: "women",
        tags: ["featured", "luxury"],
        colors: ["#000000", "#FF0000", "#C0C0C0"],
        sizes: [36, 37, 38, 39, 40, 41],
        images: [
            "footwares/Dior slippers-2.jpg",
            "footwares/Dior slippers-1.jpg",
            "footwares/Dior slippers-3.jpg",
            "footwares/Dior slippers-4.jpg"
        ],
        thumbnail: "footwares/Dior slippers-2.jpg",
        description: " These designer slippers feature a sleek silhouette and a comfortable 3-inch heel. Made from premium leather, they are perfect for both casual and formal occasions.",
        shortDescription: "Designer leather slippers with comfortable 3-inch heel.",
        rating: 4.8,
        reviewCount: 21,
        stock: 12,
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        additionalInfo: {
            material: "Premium leather upper, leather lining",
            sole: "Leather with rubber insert",
            origin: "Made in Italy"
        }
    },
    {
        id: 15,
        name: "Luxury Cologne",
        price: 129.99,
        discount: 13,
        category: "perfumes",
        gender: "men",
        tags: ["bestseller", "luxury"],
        colors: [],
        sizes: ["50ml", "100ml", "200ml"],
        images: [
            "perfumes/Luxury Cologne-3.jpg",
            "perfumes/Luxury Cologne-2.jpg",
            "perfumes/Luxury Cologne-1.jpg",
            "perfumes/Luxury Cologne-4.jpg"
        ],
        thumbnail: "images/products/cologne-1-thumb.jpg",
        description: "This luxury cologne features notes of bergamot, cedar, and amber. The sophisticated scent is perfect for both day and evening wear.",
        shortDescription: "Luxury cologne with notes of bergamot, cedar, and amber.",
        rating: 4.9,
        reviewCount: 37,
        stock: 18,
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            fragrance: "Woody Aromatic",
            notes: "Top: Bergamot and Lemon, Middle: Cedar and Lavender, Base: Amber and Musk",
            concentration: "Eau de Parfum",
            origin: "Made in France"
        }
    },
    {
        id: 16,
        name: "Silk Blouse",
        price: 149.99,
        oldPrice: 179.99,
        discount: 17,
        category: "clothing",
        gender: "women",
        tags: ["featured", "summer"],
        colors: ["#FFFFFF", "green", "#87CEEB", "#000000"],
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
            "clothing/Silk Blouse-1.jpg",
            "clothing/Silk Blouse-2.jpg",
            "clothing/Silk Blouse-3.jpg"
        ],
        thumbnail: "images/products/blouse-1-thumb.jpg",
        description: "This elegant silk blouse features a flattering cut and delicate details. The versatile design makes it perfect for both office wear and special occasions.",
        shortDescription: "Elegant silk blouse with flattering cut and delicate details.",
        rating: 4.7,
        reviewCount: 29,
        stock: 15,
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        additionalInfo: {
            material: "100% Silk",
            care: "Dry clean only",
            fit: "Regular fit",
            origin: "Made in Ghana"
        }
    },
    {
        id: 17,
        name: "Ladies Shoe",
        price: 79.99,
        oldPrice: null,
        discount: 0,
        category: "footwear",
        gender: "women",
        tags: ["luxury", "new"],
        colors: ["pink", "brown", "black"],
        sizes: [],
        images: [
            "footwares/Ladies shoe-1.jpg",
            "footwares/Ladies show-2.jpg",
            "footwares/Ladies Shoe-3.jpg"
        ],
        thumbnail: "footwares/Ladies Shoe-1.jpg",
        description: " This designer shoe features a distinctive pattern and a comfortable heel. Perfect for formal occasions or adding a touch of elegance to any outfit.",
        shortDescription: "Designer shoe with distinctive pattern and comfortable heel.",
        rating: 4.8,
        reviewCount: 18,
        stock: 25,
        isNew: true,
        isFeatured: false,
        isBestseller: false,
        additionalInfo: {
            material: "Premium leather upper, leather lining",
            sole: "Leather with rubber insert",
            width: "Standard",
            care: "Clean with a damp cloth and leather conditioner",
            origin: "Made in Italy"
        }
    },
    {
        id: 18,
        name: "Gucci Crossbody Bag",
        price: 199.99,
        oldPrice: 249.99,
        discount: 20,
        category: "accessories",
        gender: "women",
        tags: ["bestseller", "sale"],
        colors: ["#000000", "#6b4423", "#8B0000"],
        sizes: [],
        images: [
            "accessories/Gucci Crossbody Bad-4.jpg",
            "accessories/Gucci Crossbody Bad-3.jpg",
            "accessories/Gucci Crossbody Bag-1.jpg",
            "accessories/Gucci Crossbody Bag-2.jpg"
        ],
        thumbnail: "images/products/bag-1-thumb.jpg",
        description: "This leather crossbody bag combines style with functionality. Features multiple compartments, adjustable strap, and premium hardware.",
        shortDescription: "Stylish leather crossbody bag with multiple compartments.",
        rating: 4.9,
        reviewCount: 42,
        stock: 10,
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            material: "Full-grain leather",
            dimensions: "22cm x 15cm x 6cm",
            features: "Adjustable strap, multiple compartments, premium hardware",
            origin: "Made in Ghana"
        }
    },
    {
        id: 19,
        name: "short sleeves",
        price: 200,
        discount: 19,
        category: "clothing",
        gender: "unisex",
        tags: ["luxury", "featured"],
        colors: ["#C0C0C0", "#000000", "#8B0000"],
        sizes: [],
        images: [
            "clothing/short sleeves shirt-1.jpg",
            "clothing/short sleeves shirt-2.jpg",
            "clothing/short sleeves shirt-3.jpg",
            "clothing/short sleeves shirt-4.jpg"
        ],
        thumbnail: "clothing/short sleeves shirt-1.jpg",
        description: "This short sleeves shirt is made from luxurious cashmere, offering exceptional softness and warmth. The classic design makes it suitable for both casual and formal occasions.",
        shortDescription: " Luxurious short sleeves shirt with classic design.",
        rating: 4.8,
        reviewCount: 23,
        stock: 15,
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        additionalInfo: {
            material: "100% Cashmere",
            dimensions: "Available in S, M, L, XL",
            features: "Soft, breathable, and lightweight",
            care: "Dry clean only",
            origin: "Made in Scotland"
        }
    },
    {
        id: 20,
        name: "Nike SB Sneakers",
        price: 270,
        discount: 18,
        category: "footwear",
        gender: "unisex",
        tags: ["bestseller", "new"],
        colors: ["#FFFFFF", "#000000", "#8B0000","yellow","green"],
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        images: [
            "footwares/Nike SB-1.jpg",
            "footwares/Nike SB-2.jpg",
            "footwares/Nike SB-3.jpg",
            "footwares/Nike SB-4.jpg"
        ],
        thumbnail: "footwares/Nike SB-3.jpg",
        description: "These Nike SB sneakers are perfect for skateboarding and casual wear. The durable rubber sole provides excellent grip, while the canvas upper offers a classic look.",
        shortDescription: "Durable Nike SB sneakers for skateboarding and casual wear.",
        rating: 4.6,
        reviewCount: 31,
        stock: 30,
        isNew: true,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            material: "Canvas upper, rubber sole",
            features: "Durable, grippy sole, classic look",
            care: "Wipe with a damp cloth",
            origin: "Made in the USA"
        }
           
    },
    {
        id: 21,
        name: "Victoria's Secret Perfume",
        price: 89.99,
        discount: 18,
        category: "perfumes",
        gender: "women",
        tags: ["bestseller", "new", "luxury"],
        colors: ["#FFFFFF", "#000000", "#8B0000","yellow","green"],
        sizes: ["50ml", "100ml"],
        images: [
            "perfumes/Victoria's secret-1.jpg",
            "perfumes/Victoria's secret-2.jpg",
            "perfumes/Victoria's secret-3.jpg",
            "perfumes/Victoria Secret-4.jpg"
        ],
        thumbnail: "perfumes/Victoria Secret-4.jpg",
        description: " This Victoria's Secret perfume features a blend of floral and fruity notes, creating a fresh and inviting scent. The elegant bottle design adds a touch of luxury to your fragrance collection.",
        shortDescription: "Floral and fruity Victoria's Secret perfume with elegant bottle design.",
        rating: 4.6,
        reviewCount: 31,
        stock: 30,
        isNew: true,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            material: "Floral and fruity notes",
            fragrance: "Top: Citrus, Middle: Floral, Base: Woody",
            concentration: "Eau de Parfum",
            care: "Store in a cool, dry place away from direct sunlight",
            origin: "Made in the USA"
        }
    },
    
     {
        id: 22,
        name: "Vera Wang Perfume",
        price: 150,
        discount: 18,
        category: "perfumes",
        gender: "women",
        tags: ["bestseller", "new", "luxury"],
        colors: ["#FFFFFF", "#000000", "#8B0000","yellow","green"],
        sizes: ["50ml", "100ml"],
        images: [
            "perfumes/Vera wang-2.jpg",
            "perfumes/Vera wang men-1.jpg",
            
        ],
        thumbnail: "perfumes/Vera wang men-1.jpg",
        description: " This Vera Wang perfume features a blend of floral and fruity notes, creating a fresh and inviting scent. The elegant bottle design adds a touch of luxury to your fragrance collection.",
        shortDescription: "Floral and fruity Vera Wang perfume with elegant bottle design.",
        rating: 4.6,
        reviewCount: 31,
        stock: 30,
        isNew: true,
        isFeatured: false,
        isBestseller: true,
        additionalInfo: {
            material: "Floral and fruity notes",
            fragrance: "Top: Citrus, Middle: Floral, Base: Woody",
            concentration: "Eau de Parfum",
            care: "Store in a cool, dry place away from direct sunlight",
            origin: "Made in the USA"
        }
    },
    
];

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS'
    }).format(amount);
}

function getDiscountPercentage(oldPrice, currentPrice) {
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
}

function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

function getRelatedProducts(product, limit = 4) {
    // Get products in the same category, excluding the current product
    const sameCategory = products.filter(p => p.category === product.category && p.id !== product.id);
    
    // If we don't have enough products in the same category, add some from the same gender
    let related = [...sameCategory];
    if (related.length < limit) {
        const sameGender = products.filter(p => p.gender === product.gender && p.id !== product.id && !related.includes(p));
        related = [...related, ...sameGender];
    }
    
    // Shuffle the array and return the requested number of products
    return shuffleArray(related).slice(0, limit);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Product HTML Generation Functions
function generateProductCard(product) {
    const discountBadge = product.discount > 0 ? 
        `<div class="discount-badge">-${product.discount}%</div>` : '';
    
    const newBadge = product.isNew ? 
        `<div class="badge new-badge">New</div>` : '';
    
    const bestsellerBadge = product.isBestseller && !product.isNew ? 
        `<div class="badge bestseller-badge">Bestseller</div>` : '';
    
    const oldPriceHtml = product.oldPrice ? 
        `<div class="old-price">${formatCurrency(product.oldPrice)}</div>` : '';
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${discountBadge}
                ${newBadge}
                ${bestsellerBadge}
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn quick-view-btn" data-product-id="${product.id}" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn add-to-cart-btn" data-product-id="${product.id}" title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="action-btn add-to-wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">
                    ${oldPriceHtml}
                    <div class="current-price">${formatCurrency(product.price)}</div>
                </div>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
            </div>
        </div>
    `;
}

function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function generateQuickViewHtml(product) {
    const oldPriceHtml = product.oldPrice ? 
        `<div class="old-price">${formatCurrency(product.oldPrice)}</div>` : '';
    
    const stockStatus = product.stock > 0 ? 
        `<span class="in-stock">In Stock</span>` : 
        `<span class="out-of-stock">Out of Stock</span>`;
    
    // Generate color options
    let colorOptions = '';
    if (product.colors && product.colors.length > 0) {
        product.colors.forEach((color, index) => {
            colorOptions += `
                <div class="color-option ${index === 0 ? 'active' : ''}" 
                     style="background-color: ${color};" 
                     data-color="${color}">
                </div>
            `;
        });
    }
    
    // Generate size options
    let sizeOptions = '';
    if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach((size, index) => {
            sizeOptions += `
                <div class="size-option ${index === 0 ? 'active' : ''}" 
                     data-size="${size}">
                    ${size}
                </div>
            `;
        });
    }
    
    // Generate color and size sections if applicable
    const colorSection = product.colors && product.colors.length > 0 ? `
        <div class="product-colors">
            <h4>Color</h4>
            <div class="color-options">
                ${colorOptions}
            </div>
        </div>
    ` : '';
    
    const sizeSection = product.sizes && product.sizes.length > 0 ? `
        <div class="product-sizes">
            <h4>Size</h4>
            <div class="size-options">
                ${sizeOptions}
            </div>
        </div>
    ` : '';
    
    return `
        <div class="product-quick-view-inner">
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.images[0]}" alt="${product.name}" id="quick-view-main-image">
                </div>
                <div class="gallery-thumbs">
                    ${product.images.map((image, index) => `
                        <div class="thumb-item ${index === 0 ? 'active' : ''}" data-image="${image}">
                            <img src="${image}" alt="${product.name} ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="product-details">
                <h2>${product.name}</h2>
                <div class="product-price">
                    ${oldPriceHtml}
                    <div class="current-price">${formatCurrency(product.price)}</div>
                </div>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                    <span class="rating-count">(${product.reviewCount} reviews)</span>
                </div>
                <p>${product.shortDescription}</p>
                <div class="product-meta">
                    <p class="product-sku">SKU: KL-${product.id.toString().padStart(4, '0')}</p>
                    <p class="product-availability">Availability: ${stockStatus}</p>
                </div>
                ${colorSection}
                ${sizeSection}
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <button class="btn primary-btn add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn outline-btn add-to-wishlist-btn" data-product-id="${product.id}">
                        <i class="far fa-heart"></i> Add to Wishlist
                    </button>
                </div>
                <div class="product-meta">
                    <p>Category: <a href="shop.html?category=${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a></p>
                    <p>Tags: ${product.tags.map(tag => `<a href="shop.html?tag=${tag}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</a>`).join(', ')}</p>
                </div>
            </div>
        </div>
    `;
}

function generateProductDetailHtml(product) {
    const oldPriceHtml = product.oldPrice ? 
        `<div class="old-price">${formatCurrency(product.oldPrice)}</div>` : '';
    
    const stockStatus = product.stock > 0 ? 
        `<span class="in-stock">In Stock</span>` : 
        `<span class="out-of-stock">Out of Stock</span>`;
    
    // Generate color options
    let colorOptions = '';
    if (product.colors && product.colors.length > 0) {
        product.colors.forEach((color, index) => {
            colorOptions += `
                <div class="color-option ${index === 0 ? 'active' : ''}" 
                     style="background-color: ${color};" 
                     data-color="${color}">
                </div>
            `;
        });
    }
    
    // Generate size options
    let sizeOptions = '';
    if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach((size, index) => {
            sizeOptions += `
                <div class="size-option ${index === 0 ? 'active' : ''}" 
                     data-size="${size}">
                    ${size}
                </div>
            `;
        });
    }
    
    // Generate color and size sections if applicable
    const colorSection = product.colors && product.colors.length > 0 ? `
        <div class="product-colors">
            <h4>Color</h4>
            <div class="color-options">
                ${colorOptions}
            </div>
        </div>
    ` : '';
    
    const sizeSection = product.sizes && product.sizes.length > 0 ? `
        <div class="product-sizes">
            <h4>Size</h4>
            <div class="size-options">
                ${sizeOptions}
            </div>
        </div>
    ` : '';
    
    return `
        <div class="product-gallery">
            <div class="main-image">
                <img src="${product.images[0]}" alt="${product.name}" id="product-main-image">
            </div>
            <div class="gallery-thumbnails">
                ${product.images.map((image, index) => `
                    <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                        <img src="${image}" alt="${product.name} ${index + 1}">
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <div class="product-price">
                ${oldPriceHtml}
                <div class="current-price">${formatCurrency(product.price)}</div>
            </div>
            <div class="product-rating">
                ${generateRatingStars(product.rating)}
                <span class="rating-count">(${product.reviewCount} reviews)</span>
            </div>
            <p>${product.shortDescription}</p>
            <div class="product-meta">
                <p class="product-sku">SKU: KL-${product.id.toString().padStart(4, '0')}</p>
                <p class="product-availability">Availability: ${stockStatus}</p>
            </div>
            ${colorSection}
            ${sizeSection}
            <div class="product-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="btn primary-btn add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn outline-btn add-to-wishlist-btn" data-product-id="${product.id}">
                    <i class="far fa-heart"></i> Add to Wishlist
                </button>
            </div>
            <div class="product-share">
                <span>Share:</span>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-pinterest"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="product-categories">
                Category: <a href="shop.html?category=${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a>
            </div>
            <div class="product-tags">
                Tags: ${product.tags.map(tag => `<a href="shop.html?tag=${tag}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</a>`).join(', ')}
            </div>
        </div>
    `;
}

function generateProductDescriptionHtml(product) {
    return `
        <div class="product-description-content">
            <h3>Product Description</h3>
            <p>${product.description}</p>
            <h3>Features</h3>
            <ul>
                ${Object.entries(product.additionalInfo).map(([key, value]) => `
                    <li><strong>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> ${value}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

function generateAdditionalInfoHtml(product) {
    return `
        <table class="additional-info-table">
            <tbody>
                ${Object.entries(product.additionalInfo).map(([key, value]) => `
                    <tr>
                        <th>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</th>
                        <td>${value}</td>
                    </tr>
                `).join('')}
                <tr>
                    <th>Weight</th>
                    <td>N/A</td>
                </tr>
                <tr>
                    <th>Colors</th>
                    <td>
                        ${product.colors.map(color => `
                            <span class="color-dot" style="background-color: ${color};"></span>
                        `).join('')}
                    </td>
                </tr>
                <tr>
                    <th>Sizes</th>
                    <td>${product.sizes.length > 0 ? product.sizes.join(', ') : 'N/A'}</td>
                </tr>
            </tbody>
        </table>
    `;
}

function generateReviewsHtml(product) {
    // Generate random reviews for demo purposes
    const reviewers = [
        { name: 'John Doe', image: 'images/testimonials/testimonial-1.jpg', date: '2023-05-15' },
        { name: 'Jane Smith', image: 'images/testimonials/testimonial-2.jpg', date: '2023-06-22' },
        { name: 'Michael Johnson', image: 'images/testimonials/testimonial-3.jpg', date: '2023-07-10' }
    ];
    
    const reviewTitles = [
        'Excellent quality!',
        'Highly recommended',
        'Great purchase',
        'Exceeded expectations',
        'Worth every penny'
    ];
    
    const reviewContents = [
        'This product is amazing! The quality is exceptional and it looks even better in person.',
        'I am very satisfied with my purchase. The product arrived quickly and was exactly as described.',
        'Absolutely love it! The attention to detail is remarkable and the quality is outstanding.',
        'This exceeded my expectations. The craftsmanship is excellent and it feels very premium.',
        'Definitely worth the investment. The quality is superb and it has quickly become one of my favorites.'
    ];
    
    // Generate random reviews
    let reviewsHtml = '';
    const numReviews = Math.min(3, product.reviewCount);
    
    for (let i = 0; i < numReviews; i++) {
        const reviewer = reviewers[i % reviewers.length];
        const title = reviewTitles[Math.floor(Math.random() * reviewTitles.length)];
        const content = reviewContents[Math.floor(Math.random() * reviewContents.length)];
        const rating = Math.min(5, Math.max(3, Math.round(product.rating + (Math.random() * 0.5 - 0.25))));
        
        reviewsHtml += `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-author">
                        <img src="${reviewer.image}" alt="${reviewer.name}">
                        <div class="review-author-info">
                            <h4>${reviewer.name}</h4>
                            <div class="review-date">${reviewer.date}</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${generateRatingStars(rating)}
                    </div>
                </div>
                <h3 class="review-title">${title}</h3>
                <p>${content}</p>
                <div class="review-actions">
                    <div class="review-action">
                        <i class="far fa-thumbs-up"></i> Helpful (${Math.floor(Math.random() * 10) + 1})
                    </div>
                    <div class="review-action">
                        <i class="far fa-comment"></i> Reply
                    </div>
                </div>
            </div>
        `;
    }
    
    // Generate review summary
    const reviewSummary = `
        <div class="reviews-summary">
            <div class="reviews-average">
                <div class="rating">${product.rating.toFixed(1)}</div>
                <div class="stars">${generateRatingStars(product.rating)}</div>
                <div class="count">Based on ${product.reviewCount} reviews</div>
            </div>
            <div class="reviews-breakdown">
                <div class="review-bar">
                    <div class="review-bar-label">5 Star</div>
                    <div class="review-bar-track">
                        <div class="review-bar-fill" style="width: ${Math.round(70 + Math.random() * 30)}%;"></div>
                    </div>
                    <div class="review-bar-count">${Math.round(product.reviewCount * 0.7)}</div>
                </div>
                <div class="review-bar">
                    <div class="review-bar-label">4 Star</div>
                    <div class="review-bar-track">
                        <div class="review-bar-fill" style="width: ${Math.round(40 + Math.random() * 30)}%;"></div>
                    </div>
                    <div class="review-bar-count">${Math.round(product.reviewCount * 0.2)}</div>
                </div>
                <div class="review-bar">
                    <div class="review-bar-label">3 Star</div>
                    <div class="review-bar-track">
                        <div class="review-bar-fill" style="width: ${Math.round(10 + Math.random() * 15)}%;"></div>
                    </div>
                    <div class="review-bar-count">${Math.round(product.reviewCount * 0.07)}</div>
                </div>
                <div class="review-bar">
                    <div class="review-bar-label">2 Star</div>
                    <div class="review-bar-track">
                        <div class="review-bar-fill" style="width: ${Math.round(Math.random() * 5)}%;"></div>
                    </div>
                    <div class="review-bar-count">${Math.round(product.reviewCount * 0.02)}</div>
                </div>
                <div class="review-bar">
                    <div class="review-bar-label">1 Star</div>
                    <div class="review-bar-track">
                        <div class="review-bar-fill" style="width: ${Math.round(Math.random() * 3)}%;"></div>
                    </div>
                    <div class="review-bar-count">${Math.round(product.reviewCount * 0.01)}</div>
                </div>
            </div>
        </div>
    `;
    
    // Generate write review form
    const writeReviewForm = `
        <div class="write-review">
            <h3>Write a Review</h3>
            <form id="review-form">
                <div class="form-group">
                    <label>Your Rating</label>
                    <div class="rating-input">
                        <input type="radio" id="star5" name="rating" value="5">
                        <label for="star5"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star4" name="rating" value="4">
                        <label for="star4"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star3" name="rating" value="3">
                        <label for="star3"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star2" name="rating" value="2">
                        <label for="star2"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star1" name="rating" value="1">
                        <label for="star1"><i class="fas fa-star"></i></label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="review-title">Review Title</label>
                    <input type="text" id="review-title" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="review-content">Your Review</label>
                    <textarea id="review-content" class="form-control" rows="5" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="review-name">Your Name</label>
                        <input type="text" id="review-name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="review-email">Your Email</label>
                        <input type="email" id="review-email" class="form-control" required>
                    </div>
                </div>
                <button type="submit" class="btn primary-btn">Submit Review</button>
            </form>
        </div>
    `;
    
    return `
        <div class="reviews-container">
            ${reviewSummary}
            <div class="reviews-list">
                ${reviewsHtml}
            </div>
            ${writeReviewForm}
        </div>
    `;
}

// Product Loading Functions
function loadFeaturedProducts(containerId, limit = 8) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const featuredProducts = products.filter(product => product.isFeatured);
    const productsToShow = shuffleArray(featuredProducts).slice(0, limit);
    
    let html = '';
    productsToShow.forEach(product => {
        html += generateProductCard(product);
    });
    
    container.innerHTML = html;
    
    // Add event listeners
    addProductCardEventListeners();
}

function loadNewArrivals(containerId, category = null, limit = 8) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let newProducts = products.filter(product => product.isNew);
    
    // Filter by category if specified
    if (category && category !== 'all') {
        newProducts = newProducts.filter(product => product.category === category);
    }
    
    const productsToShow = shuffleArray(newProducts).slice(0, limit);
    
    let html = '';
    productsToShow.forEach(product => {
        html += generateProductCard(product);
    });
    
    container.innerHTML = html;
    
    // Add event listeners
    addProductCardEventListeners();
}

function loadBestsellerProducts(containerId, limit = 8) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const bestsellerProducts = products.filter(product => product.isBestseller);
    const productsToShow = shuffleArray(bestsellerProducts).slice(0, limit);
    
    let html = '';
    productsToShow.forEach(product => {
        html += generateProductCard(product);
    });
    
    container.innerHTML = html;
    
    // Add event listeners
    addProductCardEventListeners();
}

function loadShopProducts(containerId, filters = {}, sort = 'default', page = 1, limit = 12) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Apply filters
    let filteredProducts = [...products];
    
    if (filters.category && filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === filters.category);
    }
    
    if (filters.gender && filters.gender !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.gender === filters.gender);
    }
    
    if (filters.tag) {
        filteredProducts = filteredProducts.filter(product => product.tags.includes(filters.tag));
    }
    
    if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product => 
            product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
        );
    }
    
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply sorting
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'newest':
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        default:
            // Default sorting (featured first, then bestsellers, then new)
            filteredProducts.sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                if (a.isBestseller && !b.isBestseller) return -1;
                if (!a.isBestseller && b.isBestseller) return 1;
                if (a.isNew && !b.isNew) return -1;
                if (!a.isNew && b.isNew) return 1;
                return 0;
            });
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update product count
    const productCountElement = document.getElementById('product-count');
    if (productCountElement) {
        productCountElement.textContent = filteredProducts.length;
    }
    
    // Generate HTML
    let html = '';
    paginatedProducts.forEach(product => {
        html += generateProductCard(product);
    });
    
    // If no products found
    if (paginatedProducts.length === 0) {
        html = `
            <div class="no-products">
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button id="reset-all-filters" class="btn primary-btn">Reset All Filters</button>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    // Add event listeners
    addProductCardEventListeners();
    
    // Return total count for pagination
    return {
        total: filteredProducts.length,
        showing: paginatedProducts.length,
        hasMore: endIndex < filteredProducts.length
    };
}

function loadProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return false;
    
    // Update page title
    document.title = `${product.name} - Kimverse Luxe`;
    
    // Update breadcrumb
    const breadcrumbElement = document.getElementById('product-breadcrumb-name');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = product.name;
    }
    
    // Load product detail
    const productDetailElement = document.getElementById('product-detail');
    if (productDetailElement) {
        productDetailElement.innerHTML = generateProductDetailHtml(product);
    }
    
    // Load product tabs
    const descriptionTab = document.getElementById('tab-description');
    if (descriptionTab) {
        descriptionTab.innerHTML = generateProductDescriptionHtml(product);
    }
    
    const additionalInfoTab = document.getElementById('tab-additional-info');
    if (additionalInfoTab) {
        additionalInfoTab.innerHTML = generateAdditionalInfoHtml(product);
    }
    
    const reviewsTab = document.getElementById('tab-reviews');
    if (reviewsTab) {
        reviewsTab.innerHTML = generateReviewsHtml(product);
    }
    
    // Load related products
    const relatedProductsElement = document.getElementById('related-products');
    if (relatedProductsElement) {
        const relatedProducts = getRelatedProducts(product, 4);
        let html = '';
        relatedProducts.forEach(relatedProduct => {
            html += generateProductCard(relatedProduct);
        });
        relatedProductsElement.innerHTML = html;
    }
    
    // Add to recently viewed
    addToRecentlyViewed(product.id);
    
    // Add event listeners
    addProductDetailEventListeners();
    addProductCardEventListeners();
    
    return true;
}

function loadQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return false;
    
    const quickViewContent = document.getElementById('quick-view-content');
    if (quickViewContent) {
        quickViewContent.innerHTML = generateQuickViewHtml(product);
    }
    
    // Add event listeners
    addQuickViewEventListeners();
    
    return true;
}

function loadRecentlyViewed(containerId, limit = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const recentlyViewed = getRecentlyViewed();
    if (recentlyViewed.length === 0) {
        container.parentElement.style.display = 'none';
        return;
    }
    
    const recentProducts = recentlyViewed
        .map(id => getProductById(parseInt(id)))
        .filter(product => product !== undefined)
        .slice(0, limit);
    
    let html = '';
    recentProducts.forEach(product => {
        html += generateProductCard(product);
    });
    
    container.innerHTML = html;
    
    // Add event listeners
    addProductCardEventListeners();
}

// Recently Viewed Functions
function getRecentlyViewed() {
    const recentlyViewed = localStorage.getItem('recentlyViewed');
    return recentlyViewed ? JSON.parse(recentlyViewed) : [];
}

function addToRecentlyViewed(productId) {
    let recentlyViewed = getRecentlyViewed();
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    
    // Add to beginning of array
    recentlyViewed.unshift(productId);
    
    // Limit to 10 items
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Event Listeners
function addProductCardEventListeners() {
    // Quick View buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            loadQuickView(productId);
            document.querySelector('.quick-view-modal').classList.add('active');
        });
    });
    
    // Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            const quantity = 1;
            const selectedColor = document.querySelector('.color-option.active')?.getAttribute('data-color') || null;
            const selectedSize = document.querySelector('.size-option.active')?.getAttribute('data-size') || null;
            
            addToCart(productId, quantity, selectedColor, selectedSize);
            showNotification('Product added to cart!', 'success');
            updateCartCount();
        });
    });
    
    // Add to Wishlist buttons
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist-btn');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            
            addToWishlist(productId);
            showNotification('Product added to wishlist!', 'success');
            updateWishlistCount();
        });
    });
}

function addQuickViewEventListeners() {
    // Thumbnail click
    const thumbItems = document.querySelectorAll('.thumb-item');
    thumbItems.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const image = this.getAttribute('data-image');
            document.getElementById('quick-view-main-image').src = image;
            
            // Update active state
            document.querySelector('.thumb-item.active').classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.color-option.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.size-option.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // Quantity buttons
    const decreaseBtn = document.querySelector('.quantity-btn.decrease');
    const increaseBtn = document.querySelector('.quantity-btn.increase');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            const max = parseInt(quantityInput.getAttribute('max'));
            if (value < max) {
                quantityInput.value = value + 1;
            }
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            const max = parseInt(this.getAttribute('max'));
            
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > max) {
                this.value = max;
            }
        });
    }
}

function addProductDetailEventListeners() {
    // Thumbnail click
    const thumbItems = document.querySelectorAll('.gallery-thumbnail');
    thumbItems.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const image = this.getAttribute('data-image');
            document.getElementById('product-main-image').src = image;
            
            // Update active state
            document.querySelector('.gallery-thumbnail.active').classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.color-option.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.size-option.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });
    
    // Quantity buttons
    const decreaseBtn = document.querySelector('.quantity-btn.decrease');
    const increaseBtn = document.querySelector('.quantity-btn.increase');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            const max = parseInt(quantityInput.getAttribute('max'));
            if (value < max) {
                quantityInput.value = value + 1;
            }
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            const max = parseInt(this.getAttribute('max'));
            
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > max) {
                this.value = max;
            }
        });
    }
    
    // Tab switching
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active tab trigger
            document.querySelector('.tab-trigger.active').classList.remove('active');
            this.classList.add('active');
            
            // Update active tab content
            document.querySelector('.tab-content.active').classList.remove('active');
            document.querySelector(`.tab-content[data-tab="${tab}"]`).classList.add('active');
        });
    });
    
    // Review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your review! It will be published after moderation.', 'success');
            this.reset();
        });
    }
}

// Cart Functions
function addToCart(productId, quantity = 1, selectedColor = null, selectedSize = null) {
    const product = getProductById(productId);
    if (!product) return false;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
    );
    
    if (existingItemIndex !== -1) {
        // Update quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            selectedColor: selectedColor,
            selectedSize: selectedSize
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return true;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    }
    
    return false;
}

function updateCartItemQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    }
    
    return false;
}

function clearCart() {
    localStorage.removeItem('cart');
}

function calculateCartTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Wishlist Functions
function addToWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return false;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product already exists in wishlist
    const existingItemIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingItemIndex === -1) {
        // Add new item
        wishlist.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            stock: product.stock
        });
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        return true;
    }
    
    return false;
}

function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (index >= 0 && index < wishlist.length) {
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        return true;
    }
    
    return false;
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const count = wishlist.length;
    
    const wishlistCountElements = document.querySelectorAll('.wishlist-count');
    wishlistCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Export functions for use in other scripts
window.kimverseLuxe = {
    products,
    getProductById,
    getRelatedProducts,
    loadFeaturedProducts,
    loadNewArrivals,
    loadBestsellerProducts,
    loadShopProducts,
    loadProductDetail,
    loadQuickView,
    loadRecentlyViewed,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    calculateCartTotal,
    updateCartCount,
    addToWishlist,
    removeFromWishlist,
    updateWishlistCount,
    formatCurrency,
    showNotification
};