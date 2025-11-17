import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import PageLayout from '../../PageLayout';
import LoginPage from '../Login';
import { User } from '../../types';
import '../../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout currentPage="login">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoginPage 
          onLogin={(user: User) => {
            // 保存用戶到 localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            // 根據用戶類型導航到對應的儀表板
            const base = import.meta.env.BASE_URL || '/CatHealth/';
            const targetPath = user.type === 'owner'
              ? `${base}pages/member-dashboard/index.html`
              : `${base}pages/vet-dashboard/index.html`;
            window.location.href = targetPath;
          }}
          onNavigate={(path: string) => {
            const base = import.meta.env.BASE_URL || '/CatHealth/';
            const targetPath = path === 'home' 
              ? `${base}index.html` 
              : `${base}pages/${path}/index.html`;
            window.location.href = targetPath;
          }}
        />
      </motion.main>
    </PageLayout>
  </React.StrictMode>
); 