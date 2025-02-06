import { useState } from 'react';
import { TQueryParam } from '../../../types';
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from '../../../redux/features/product/productApi';
import {
  Button,
  Card,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd';
import { TProduct } from '../../../types/product.type';
import UpdateProductModal from './UpdateProductModal';
import Swal from 'sweetalert2';

type TTableData = Pick<
  TProduct,
  'name' | 'brand' | 'category' | 'price' | 'description' | 'quantity'
>;

const ManageProducts = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const {
    data: productsData,
    isFetching,
    refetch,
  } = useGetAllProductQuery([
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const [deleteProduct] = useDeleteProductMutation();

  const metaData = productsData?.meta;

  const tableData = productsData?.data?.map(
    ({ _id, name, brand, price, category, description, quantity }) => ({
      key: _id,
      _id,
      name,
      brand,
      category,
      price,
      description,
      quantity,
    }),
  );

  const handleDelete = async (item: TProduct) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This product - ${item.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F90FC',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(item._id).unwrap();
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Brand',
      key: 'brand',
      dataIndex: 'brand',
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      filters: [
        {
          text: 'Writing',
          value: 'Writing',
        },
        {
          text: 'Office Supplies',
          value: 'Office Supplies',
        },
        {
          text: 'Educational',
          value: 'Educational',
        },
        {
          text: 'Technology',
          value: 'Technology',
        },
        {
          text: 'Art Supplies',
          value: 'Art Supplies',
        },
      ],
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: `price`,
      render: (text: number) => `$${text.toFixed(2)}`,
    },
    {
      key: 'description',
      dataIndex: 'desc',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <div>
            <UpdateProductModal productInfo={item} refetch={refetch} />
            <Button
              danger
              onClick={() => handleDelete(item)}
              style={{ marginLeft: '8px' }}
            >
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
        filters.category?.map((item) => ({
          name: 'category',
          value: item,
        })) || [];

      setParams(queryParams);
    }
  };

  return (
    <div className="lg:m-8">
      <Card
        title="Manage Products"
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

export default ManageProducts;
