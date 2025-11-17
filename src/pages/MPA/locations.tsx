import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import PageLayout from '../../PageLayout';
import LocationsPage from '../Locations';
import '../../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout currentPage="locations">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LocationsPage />
      </motion.main>
    </PageLayout>
  </React.StrictMode>
); 