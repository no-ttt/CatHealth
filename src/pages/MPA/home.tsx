import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import PageLayout from '../../PageLayout';
import HomePage from '../Home';
import '../../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout currentPage="home">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 在 MPA 模式下，Home 元件需要自己處理導航 */}
        <HomePage onNavigate={(path) => { 
          const base = import.meta.env.BASE_URL || '/CatHealth/';
          const targetPath = path === 'home' 
            ? `${base}index.html` 
            : `${base}pages/${path}/index.html`;
          window.location.href = targetPath;
        }} />
      </motion.main>
    </PageLayout>
  </React.StrictMode>
);