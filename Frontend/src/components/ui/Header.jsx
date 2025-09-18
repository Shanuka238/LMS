import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import {logout} from '../../utils/api';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'student';

  const navigationItems = [
    {
      label: 'Home',
      path: '/landing-page',
      icon: 'Home',
      roles: ['student', 'teacher', 'admin']
    },
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'LayoutDashboard',
      roles: ['student']
    },
    {
      label: 'Courses',
      path: '/course-catalog',
      icon: 'BookOpen',
      roles: ['student', 'teacher', 'admin']
    },
    {
      label: 'Management',
      path: '/course-management',
      icon: 'Settings',
      roles: ['teacher', 'admin']
    },
    {
      label: 'About Us',
      path: '/about-us',
      icon: 'Info',
      roles: ['student', 'teacher', 'admin']
    },
    {
      label: 'Login',
      path: '/login',
      icon: 'login',
      roles: ['student', 'teacher', 'admin']
    },
    {
      label: 'Register',
      path: '/register',
      icon: 'Register',
      roles: ['student', 'teacher', 'admin']
    }
  ];

  // Only show nav items if user is logged in (has a role)
  const isLoggedIn = !!user && !!user.role;
  const filteredNavItems = navigationItems?.filter(item =>
    item?.label !== 'Dashboard' || (item?.label === 'Dashboard' && isLoggedIn && userRole === 'student')
  ).filter(item => item?.roles?.includes(userRole));


  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('user');
    navigate('/login');
  }

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="relative h-16 px-4 lg:px-6 flex items-center justify-center">
        {/* Logo */}
        <div className="absolute left-5 top-0 flex items-center h-full">
          <button
            onClick={() => handleNavigation('/landing-page')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">EduPlatform</span>
          </button>
        </div>

        {/* Login & Register - right corner */}
        <div className="hidden lg:flex items-center space-x-1 absolute right-0 h-full">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
            >
              <Icon name="Logout" size={18} />
              <span>Logout</span>
            </button>
          ) : (
            filteredNavItems
              .filter(item => item.label === 'Login' || item.label === 'Register')
              .map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))
          )}
        </div>

        {/* Desktop Navigation - center */}
        <nav className="hidden lg:flex items-center space-x-1 justify-center mx-auto">
          {filteredNavItems?.filter(item => item.label !== 'Login' && item.label !== 'Register').map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button Only */}
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-in">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile User Profile removed */}

            {/* Mobile Navigation Items */}
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ top: '100%' }}
        />
      )}
    </header>
  );
};

export default Header;