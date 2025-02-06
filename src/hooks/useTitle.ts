import { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - Stationery Shop`;
  }, [title]);
};

export default useTitle;
