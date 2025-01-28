import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/home/Home';
import DashboardLayout from '../components/layout/DashboardLayout';
import { routesGenerator } from '../utils/routesGenerator';
import { adminPaths } from './admin.routes';
import { userPaths } from './user.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: routesGenerator(adminPaths),
  },
  {
    path: '/user',
    element: <DashboardLayout />,
    children: routesGenerator(userPaths),
  },
]);

export default router;
