import { useState } from 'react';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Layout, Button, Grid, Avatar, Dropdown, Menu } from 'antd';
import Sidebar from './Sidebar';
import { Link, Outlet } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice';
import { MdOutlineNotificationsActive } from 'react-icons/md';

export type BreakpointType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  lg: boolean;
  xl: boolean;
};

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const screens = useBreakpoint() as BreakpointType;
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu
      style={{
        width: '300px',
        background: '#001529',
        marginTop: '12px',
        padding: '25px 20px',
      }}
    >
      <div className="text-white text-center mb-5">
        <Avatar
          style={{
            background: '#3F90FC',
            fontSize: '28px',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
          }}
        >
          {user?.name.slice(0, 1)}
        </Avatar>
        <h2 className="mt-3 text-lg font-medium">{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
      <Menu.Item
        key="1"
        icon={<FaUserEdit size={20} />}
        style={{ background: '#3F90FC', color: 'white' }}
      >
        <Link to={`/${user?.role}/edit-profile`}>Edit Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        icon={<LogoutOutlined />}
        style={{ background: '#FF4D4F', color: 'white' }}
        onClick={handleLogout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        screens={screens}
      />
      {/* Main Layout */}
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: '#001529',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {collapsed && !screens.lg && (
              <Button
                type="text"
                icon={
                  <MenuOutlined style={{ fontSize: '18px', color: 'white' }} />
                }
                onClick={() => setCollapsed(false)}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative cursor-pointer mr-5 lg:block hidden">
              <MdOutlineNotificationsActive size={24} className="text-white" />
              <span className="absolute -top-2 -right-2 bg-[#FF4D4F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {0}
              </span>
            </div>
            <Dropdown
              overlay={menu}
              trigger={['click']}
              placement="bottomRight"
            >
              <Avatar
                style={{
                  background: '#3F90FC',
                  fontSize: '20px',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                }}
              >
                {user?.name.slice(0, 1)}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
