import { useState } from 'react';
import { useGetAllProductQuery } from '../../redux/features/product/productApi';
import { TQueryParam } from '../../types';
import ProductCard from '../../components/shared/ProductCard';
import { Pagination, Select, Input } from 'antd';
import { categoryOptions } from '../../constants/product';
import Loading from '../../components/shared/Loading';

const { Search } = Input;

const Products = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch products with applied filters
  const { data: productsData, isFetching } = useGetAllProductQuery([
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const metaData = productsData?.meta;

  // Handle category selection change
  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value);
    setParams((prevParams) => {
      return value
        ? [
            ...prevParams.filter((p) => p.name !== 'category'),
            { name: 'category', value },
          ]
        : prevParams.filter((p) => p.name !== 'category');
    });
  };

  // Handle search input change
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setParams((prevParams) => {
      return value
        ? [
            ...prevParams.filter((p) => p.name !== 'searchTerm'),
            { name: 'searchTerm', value },
          ]
        : prevParams.filter((p) => p.name !== 'searchTerm');
    });
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <section className="lg:max-w-7xl lg:mx-auto px-5 my-12">
      <div className="text-center mb-10 lg:w-2xl mx-auto">
        <h2 className="text-3xl mb-2 text-secondary">Our Products</h2>
        <p className="text-accent">
          Our stationery shop offers high-quality notebooks, pens, pencils, and
          more—perfect for students, professionals, and artists.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex justify-center flex-wrap gap-4 mb-5">
        <Search
          placeholder="Search by name..."
          onSearch={handleSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{ width: '600px' }}
          size="large"
        />
        <Select
          placeholder="Select Category"
          value={selectedCategory}
          style={{ width: '300px' }}
          onChange={handleCategoryChange}
          options={categoryOptions}
          allowClear
          size="large"
        />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 mb-12">
        {productsData?.data?.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        style={{ marginTop: '20px', textAlign: 'right' }}
        align="end"
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.totalDoc}
      />
    </section>
  );
};

export default Products;
