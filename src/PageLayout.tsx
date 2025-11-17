import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { User } from './types';

interface PageLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, currentPage }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 處理共用狀態和邏輯
  useEffect(() => {
    // 處理深色模式
    const isDark =
      localStorage.getItem('darkMode') === 'true' ||
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);

    // 處理登入使用者
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // MPA 的導航是直接跳轉頁面，支援 base path
  const navigate = (path: string) => {
    const base = import.meta.env.BASE_URL || '/CatHealth/';
    const targetPath = path === 'home' 
      ? `${base}index.html` 
      : `${base}pages/${path}/index.html`;
    window.location.href = targetPath;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('home'); // 或跳轉到登入頁
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        currentUser={currentUser}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
      <main>{children}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default PageLayout;