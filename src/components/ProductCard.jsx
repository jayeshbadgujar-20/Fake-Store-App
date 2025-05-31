import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesPage'
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-contain p-4 bg-white"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
          </Link>
          <button 
            onClick={handleFavoriteClick}
            className="text-2xl focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <span className="ml-2 text-sm text-gray-500">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;