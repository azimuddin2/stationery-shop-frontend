import { useEffect, useState } from 'react';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { useAppSelector } from '../../../redux/hooks';
import { useGetPaymentsByEmailQuery } from '../../../redux/features/payment/paymentApi';
import { Card, Table, TableColumnsType, Tag } from 'antd';
import { TPayment } from '../../../types/payment.type';

type TTableData = Pick<
  TPayment,
  'email' | 'amount' | 'date' | 'status' | 'transactionId'
>;

const PaymentHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const { data: paymentsData, isFetching } = useGetPaymentsByEmailQuery(
    email!,
    { skip: !email },
  );

  const tableData = paymentsData?.map(
    ({ _id, email, amount, status, date, transactionId }) => ({
      key: _id,
      email,
      amount,
      status,
      date,
      transactionId,
    }),
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: number) => `$${text.toFixed(2)}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'pending'
            ? 'orange'
            : status === 'completed'
              ? 'green'
              : 'blue';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'TransactionId',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
  ];

  return (
    <Card
      title="Payment History"
      bordered={false}
      style={{ margin: '40px', paddingBottom: '30px' }}
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

export default PaymentHistory;
