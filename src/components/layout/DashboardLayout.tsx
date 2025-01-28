import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Layout, Button, Grid } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

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
          <div>
            <FaUserCircle className="text-3xl text-white" />
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
