import { Button, Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { userPaths } from '../../routes/user.routes';
import logo from '../../assets/images/light-logo.png';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BreakpointType } from './DashboardLayout';
import '../../styles/Sidebar.css';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';

const { Sider } = Layout;

type ChildComponentProps = {
  collapsed: boolean;
  setCollapsed: Function;
  screens: BreakpointType;
};

const userRole = {
  ADMIN: 'admin',
  USER: 'user',
};

const Sidebar = ({ collapsed, setCollapsed, screens }: ChildComponentProps) => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider
      className="min-h-screen"
      breakpoint="md"
      collapsedWidth="0"
      collapsible
      collapsed={collapsed}
      onBreakpoint={(broken) => setCollapsed(broken)}
      trigger={null}
    >
      {!screens.lg && (
        <div
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            background: '#001529',
          }}
        >
          <Button
            type="text"
            icon={
              <CloseOutlined style={{ color: 'white', fontSize: '18px' }} />
            }
            onClick={() => setCollapsed(true)}
          />
        </div>
      )}
      <div className="flex justify-center items-center my-5">
        <Link to={'/'}>
          <img className="h-16" src={logo} alt="" />
        </Link>
      </div>
      <Menu
        items={sidebarItems}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
      />
    </Sider>
  );
};

export default Sidebar;
