import { ReactNode } from 'react';

type TButtonProps = {
  children: ReactNode;
};

const CustomButton = ({ children }: TButtonProps) => {
  return (
    <button className="bg-[#3F90FC] hover:bg-[#1677ff] text-white cursor-pointer px-8 py-2 rounded-sm flex justify-center items-center">
      {children}
    </button>
  );
};

export default CustomButton;
