import {
  Button,
  Card,
  Dropdown,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from 'antd';
import { TOrder } from '../../../types/order.type';
import { useState } from 'react';
import { TQueryParam, TResponse } from '../../../types';
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from '../../../redux/features/order/orderApi';
import { toast } from 'sonner';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

type TTableData = Pick<
  TOrder,
  'email' | 'totalPrice' | 'status' | 'paid' | 'transactionId'
>;

const items = [
  {
    label: 'Pending',
    key: 'Pending',
  },
  {
    label: 'Shipping',
    key: 'Shipping',
  },
];

const ManageOrders = () => {
  const [orderId, setOrderId] = useState('');
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const {
    data: ordersData,
    isFetching,
    refetch,
  } = useGetOrdersQuery([
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const [updateOrderStatus] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const metaData = ordersData?.meta;

  const handleStatusUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const updateData = {
      id: orderId,
      data: {
        status: data.key,
      },
    };

    try {
      const res = (await updateOrderStatus(updateData)) as TResponse<
        TOrder | any
      >;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        refetch();
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const tableData = ordersData?.data?.map(
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

  const handleDelete = async (item: TOrder) => {
    console.log(item);
    Swal.fire({
      title: 'Are you sure?',
      text: `Customer - ${item.email}`,
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
      title: 'Customer',
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
      title: 'Payment',
      key: 'a',
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
                <Tag color="red">Payment Incomplete</Tag>
              </>
            )}
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Shipping',
          value: 'Shipping',
        },
      ],
      render: (status: string) => {
        const color =
          status === 'Pending'
            ? 'orange'
            : status === 'Shipping'
              ? 'blue'
              : 'green';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <div>
            <Dropdown menu={menuProps} trigger={['click']}>
              <Button
                style={{ marginRight: '8px' }}
                onClick={() => setOrderId(item.key)}
              >
                Update
              </Button>
            </Dropdown>
            <Button danger onClick={() => handleDelete(item)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra,
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] =
        filters.status?.map((item) => ({
          name: 'status',
          value: item,
        })) || [];

      setParams(queryParams);
    }
  };

  return (
    <div className="lg:m-8">
      <Card
        title="Manage Orders"
        bordered={false}
        style={{ margin: '20px auto', paddingBottom: '30px' }}
      >
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Card>
      <Pagination
        style={{ margin: '20px' }}
        align="end"
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.totalDoc}
      />
    </div>
  );
};

export default ManageOrders;
