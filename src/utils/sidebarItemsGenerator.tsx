import { NavLink } from 'react-router-dom';
import { TSidebarItem, TUserPath } from '../types';

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink to={`/${role}/${item.path}`} className="flex items-center">
            <span className="text-lg mr-1">{item.icon}</span>
            <span style={{ fontSize: '16px' }}>{item.name}</span>
          </NavLink>
        ),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
