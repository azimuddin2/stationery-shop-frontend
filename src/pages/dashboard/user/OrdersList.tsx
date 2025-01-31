import { Button, Card, Table, TableColumnsType, Tag } from 'antd';
import { useGetOrdersByEmailQuery } from '../../../redux/features/order/orderApi';
import { TOrder } from '../../../types/order.type';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { useEffect, useState } from 'react';

type TTableData = Pick<TOrder, 'email' | 'totalPrice' | 'status'>;

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
    isLoading,
    isFetching,
  } = useGetOrdersByEmailQuery(email!, { skip: !email });

  const tableData = ordersData?.map(({ _id, email, totalPrice, status }) => ({
    key: _id,
    _id,
    email,
    totalPrice,
    status,
  }));

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
              ? 'blue'
              : 'green';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: () => {
        return (
          <div>
            <Button type='default' htmlType="submit">
              Pay
            </Button>
            <Button danger htmlType="submit">
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Card
        title="My Orders"
        bordered={false}
        style={{ maxWidth: 800, margin: '20px auto', paddingBottom: '30px', }}
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
    </div>
  );
};

export default OrdersList;
