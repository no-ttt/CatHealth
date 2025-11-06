import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Vision from './pages/Vision';
import Donate from './pages/Donate';
import PetRegistration from './pages/PetRegistration';
import VetRegistration from './pages/VetRegistration';
import Login from './pages/Login';
import MemberDashboard from './pages/MemberDashboard';
import VetDashboard from './pages/VetDashboard';
import BloodRequest from './pages/BloodRequest';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import Footer from './components/Footer';

export interface User {
  id: string;
  type: 'owner' | 'vet';
  name: string;
  email: string;
  phone: string;
  address?: string;
  idNumber?: string;
  hospitalName?: string;
  isLoggedIn: boolean;
  isPaid?: boolean; // 新增付費狀態
}

export interface Pet {
  id: string;
  name: string;
  birthday: string;
  chipNumber: string;
  bloodType: string;
  healthStatus: string;
  lastCheckup: string;
  isDonor: boolean;
  ownerId: string;
  breed?: string;
  weight?: number;
  gender?: string;
}

export interface HealthReport {
  id: string;
  petId: string;
  date: string;
  type: string;
  status: string;
  details: string;
  downloadUrl?: string;
}

export interface DNAReport {
  id: string;
  petId: string;
  date: string;
  bloodType: string;
  geneticMarkers: string[];
  healthRisks: string[];
  downloadUrl?: string;
}

export interface BloodRequestData {
  id: string;
  petId: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  surgeryDate: string;
  hospitalName: string;
  hospitalAddress: string;
  bloodType: string;
  bloodAmount: number;
  diagnosis: string;
  status: 'pending' | 'approved' | 'matched' | 'completed';
  createdAt: string;
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check user preference from localStorage or system preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);

    // Check for logged in user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Set current page based on URL path
    const path = window.location.pathname.substring(1) || 'home';
    setCurrentPage(path);

    // Add event listener for navigation
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  useEffect(() => {
    // Update document class and localStorage when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleNavigation = () => {
    const path = window.location.pathname.substring(1) || 'home';
    setCurrentPage(path);
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path === 'home' ? '/' : `/${path}`);
    setCurrentPage(path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user.type === 'owner') {
      navigate('member-dashboard');
    } else {
      navigate('vet-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'about':
        return <About />;
      case 'vision':
        return <Vision />;
      case 'donate':
        return <Donate />;
      case 'pet-registration':
        return <PetRegistration onNavigate={navigate} />;
      case 'vet-registration':
        return <VetRegistration onNavigate={navigate} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={navigate} />;
      case 'member-dashboard':
        return currentUser?.type === 'owner' ?
          <MemberDashboard user={currentUser} onNavigate={navigate} /> :
          <Login onLogin={handleLogin} onNavigate={navigate} />;
      case 'vet-dashboard':
        return currentUser?.type === 'vet' ?
          <VetDashboard user={currentUser} onNavigate={navigate} /> :
          <Login onLogin={handleLogin} onNavigate={navigate} />;
      case 'blood-request':
        return currentUser?.type === 'owner' ?
          <BloodRequest user={currentUser} onNavigate={navigate} /> :
          <Login onLogin={handleLogin} onNavigate={navigate} />;
      case 'locations':
        return <Locations />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={navigate} />;
    }
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
      {renderPage()}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;