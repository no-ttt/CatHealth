import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import PageLayout from '../../PageLayout';
import ContactPage from '../Contact';
import '../../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout currentPage="contact">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContactPage />
      </motion.main>
    </PageLayout>
  </React.StrictMode>
);