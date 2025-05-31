import productsReducer, { setSearchTerm, setCategoryFilter, setSortBy, loadProducts } from './productSlice';
import { fetchProducts } from './productsAPI';

jest.mock('./productsAPI');

describe('products slice', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    categoryFilter: 'all',
    sortBy: 'none',
  };

  it('should handle initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSearchTerm', () => {
    const actual = productsReducer(initialState, setSearchTerm('test'));
    expect(actual.searchTerm).toEqual('test');
  });

  it('should handle setCategoryFilter', () => {
    const actual = productsReducer(initialState, setCategoryFilter('electronics'));
    expect(actual.categoryFilter).toEqual('electronics');
  });

  it('should handle setSortBy', () => {
    const actual = productsReducer(initialState, setSortBy('price_asc'));
    expect(actual.sortBy).toEqual('price_asc');
  });

  describe('loadProducts async thunk', () => {
    it('should handle pending', () => {
      const action = { type: loadProducts.pending.type };
      const state = productsReducer(initialState, action);
      expect(state.status).toEqual('loading');
    });

    it('should handle fulfilled', () => {
      const mockProducts = [{ id: 1, title: 'Test Product' }];
      const action = { type: loadProducts.fulfilled.type, payload: mockProducts };
      const state = productsReducer(initialState, action);
      expect(state.status).toEqual('succeeded');
      expect(state.items).toEqual(mockProducts);
    });

    it('should handle rejected', () => {
      const action = { type: loadProducts.rejected.type, error: { message: 'Failed' } };
      const state = productsReducer(initialState, action);
      expect(state.status).toEqual('failed');
      expect(state.error).toEqual('Failed');
    });
  });
});