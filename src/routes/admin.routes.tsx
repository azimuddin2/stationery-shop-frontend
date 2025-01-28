import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import CreateProduct from '../pages/dashboard/admin/CreateProduct';

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'Add Product',
    path: 'add-product',
    element: <CreateProduct />,
  },
];
