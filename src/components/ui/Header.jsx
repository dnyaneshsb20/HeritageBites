import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartItemCount] = useState(3);
  const [isAuthenticated] = useState(true);
  const location = useLocation();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const navigationItems = [
    { 
      path: '/recipe-discovery-dashboard', 
      label: 'Discover', 
      icon: 'Search',
      description: 'Explore authentic recipes'
    },
    { 
      path: '/ingredient-marketplace', 
      label: 'Marketplace', 
      icon: 'ShoppingBag',
      description: 'Source authentic ingredients'
    },
    { 
      path: '/user-profile-health-goals', 
      label: 'Profile', 
      icon: 'User',
      description: 'Manage your preferences'
    },
    { 
      path: '/recipe-submission-management', 
      label: 'Contribute', 
      icon: 'Plus',
      description: 'Share your recipes'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
    setTimeout(() => searchRef?.current?.focus(), 100);
  };

  const handleSearchCollapse = () => {
    if (!searchQuery?.trim()) {
      setIsSearchExpanded(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-100 bg-background border-b border-border shadow-warm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/recipe-discovery-dashboard" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="ChefHat" size={20} color="white" />
          </div>
          <span className="text-xl font-heading font-semibold text-foreground">
            DishCover
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Search, Cart, and User Menu */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            {!isSearchExpanded ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchExpand}
                className="lg:hidden"
              >
                <Icon name="Search" size={20} />
              </Button>
            ) : (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative">
                  <Input
                    ref={searchRef}
                    type="search"
                    placeholder="Search recipes, ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    onBlur={handleSearchCollapse}
                    className="w-64 lg:w-80 pl-10"
                  />
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                </div>
              </form>
            )}
            
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:block">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search recipes, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-80 pl-10"
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>
            </form>
          </div>

          {/* Shopping Cart */}
          <Link to="/ingredient-marketplace" className="relative">
            <Button variant="ghost" size="icon">
              <Icon name="ShoppingCart" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-caption font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleUserMenu}
                  className="rounded-full"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-warm-lg z-50">
                    <div className="p-3 border-b border-border">
                      <p className="font-body font-medium text-foreground">John Doe</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/user-profile-health-goals"
                        className="flex items-center space-x-3 px-3 py-2 text-sm font-body hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="User" size={16} />
                        <span>Profile & Goals</span>
                      </Link>
                      <Link
                        to="/recipe-submission-management"
                        className="flex items-center space-x-3 px-3 py-2 text-sm font-body hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="BookOpen" size={16} />
                        <span>My Recipes</span>
                      </Link>
                      <Link
                        to="/ingredient-marketplace"
                        className="flex items-center space-x-3 px-3 py-2 text-sm font-body hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="Package" size={16} />
                        <span>Order History</span>
                      </Link>
                      <Link
                        to="/admin-recipe-management"
                        className="flex items-center space-x-3 px-3 py-2 text-sm font-body hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="Settings" size={16} />
                        <span>Admin Panel</span>
                      </Link>
                    </div>
                    <div className="border-t border-border py-2">
                      <button
                        className="flex items-center space-x-3 px-3 py-2 text-sm font-body text-destructive hover:bg-muted transition-colors w-full text-left"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          console.log('Logging out...');
                          navigate("/");
                        }}
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <nav className="lg:hidden border-t border-border bg-background">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActiveRoute(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-caption font-medium">{item?.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;