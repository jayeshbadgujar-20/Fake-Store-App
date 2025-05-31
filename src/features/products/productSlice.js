import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchProducts } from './productAPI';

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    categoryFilter: 'all',
    sortBy: 'none',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setCategoryFilter, setSortBy } = productsSlice.actions;

export const selectFilteredProducts = createSelector(
  [(state) => state.products.items, 
   (state) => state.products.searchTerm,
   (state) => state.products.categoryFilter,
   (state) => state.products.sortBy],
  (products, searchTerm, categoryFilter, sortBy) => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => 
        product.category === categoryFilter
      );
    }
    
    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    return filtered;
  }
);

export default productsSlice.reducer;