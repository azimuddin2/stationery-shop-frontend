import CountUp from 'react-countup';
import customerImg from '../../../assets/images/customers.png';
import revenueImg from '../../../assets/images/revenue.png';
import productImg from '../../../assets/images/products.png';
import orderImg from '../../../assets/images/orders.png';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';

const AdminDashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  const data = [
    {
      name: 'Jan',
      value: 5000,
    },
    {
      name: 'Feb',
      value: 3000,
    },
    {
      name: 'Mar',
      value: 6000,
    },
    {
      name: 'Apr',
      value: 5500,
    },
    {
      name: 'May',
      value: 3000,
    },
    {
      name: 'Jun',
      value: 8000,
    },
    {
      name: 'Jul',
      value: 5000,
    },
    {
      name: 'Aug',
      value: 10000,
    },
    {
      name: 'Sep',
      value: 6000,
    },
    {
      name: 'Oct',
      value: 3500,
    },
    {
      name: 'Nv',
      value: 8500,
    },
    {
      name: 'Dec',
      value: 2500,
    },
  ];

  return (
    <div className="m-8">
      <div className="flex lg:justify-start justify-center">
        <h1 className="text-xl lg:text-2xl text-secondary font-medium font-family">
          Hi Welcome {user?.name}! 👋
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 my-6">
        <div className="lg:flex items-center rounded-lg bg-white p-10">
          <figure className="text-center">
            <img src={customerImg} alt="Customers" className="w-16 mx-auto" />
          </figure>
          <div className="pt-2 lg:pt-5 lg:ml-4 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-secondary">
              <CountUp end={1000} duration={5} />
            </h2>
            <p className="text-accent text-center text-xl font-medium">
              Customers
            </p>
          </div>
        </div>

        <div className="lg:flex items-center rounded-lg bg-white p-10">
          <figure className="text-center">
            <img src={revenueImg} alt="Revenue" className="w-16 mx-auto" />
          </figure>
          <div className="pt-2 lg:pt-5 lg:ml-4 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-secondary">
              $<CountUp end={50000} duration={5} />
            </h2>
            <p className="text-accent text-center text-xl font-medium">
              Revenue
            </p>
          </div>
        </div>

        <div className="lg:flex items-center rounded-lg bg-white p-10">
          <figure className="text-center">
            <img src={productImg} alt="Products" className="w-16 mx-auto" />
          </figure>
          <div className="pt-2 lg:pt-5 lg:ml-4 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-secondary">
              <CountUp end={200} duration={5} />
            </h2>
            <p className="text-accent text-center text-xl font-medium">
              Products
            </p>
          </div>
        </div>

        <div className="lg:flex items-center rounded-lg bg-white p-10">
          <figure className="text-center">
            <img src={orderImg} alt="Orders" className="w-16 mx-auto" />
          </figure>
          <div className="pt-2 lg:pt-5 lg:ml-4 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-secondary">
              <CountUp end={700} duration={5} />
            </h2>
            <p className="text-accent text-center text-xl font-medium">
              Orders
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-5">
          <div className="border-b border-gray-200">
            <h1 className="text-xl font-family text-secondary font-semibold mb-1 ml-1">
              Overview 2025 Year
            </h1>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              height={300}
              data={data}
              margin={{
                top: 25,
                right: 0,
                left: -10,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="value"
                fill="#3F90FC"
                background={{ fill: '#eee' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg p-5">
          <div className="border-b border-gray-200">
            <h1 className="text-xl font-family text-secondary font-semibold mb-1 ml-1">
              Overview 12 Months
            </h1>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={300}>
              <Tooltip />
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#3F90FC"
              />
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
