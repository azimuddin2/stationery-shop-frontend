export type TRegisterUser = {
  name: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  address?: string;
  image?: string;
};
