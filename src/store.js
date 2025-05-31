import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productSlice';
import favoritesReducer from './features/favorites/favoritesPage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
  },
});