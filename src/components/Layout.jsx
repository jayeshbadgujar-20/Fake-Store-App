import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const favorites = useSelector(state => state.favorites.items);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            FakeStore
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/favorites" className="relative hover:text-blue-600">
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-100 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} FakeStore - All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default Layout;