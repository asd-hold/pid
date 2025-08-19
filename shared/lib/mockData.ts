import { Product, Category } from '../../entities';
import { Storage, STORAGE_KEYS } from './storage';

// Mock product images (using placeholder service)
const getProductImages = (productId: number, count: number = 3): string[] => {
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    images.push(`https://picsum.photos/600/600?random=${productId}${i}`);
  }
  return images;
};

import { mockCategoriesWithSubcategories } from './mockDataEnhanced';

// Export enhanced categories with subcategories
export const mockCategories: Category[] = mockCategoriesWithSubcategories;

// Mock products
export const mockProducts: Product[] = [
  // Electronics
  {
    id: '1',
    slug: 'wireless-headphones-pro',
    title: 'Wireless Headphones Pro',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    originalPrice: 399.99,
    currency: 'USD',
    images: getProductImages(1, 4),
    category: 'electronics',
    subcategory: 'audio',
    tags: ['wireless', 'audio', 'premium'],
    rating: 4.8,
    reviewCount: 156,
    stock: 25,
    sku: 'WHP-001',
    brand: 'AudioTech',
    features: ['Active Noise Cancellation', '30h Battery', 'Quick Charge', 'Premium Build'],
    specifications: {
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.0',
    },
    status: 'published',
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    dateAdded: '2024-01-15T10:00:00Z',
    dateModified: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    slug: 'smartphone-ultra-256gb',
    title: 'Smartphone Ultra 256GB',
    description: 'Latest flagship smartphone with advanced camera system and lightning-fast processor.',
    price: 899.99,
    currency: 'USD',
    images: getProductImages(2, 5),
    category: 'electronics',
    tags: ['smartphone', 'flagship', '5G'],
    rating: 4.6,
    reviewCount: 89,
    stock: 15,
    sku: 'SPU-256',
    brand: 'TechCorp',
    features: ['108MP Camera', '5G Ready', 'Fast Charging', 'Water Resistant'],
    specifications: {
      'Storage': '256GB',
      'RAM': '12GB',
      'Display': '6.7" OLED',
      'Battery': '4500mAh',
    },
    status: 'published',
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    dateAdded: '2024-01-20T14:30:00Z',
    dateModified: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    slug: 'gaming-laptop-rtx',
    title: 'Gaming Laptop RTX',
    description: 'High-performance gaming laptop with RTX graphics and 144Hz display.',
    price: 1599.99,
    originalPrice: 1799.99,
    currency: 'USD',
    images: getProductImages(3, 3),
    category: 'electronics',
    subcategory: 'laptops',
    tags: ['gaming', 'laptop', 'RTX'],
    rating: 4.7,
    reviewCount: 43,
    stock: 8,
    sku: 'GLR-001',
    brand: 'GameTech',
    features: ['RTX 4060', '144Hz Display', '16GB RAM', 'RGB Keyboard'],
    specifications: {
      'Processor': 'Intel i7-12700H',
      'Graphics': 'RTX 4060',
      'RAM': '16GB DDR4',
      'Storage': '1TB SSD',
    },
    status: 'published',
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    dateAdded: '2024-01-10T09:15:00Z',
    dateModified: '2024-01-10T09:15:00Z',
  },

  // Clothing
  {
    id: '4',
    slug: 'cotton-t-shirt-pack',
    title: 'Premium Cotton T-Shirt 3-Pack',
    description: 'Soft, comfortable cotton t-shirts in classic colors. Perfect for everyday wear.',
    price: 49.99,
    currency: 'USD',
    images: getProductImages(4, 3),
    category: 'clothing',
    tags: ['cotton', 'basic', 'comfortable'],
    rating: 4.4,
    reviewCount: 234,
    stock: 50,
    sku: 'CTS-3PK',
    brand: 'ComfortWear',
    features: ['100% Cotton', 'Pre-shrunk', 'Machine Washable', 'Classic Fit'],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Classic',
      'Care': 'Machine Wash',
      'Colors': 'Black, White, Gray',
    },
    status: 'published',
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    dateAdded: '2024-01-05T11:20:00Z',
    dateModified: '2024-01-05T11:20:00Z',
  },
  {
    id: '5',
    slug: 'denim-jacket-vintage',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage-style denim jacket with distressed details and comfortable fit.',
    price: 89.99,
    originalPrice: 119.99,
    currency: 'USD',
    images: getProductImages(5, 4),
    category: 'clothing',
    subcategory: 'mens-clothing',
    tags: ['denim', 'vintage', 'jacket'],
    rating: 4.5,
    reviewCount: 67,
    stock: 20,
    sku: 'VDJ-001',
    brand: 'Vintage Co',
    features: ['Distressed Details', 'Classic Cut', 'Button Closure', 'Multiple Pockets'],
    specifications: {
      'Material': '100% Cotton Denim',
      'Wash': 'Medium Blue',
      'Fit': 'Regular',
      'Closure': 'Button Front',
    },
    status: 'published',
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    dateAdded: '2024-01-12T16:45:00Z',
    dateModified: '2024-01-12T16:45:00Z',
  },

  // Home & Garden
  {
    id: '6',
    slug: 'ceramic-dinnerware-set',
    title: 'Ceramic Dinnerware Set 16-Piece',
    description: 'Elegant ceramic dinnerware set perfect for family meals and entertaining guests.',
    price: 129.99,
    currency: 'USD',
    images: getProductImages(6, 3),
    category: 'home-garden',
    subcategory: 'kitchen-dining',
    tags: ['ceramic', 'dinnerware', 'kitchen'],
    rating: 4.6,
    reviewCount: 91,
    stock: 30,
    sku: 'CDS-16',
    brand: 'HomeStyle',
    features: ['Dishwasher Safe', 'Microwave Safe', 'Chip Resistant', 'Modern Design'],
    specifications: {
      'Material': 'Ceramic',
      'Pieces': '16 (Service for 4)',
      'Care': 'Dishwasher Safe',
      'Style': 'Modern',
    },
    status: 'published',
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    dateAdded: '2024-01-18T13:30:00Z',
    dateModified: '2024-01-18T13:30:00Z',
  },

  // Sports & Outdoors
  {
    id: '7',
    slug: 'yoga-mat-eco-friendly',
    title: 'Eco-Friendly Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat made from natural rubber with alignment guides.',
    price: 59.99,
    currency: 'USD',
    images: getProductImages(7, 3),
    category: 'sports',
    tags: ['yoga', 'eco-friendly', 'fitness'],
    rating: 4.7,
    reviewCount: 128,
    stock: 40,
    sku: 'EYM-001',
    brand: 'EcoFit',
    features: ['Natural Rubber', 'Non-slip Surface', 'Alignment Guides', 'Lightweight'],
    specifications: {
      'Material': 'Natural Rubber',
      'Thickness': '6mm',
      'Size': '72" x 24"',
      'Weight': '2.5 lbs',
    },
    status: 'published',
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    dateAdded: '2024-01-08T10:15:00Z',
    dateModified: '2024-01-08T10:15:00Z',
  },

  // Books
  {
    id: '8',
    slug: 'web-development-guide',
    title: 'Complete Web Development Guide',
    description: 'Comprehensive guide to modern web development covering React, Node.js, and more.',
    price: 39.99,
    currency: 'USD',
    images: getProductImages(8, 2),
    category: 'books',
    tags: ['programming', 'web development', 'education'],
    rating: 4.8,
    reviewCount: 76,
    stock: 100,
    sku: 'WDG-001',
    brand: 'TechBooks',
    features: ['600+ Pages', 'Code Examples', 'Online Resources', 'Beginner Friendly'],
    specifications: {
      'Pages': '624',
      'Language': 'English',
      'Format': 'Paperback',
      'Publisher': 'TechBooks',
    },
    status: 'published',
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    dateAdded: '2024-01-22T09:00:00Z',
    dateModified: '2024-01-22T09:00:00Z',
  },

  // Health & Beauty
  {
    id: '9',
    slug: 'skincare-routine-set',
    title: 'Complete Skincare Routine Set',
    description: 'Professional skincare set with cleanser, toner, serum, and moisturizer.',
    price: 89.99,
    originalPrice: 120.00,
    currency: 'USD',
    images: getProductImages(9, 4),
    category: 'health-beauty',
    tags: ['skincare', 'beauty', 'routine'],
    rating: 4.6,
    reviewCount: 142,
    stock: 35,
    sku: 'SRS-001',
    brand: 'GlowSkin',
    features: ['All Skin Types', 'Natural Ingredients', 'Dermatologist Tested', 'Complete Routine'],
    specifications: {
      'Set Includes': '4 Products',
      'Skin Type': 'All',
      'Volume': 'Full Size',
      'Cruelty Free': 'Yes',
    },
    status: 'published',
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    dateAdded: '2024-01-14T15:20:00Z',
    dateModified: '2024-01-14T15:20:00Z',
  },

  // Additional products to reach 20+
  {
    id: '10',
    slug: 'wireless-charging-pad',
    title: 'Fast Wireless Charging Pad',
    description: 'Qi-compatible wireless charging pad with LED indicator and fast charging support.',
    price: 29.99,
    currency: 'USD',
    images: getProductImages(10, 2),
    category: 'electronics',
    tags: ['wireless', 'charging', 'qi'],
    rating: 4.3,
    reviewCount: 89,
    stock: 60,
    sku: 'WCP-001',
    brand: 'ChargeTech',
    features: ['Fast Charging', 'LED Indicator', 'Anti-slip Base', 'Universal Compatible'],
    specifications: {
      'Input': '9V/2A',
      'Output': '10W',
      'Compatibility': 'Qi Devices',
      'Dimensions': '4" x 4" x 0.5"',
    },
    status: 'published',
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    dateAdded: '2024-01-11T12:30:00Z',
    dateModified: '2024-01-11T12:30:00Z',
  },

  // Draft product example
  {
    id: '11',
    slug: 'upcoming-smartwatch',
    title: 'Upcoming Smartwatch Pro',
    description: 'Next-generation smartwatch with health monitoring and GPS. Coming soon!',
    price: 399.99,
    currency: 'USD',
    images: getProductImages(11, 3),
    category: 'electronics',
    tags: ['smartwatch', 'health', 'gps'],
    rating: 0,
    reviewCount: 0,
    stock: 0,
    sku: 'SWP-002',
    brand: 'TechCorp',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Rating': 'IP68',
      'Connectivity': 'Bluetooth 5.2',
    },
    status: 'draft',
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    dateAdded: '2024-01-25T08:00:00Z',
    dateModified: '2024-01-25T08:00:00Z',
  },

  // Discontinued product example
  {
    id: '12',
    slug: 'old-tablet-model',
    title: 'Tablet Classic (Discontinued)',
    description: 'Previous generation tablet. Limited stock available.',
    price: 199.99,
    originalPrice: 299.99,
    currency: 'USD',
    images: getProductImages(12, 2),
    category: 'electronics',
    tags: ['tablet', 'discontinued', 'clearance'],
    rating: 4.1,
    reviewCount: 45,
    stock: 3,
    sku: 'TAB-OLD',
    brand: 'TechCorp',
    features: ['10" Display', '64GB Storage', 'Wi-Fi Only', 'Long Battery'],
    specifications: {
      'Display': '10.1" LCD',
      'Storage': '64GB',
      'RAM': '4GB',
      'OS': 'Android 11',
    },
    status: 'discontinued',
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    dateAdded: '2023-06-15T10:00:00Z',
    dateModified: '2024-01-20T15:30:00Z',
  },

  // Archived product example
  {
    id: '13',
    slug: 'seasonal-winter-coat',
    title: 'Winter Coat Collection 2023',
    description: 'Warm winter coat from last season. No longer active but kept for reference.',
    price: 159.99,
    originalPrice: 199.99,
    currency: 'USD',
    images: getProductImages(13, 3),
    category: 'clothing',
    tags: ['winter', 'coat', 'archive'],
    rating: 4.4,
    reviewCount: 78,
    stock: 0,
    sku: 'WC-2023',
    brand: 'WinterWear',
    features: ['Water Resistant', 'Insulated', 'Multiple Pockets', 'Hood'],
    specifications: {
      'Material': 'Polyester',
      'Insulation': 'Synthetic Fill',
      'Water Rating': 'DWR Coated',
      'Temperature': '-10°C to 5°C',
    },
    status: 'archived',
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    dateAdded: '2023-09-01T12:00:00Z',
    dateModified: '2024-01-05T09:15:00Z',
  },
];

// Function to initialize mock data in localStorage
export function initializeMockData(): void {
  // Check if data already exists
  const existingProducts = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, null);
  const existingCategories = Storage.get<Category[]>(STORAGE_KEYS.CATEGORIES, null);

  // Only initialize if data doesn't exist
  if (!existingProducts || existingProducts.length === 0) {
    Storage.set(STORAGE_KEYS.PRODUCTS, mockProducts);
    console.log('✅ Mock products initialized');
  }

  if (!existingCategories || existingCategories.length === 0) {
    Storage.set(STORAGE_KEYS.CATEGORIES, mockCategories);
    console.log('✅ Mock categories initialized');
  }

  // Initialize empty arrays for user-specific data if they don't exist
  if (!Storage.get(STORAGE_KEYS.CART)) {
    Storage.set(STORAGE_KEYS.CART, null);
  }

  if (!Storage.get(STORAGE_KEYS.FAVOURITES)) {
    Storage.set(STORAGE_KEYS.FAVOURITES, []);
  }

  if (!Storage.get(STORAGE_KEYS.ORDERS)) {
    Storage.set(STORAGE_KEYS.ORDERS, []);
  }

  console.log('🎉 Mock data initialization complete');
}

// Function to reset all data (useful for testing)
export function resetMockData(): void {
  Storage.clear();
  initializeMockData();
  console.log('🔄 Mock data reset complete');
}

// Function to add more sample products
export function addSampleProducts(count: number = 10): Product[] {
  const existingProducts = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
  const newProducts: Product[] = [];

  for (let i = 0; i < count; i++) {
    const id = (existingProducts.length + i + 1).toString();
    const categories = ['electronics', 'clothing', 'home-garden', 'sports', 'books', 'health-beauty'];
    const brands = ['TechCorp', 'StyleBrand', 'HomeStyle', 'SportsPro', 'BookPublisher', 'BeautyBrand'];
    
    const categoryIndex = i % categories.length;
    const category = categories[categoryIndex];
    const brand = brands[categoryIndex];

    const product: Product = {
      id,
      slug: `sample-product-${id}`,
      title: `Sample Product ${id}`,
      description: `This is a sample product description for product ${id}. It includes all the features and benefits.`,
      price: Math.round((Math.random() * 500 + 20) * 100) / 100,
      originalPrice: Math.random() > 0.7 ? Math.round((Math.random() * 600 + 100) * 100) / 100 : undefined,
      currency: 'USD',
      images: getProductImages(parseInt(id) + 100, Math.floor(Math.random() * 3) + 2),
      category,
      tags: [`tag${i}`, `sample`, category],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 200) + 10,
      stock: Math.floor(Math.random() * 100) + 5,
      sku: `SAM-${id.padStart(3, '0')}`,
      brand,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      specifications: {
        'Specification 1': 'Value 1',
        'Specification 2': 'Value 2',
      },
      status: 'published',
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9,
      isOnSale: Math.random() > 0.7,
      dateAdded: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      dateModified: new Date().toISOString(),
    };

    newProducts.push(product);
  }

  const allProducts = [...existingProducts, ...newProducts];
  Storage.set(STORAGE_KEYS.PRODUCTS, allProducts);

  return newProducts;
}
