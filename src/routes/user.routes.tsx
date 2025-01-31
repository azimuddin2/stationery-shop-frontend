import OrdersList from '../pages/dashboard/user/OrdersList';
import UserDashboard from '../pages/dashboard/user/UserDashboard';

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'My Order',
    path: 'order-list',
    element: <OrdersList />,
  },
];
