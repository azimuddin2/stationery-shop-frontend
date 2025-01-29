import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import CreateProduct from '../pages/dashboard/admin/CreateProduct';
import ManageProducts from '../pages/dashboard/admin/ManageProducts';

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
  {
    name: 'Manage Products',
    path: 'manage-products',
    element: <ManageProducts />,
  },
];
