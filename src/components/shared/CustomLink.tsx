import { ReactNode } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

type TCustomLinkProps = {
  children: ReactNode;
  to: string;
};

const CustomLink = ({ children, to, ...props }: TCustomLinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className="mb-1 lg:mb-0"
      style={{
        color: match ? '#181818' : '#676767',
        borderBottom: match ? '3px solid #3F90FC' : 'none',
        fontWeight: match ? '600' : '500',
        padding: '5px',
      }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
