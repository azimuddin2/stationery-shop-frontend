import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/home/Home';
import DashboardLayout from '../components/layout/DashboardLayout';
import { routesGenerator } from '../utils/routesGenerator';
import { adminPaths } from './admin.routes';
import { userPaths } from './user.routes';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Products from '../pages/products/Products';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/cart/Cart';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AboutUs from '../pages/about/AboutUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(userPaths),
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

export default router;
