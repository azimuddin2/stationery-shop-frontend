import OrdersList from '../pages/dashboard/user/OrdersList';
import PaymentHistory from '../pages/dashboard/user/PaymentHistory';
import UserDashboard from '../pages/dashboard/user/UserDashboard';

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'My Order',
    path: 'order-view',
    element: <OrdersList />,
  },
  {
    name: 'Payment History',
    path: 'payment-history',
    element: <PaymentHistory />,
  },
];
