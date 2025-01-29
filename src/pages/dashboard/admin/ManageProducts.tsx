import { useState } from 'react';
import { TQueryParam } from '../../../types';
import { useGetAllProductQuery } from '../../../redux/features/product/productApi';
import { Button, Pagination, Table, TableColumnsType, TableProps } from 'antd';
import { TProduct } from '../../../types/product.type';
import UpdateProductModal from './UpdateProductModal';

type TTableData = Pick<
  TProduct,
  'name' | 'brand' | 'category' | 'price' | 'description' | 'quantity'
>;

const ManageProducts = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
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

  const metaData = productsData?.meta;

  const tableData = productsData?.data?.map(
    ({ _id, name, brand, price, category, description, quantity }) => ({
      key: _id,
      name,
      brand,
      category,
      price,
      description,
      quantity,
    }),
  );

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
    },
    {
      key: 'description',
      dataIndex: 'desc',
    },
    {
      key: 'quantity',
      dataIndex: 'desc',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <div>
            <UpdateProductModal productInfo={item} refetch={refetch} />
            <Button>Delete</Button>
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
    <div>
      <h2 style={{ marginBottom: '12px' }}>Academic Semesters</h2>

      <>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          pagination={false}
        />
        <Pagination
          style={{ margin: '20px' }}
          align="end"
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.totalDoc}
        />
      </>
    </div>
  );
};

export default ManageProducts;
