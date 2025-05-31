import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, selectFilteredProducts, setSearchTerm, setCategoryFilter, setSortBy } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { fetchCategories } from '../features/products/productAPI'

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector(state => state.products.status);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(loadProducts());
    
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    
    loadCategories();
  }, [dispatch]);

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
  };

  const handleSortChange = (sortOption) => {
    dispatch(setSortBy(sortOption));
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-8 text-red-500">Error loading products</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <SearchBar onSearch={handleSearch} />
        <Filters 
          categories={categories} 
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default HomePage;