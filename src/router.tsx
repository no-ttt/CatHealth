import { createBrowserRouter } from 'react-router-dom';
import App from './App';

// Import your page components here.
// For example:
// import LoginPage from './pages/login/LoginPage';
// import MemberDashboard from './pages/member-dashboard/MemberDashboard';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      // You can define children routes here if App is a layout component
      children: [
        // Example of a route
        // {
        //   path: 'login',
        //   element: <LoginPage />,
        // },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default router;