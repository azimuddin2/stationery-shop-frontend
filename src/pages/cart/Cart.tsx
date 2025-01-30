import { Button, InputNumber, Table } from 'antd';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../../redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { usePlaceOrderMutation } from '../../redux/features/order/orderApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectCartTotal);
  const user = useAppSelector(selectCurrentUser);

  const [placeOrder] = usePlaceOrderMutation();
  const navigate = useNavigate();

  const handleOrder = async () => {
    const toastId = toast.loading('Creating...');

    try {
      const orderData = {
        email: user?.email,
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: totalAmount,
        status: 'Pending',
      };

      const res = await placeOrder(orderData).unwrap();

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.message, { id: toastId, duration: 2000 });
        navigate(`/${user?.role}/dashboard`);
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_: any, record: any) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={record.quantity}
          onChange={(value) =>
            dispatch(updateQuantity({ id: record._id, quantity: value || 1 }))
          }
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (_: any, record: any) => `$${record.price * record.quantity}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button danger onClick={() => dispatch(removeFromCart(record._id))}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center">Shopping Cart</h1>
      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
      <h2 className="text-xl font-bold mt-5">
        Total: ${totalAmount.toFixed(2)}
      </h2>
      <Button
        disabled={cartItems.length === 0}
        type="primary"
        className="mt-3"
        onClick={handleOrder}
      >
        Order Now
      </Button>
    </div>
  );
};

export default Cart;
