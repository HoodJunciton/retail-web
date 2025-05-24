import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl?: string;
}

// Define the state type
interface ProductState {
  products: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  products: [
    {
      id: '1',
      name: 'Premium T-Shirt',
      description: 'High-quality cotton t-shirt available in multiple colors',
      price: 29.99,
      category: 'Clothing',
      stockQuantity: 150,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones with 20-hour battery life',
      price: 129.99,
      category: 'Electronics',
      stockQuantity: 75,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      name: 'Organic Coffee Beans',
      description: 'Fair-trade organic coffee beans, 1lb bag',
      price: 14.99,
      category: 'Food & Beverage',
      stockQuantity: 200,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '4',
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 199.99,
      category: 'Electronics',
      stockQuantity: 45,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ],
  loading: 'idle',
  error: null
};

// Async thunk for fetching products (mock implementation)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data
      return initialState.products;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct = {
        ...action.payload,
        id: Date.now().toString() // Simple ID generation for demo
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    updateStock: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.stockQuantity = quantity;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { addProduct, updateProduct, deleteProduct, updateStock } = productSlice.actions;
export default productSlice.reducer;
