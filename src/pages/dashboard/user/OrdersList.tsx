import { Button, Card, Table, TableColumnsType, Tag } from 'antd';
import {
  useDeleteOrderMutation,
  useGetOrdersByEmailQuery,
} from '../../../redux/features/order/orderApi';
import { TOrder } from '../../../types/order.type';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { useEffect, useState } from 'react';
import PaymentModal from './PaymentModal';
import Swal from 'sweetalert2';

type TTableData = Pick<
  TOrder,
  'email' | 'totalPrice' | 'status' | 'paid' | 'transactionId'
>;

const OrdersList = () => {
  const user = useAppSelector(selectCurrentUser);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const {
    data: ordersData,
    isFetching,
    refetch,
  } = useGetOrdersByEmailQuery(email!, { skip: !email });

  const tableData = ordersData?.map(
    ({ _id, email, totalPrice, status, paid, transactionId }) => ({
      key: _id,
      _id,
      email,
      totalPrice,
      status,
      paid,
      transactionId,
    }),
  );

  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async (item: TOrder) => {
    console.log(item);
    Swal.fire({
      title: 'Are you sure?',
      text: `Email - ${item.email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F90FC',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrder(item._id).unwrap();
          Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: number) => `$${text.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'Pending'
            ? 'orange'
            : status === 'Shipped'
              ? 'green'
              : 'blue';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <div>
            {item.paid === true && item.transactionId ? (
              <>
                <p className="mb-1">{item.transactionId}</p>
                <Tag color="green">Payment Completed</Tag>
              </>
            ) : (
              <>
                <PaymentModal paymentInfo={item} refetch={refetch} />
                <Button
                  danger
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDelete(item)}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Card
      title="My Orders"
      bordered={false}
      style={{ maxWidth: 900, margin: '20px auto', paddingBottom: '30px' }}
    >
      <Table
        loading={isFetching}
        dataSource={tableData}
        columns={columns}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </Card>
  );
};

export default OrdersList;
