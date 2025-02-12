import { MdAddToPhotos, MdDashboard } from 'react-icons/md';
import { HiClipboardDocumentList, HiDocumentChartBar } from 'react-icons/hi2';
import { FaEdit } from 'react-icons/fa';
import { FaUsersGear } from 'react-icons/fa6';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import CreateProduct from '../pages/dashboard/admin/CreateProduct';
import ManageProducts from '../pages/dashboard/admin/ManageProducts';
import ManageOrders from '../pages/dashboard/admin/ManageOrders';
import EditProfile from '../pages/dashboard/shared/EditProfile';
import ManageUsers from '../pages/dashboard/admin/ManageUsers';

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <MdDashboard />,
    element: <AdminDashboard />,
  },
  {
    name: 'Manage Users',
    path: 'manage-users',
    icon: <FaUsersGear />,
    element: <ManageUsers />,
  },
  {
    name: 'Add Product',
    path: 'add-product',
    icon: <MdAddToPhotos />,
    element: <CreateProduct />,
  },
  {
    name: 'Manage Products',
    path: 'manage-products',
    icon: <HiDocumentChartBar />,
    element: <ManageProducts />,
  },
  {
    name: 'Manage Orders',
    path: 'manage-order',
    icon: <HiClipboardDocumentList />,
    element: <ManageOrders />,
  },
  {
    name: 'Edit Profile',
    path: 'edit-profile',
    icon: <FaEdit />,
    element: <EditProfile />,
  },
];
