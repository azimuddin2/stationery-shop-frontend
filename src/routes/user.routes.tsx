import { MdDashboard, MdRateReview } from 'react-icons/md';
import {
  HiClipboardDocumentList,
  HiDocumentCurrencyDollar,
} from 'react-icons/hi2';
import OrdersList from '../pages/dashboard/user/OrdersList';
import PaymentHistory from '../pages/dashboard/user/PaymentHistory';
import UserDashboard from '../pages/dashboard/user/UserDashboard';
import AddReview from '../pages/dashboard/user/AddReview';
import { FaEdit } from 'react-icons/fa';
import EditProfile from '../pages/dashboard/shared/EditProfile';

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <MdDashboard />,
    element: <UserDashboard />,
  },
  {
    name: 'My Order',
    path: 'order-view',
    icon: <HiClipboardDocumentList />,
    element: <OrdersList />,
  },
  {
    name: 'Payment History',
    path: 'payment-history',
    icon: <HiDocumentCurrencyDollar />,
    element: <PaymentHistory />,
  },
  {
    name: 'Add Review',
    path: 'add-review',
    icon: <MdRateReview />,
    element: <AddReview />,
  },
  {
    name: 'Edit Profile',
    path: 'edit-profile',
    icon: <FaEdit />,
    element: <EditProfile />,
  },
];
