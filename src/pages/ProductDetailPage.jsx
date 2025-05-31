import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesPage';
import { fetchProductById } from '../features/products/productAPI';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isFavorite = favorites.some(item => item.id === id);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(id);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full max-h-96 object-contain bg-white p-8 border rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <button 
              onClick={handleFavoriteClick}
              className="text-3xl focus:outline-none"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div className="mb-4">
            <span className="text-3xl font-bold">${product.price}</span>
            <span className="ml-2 text-sm text-gray-500">{product.category}</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">
                {'★'.repeat(Math.round(product.rating.rate))}
                {'☆'.repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span className="ml-2 text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;