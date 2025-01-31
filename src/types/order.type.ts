export type TItem = {
  product: string;
  name: string;
  price: number;
  quantity: number;
  _id: string;
};

export type TOrder = {
  _id: string;
  email: string;
  items: TItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
