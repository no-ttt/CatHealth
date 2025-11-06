import React, { useState, useEffect } from 'react';
import { Menu, X, Droplet, Moon, Sun, User, LogOut } from 'lucide-react';
import { Link } from './Navigation';
import { User as UserType } from '../App';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  currentUser: UserType | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  currentPage, 
  currentUser,
  onNavigate,
  onLogout 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNavigation('home')}
          >
            <Droplet size={32} className="text-red-600 dark:text-red-500 mr-2" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Cat<span className="text-red-600 dark:text-red-500">Health</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#"
              label="首頁"
              active={currentPage === 'home'}
              onClick={() => handleNavigation('home')}
            />
            <Link
              href="#"
              label="關於我們"
              active={currentPage === 'about'}
              onClick={() => handleNavigation('about')}
            />
            <Link
              href="#"
              label="協會願景"
              active={currentPage === 'vision'}
              onClick={() => handleNavigation('vision')}
            />
            <Link
              href="#"
              label="捐血資訊"
              active={currentPage === 'donate'}
              onClick={() => handleNavigation('donate')}
            />
            <Link
              href="#"
              label="據點查詢"
              active={currentPage === 'locations'}
              onClick={() => handleNavigation('locations')}
            />
            <Link
              href="#"
              label="聯絡我們"
              active={currentPage === 'contact'}
              onClick={() => handleNavigation('contact')}
            />
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="切換深色模式"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <User size={20} className="text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{currentUser.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                    <button
                      onClick={() => {
                        handleNavigation(currentUser.type === 'owner' ? 'member-dashboard' : 'vet-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      會員中心
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      登出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('login')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                登入
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[30rem] py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4 pb-4">
          <Link
            href="#"
            label="首頁"
            mobile
            active={currentPage === 'home'}
            onClick={() => handleNavigation('home')}
          />
          <Link
            href="#"
            label="關於我們"
            mobile
            active={currentPage === 'about'}
            onClick={() => handleNavigation('about')}
          />
          <Link
            href="#"
            label="協會願景"
            mobile
            active={currentPage === 'vision'}
            onClick={() => handleNavigation('vision')}
          />
          <Link
            href="#"
            label="捐血資訊"
            mobile
            active={currentPage === 'donate'}
            onClick={() => handleNavigation('donate')}
          />
          <Link
            href="#"
            label="據點查詢"
            mobile
            active={currentPage === 'locations'}
            onClick={() => handleNavigation('locations')}
          />
          <Link
            href="#"
            label="聯絡我們"
            mobile
            active={currentPage === 'contact'}
            onClick={() => handleNavigation('contact')}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;