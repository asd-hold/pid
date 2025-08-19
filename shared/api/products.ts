import { Product, ProductSearchParams, ProductsResponse, ProductFilter } from '../../entities';
import { Storage, STORAGE_KEYS } from '../lib/storage';

// Mock delay to simulate API calls
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export class ProductsAPI {
  static async getProducts(params: ProductSearchParams = {}): Promise<ProductsResponse> {
    await delay();
    
    const allProducts = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    let filteredProducts = [...allProducts];

    // Apply search query
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (params.filters) {
      filteredProducts = this.applyFilters(filteredProducts, params.filters);
    }

    // Apply sorting
    if (params.sort) {
      filteredProducts = this.applySorting(filteredProducts, params.sort);
    }

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
      hasMore: endIndex < filteredProducts.length,
    };
  }

  static async getProduct(id: string): Promise<Product | null> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    return products.find(product => product.id === id) || null;
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    return products.find(product => product.slug === slug) || null;
  }

  static async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    return products.filter(product => product.isFeatured).slice(0, limit);
  }

  static async getNewProducts(limit: number = 8): Promise<Product[]> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    return products.filter(product => product.isNew).slice(0, limit);
  }

  static async getSaleProducts(limit: number = 8): Promise<Product[]> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    return products.filter(product => product.isOnSale).slice(0, limit);
  }

  static async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) return [];

    // Find products in the same category excluding current product
    const relatedProducts = products
      .filter(product => 
        product.id !== productId && 
        product.category === currentProduct.category
      )
      .slice(0, limit);

    return relatedProducts;
  }

  static async createProduct(product: Omit<Product, 'id' | 'dateAdded' | 'dateModified'>): Promise<Product> {
    await delay();

    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const newProduct: Product = {
      ...product,
      status: product.status || 'draft',
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };

    products.push(newProduct);
    Storage.set(STORAGE_KEYS.PRODUCTS, products);

    return newProduct;
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const index = products.findIndex(product => product.id === id);

    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updates,
      dateModified: new Date().toISOString(),
    };

    Storage.set(STORAGE_KEYS.PRODUCTS, products);
    return products[index];
  }

  static async deleteProduct(id: string): Promise<boolean> {
    await delay();
    
    const products = Storage.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const filteredProducts = products.filter(product => product.id !== id);

    if (filteredProducts.length === products.length) {
      return false; // Product not found
    }

    Storage.set(STORAGE_KEYS.PRODUCTS, filteredProducts);
    return true;
  }

  private static applyFilters(products: Product[], filters: ProductFilter): Product[] {
    return products.filter(product => {
      // Category filtering
      if (filters.category && product.category !== filters.category) return false;

      // Subcategory filtering
      if (filters.subcategory && product.subcategory !== filters.subcategory) return false;

      // Price filtering
      if (filters.priceMin !== undefined && product.price < filters.priceMin) return false;
      if (filters.priceMax !== undefined && product.price > filters.priceMax) return false;

      // Rating filtering
      if (filters.rating !== undefined && product.rating < filters.rating) return false;

      // Brand filtering
      if (filters.brand && product.brand !== filters.brand) return false;

      // Special product types
      if (filters.isOnSale !== undefined && product.isOnSale !== filters.isOnSale) return false;
      if (filters.isNew !== undefined && product.isNew !== filters.isNew) return false;
      if (filters.isFeatured !== undefined && product.isFeatured !== filters.isFeatured) return false;

      // Stock filtering
      if (filters.inStock !== undefined) {
        const inStock = product.stock > 0;
        if (inStock !== filters.inStock) return false;
      }

      // Status filtering
      if (filters.status && (product.status || 'published') !== filters.status) return false;

      // Tags filtering
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag =>
          product.tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }

  private static applySorting(products: Product[], sort: { field: string; order: 'asc' | 'desc' }): Product[] {
    return products.sort((a, b) => {
      let aValue: any = a[sort.field as keyof Product];
      let bValue: any = b[sort.field as keyof Product];

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
