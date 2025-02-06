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
import { TQueryParam, TResponse } from '../../../types';
import { useState } from 'react';
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '../../../redux/features/user/userApi';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { TRegisterUser } from '../../../types/user.type';
import { toast } from 'sonner';
import useTitle from '../../../hooks/useTitle';

type TTableData = Pick<TRegisterUser, 'name' | 'email' | 'role' | 'status'>;

const items = [
  {
    label: 'In-progress',
    key: 'in-progress',
  },
  {
    label: 'Blocked',
    key: 'blocked',
  },
];

const ManageUsers = () => {
  useTitle('Manage Users');
  const [userId, setUserId] = useState('');
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const {
    data: usersData,
    isFetching,
    refetch,
  } = useGetUsersQuery([
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const metaData = usersData?.meta;

  const tableData = usersData?.data?.map(
    ({ _id, name, email, role, status }) => ({
      key: _id,
      _id,
      name,
      email,
      role,
      status,
    }),
  );

  const handleStatusUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating...');

    const updateData = {
      id: userId,
      data: {
        status: data.key,
      },
    };

    try {
      const res = (await updateUserStatus(updateData)) as TResponse<
        TRegisterUser | any
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

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => (
        <Tag style={{ textTransform: 'capitalize' }} color="blue">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'blocked'
            ? 'red'
            : status === 'in-progress'
              ? 'orange'
              : 'green';
        return (
          <Tag style={{ textTransform: 'capitalize' }} color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button
              style={{ marginRight: '8px' }}
              onClick={() => setUserId(item.key)}
            >
              Update
            </Button>
          </Dropdown>
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
        title="Manage Users"
        bordered={false}
        style={{
          maxWidth: '900px',
          margin: '20px auto',
          paddingBottom: '30px',
        }}
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

export default ManageUsers;
