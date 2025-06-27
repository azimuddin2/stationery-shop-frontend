import { useState } from 'react';
import { useGetAllProductQuery } from '../../redux/features/product/productApi';
import { TQueryParam } from '../../types';
import ProductCard from '../../components/shared/ProductCard';
import { Pagination, Input, Button } from 'antd';
import { categoryOptions } from '../../constants/product';
import Loading from '../../components/shared/Loading';
import useTitle from '../../hooks/useTitle';
import { IoSearchOutline } from 'react-icons/io5';

const { Search } = Input;

const Products = () => {
  useTitle('All Products');

  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minPriceInput, setMinPriceInput] = useState<number>(0);
  const [maxPriceInput, setMaxPriceInput] = useState<number>(1000);
  const [selectedStockStatus, setSelectedStockStatus] = useState<boolean | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);


  const { data: productsData, isFetching } = useGetAllProductQuery([
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const metaData = productsData?.meta;

  const handleCategoryCheckboxChange = (value: string) => {
    let newSelectedCategory: string | null;

    if (selectedCategory === value) {
      newSelectedCategory = null;
    } else {
      newSelectedCategory = value;
    }

    setSelectedCategory(newSelectedCategory);

    setParams((prevParams) => {
      const updatedParams = prevParams.filter((p) => p.name !== 'category');
      if (newSelectedCategory) {
        updatedParams.push({ name: 'category', value: newSelectedCategory });
      }
      return updatedParams;
    });
  };

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

  const applyPriceFilter = () => {
    setParams((prevParams) => [
      ...prevParams.filter((p) => !['minPrice', 'maxPrice'].includes(p.name)),
      { name: 'minPrice', value: minPriceInput },
      { name: 'maxPrice', value: maxPriceInput },
    ]);
  };

  // Modified handleStockStatusChange to accept boolean | null
  const handleStockStatusChange = (statusBoolean: boolean | null) => {
    setSelectedStockStatus(statusBoolean);

    setParams((prevParams) => {
      const newParams = prevParams.filter((p) => p.name !== 'inStock');
      if (statusBoolean === true) { // Only add param if a status is explicitly selected
        return [...newParams, { name: 'inStock', value: statusBoolean }];
      }
      else if (statusBoolean === false) { // Only add param if a status is explicitly selected
        return [...newParams, { name: 'inStock', value: statusBoolean }];
      }
      return newParams;
    });
  };

  // const handleRatingChange = (rating: number) => {
  //   setSelectedRating(rating);
  //   setParams((prevParams) => {
  //     const newParams = prevParams.filter((p) => p.name !== 'rating');
  //     if (rating) {
  //       return [...newParams, { name: 'rating', value: rating }];
  //     }
  //     return newParams;
  //   });
  // };


  if (isFetching) {
    return <Loading />;
  }

  return (
    <section className="lg:max-w-7xl lg:mx-auto px-5 my-12 grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-gray-500">&#9660;</span> Filter By Price
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <Input
              type="number"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(Number(e.target.value))}
              placeholder="0"
              className="w-24"
            />
            <span>-</span>
            <Input
              type="number"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(Number(e.target.value))}
              placeholder="1000"
              className="w-24"
            />
          </div>
          <Button type="primary" onClick={applyPriceFilter} className="bg-[#3F90FC] hover:bg-[#1677ff] w-full">Apply</Button>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Stock Status</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="inStock"
                value="true"
                checked={selectedStockStatus === true}
                onChange={() => handleStockStatusChange(selectedStockStatus === true ? null : true)}
                className="mr-2"
              />
              Available
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="inStock"
                value="false"
                checked={selectedStockStatus === false}
                onChange={() => handleStockStatusChange(selectedStockStatus === false ? null : false)}
                className="mr-2"
              />
              Sold
            </label>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Product Types</h3>
          <ul className="flex flex-col gap-2">
            {categoryOptions.map((option) => (
              <li key={option.value}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedCategory === option.value}
                    onChange={() => handleCategoryCheckboxChange(option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Rating</h3>
          <div className="flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                className="flex items-center cursor-pointer"
                // onClick={() => handleRatingChange(star)}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${i < star ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="lg:col-span-3">
        <div className="text-center mb-10">
          <h2 className="text-3xl mb-2 text-secondary font-semibold">All Listing Products</h2>
          <p className="text-accent">
            A SecondHand Marketplace is an online or physical platform where individuals and
            businesses can buy and sell pre-owned (used) items.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Search
            placeholder="Search here anything"
            onSearch={handleSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            style={{ width: '80%' }}
            size="large"
            enterButton={
              <Button type='primary' className="bg-[#3F90FC] hover:bg-[#1677ff] cursor-pointer text-white font-medium py-2 px-4 rounded-r-md flex items-center justify-center">
                <IoSearchOutline size={24} />
              </Button>
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-12">
          {productsData?.data?.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>

        <Pagination
          style={{ marginTop: '20px', textAlign: 'right' }}
          align="end"
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.totalDoc}
        />
      </div>
    </section>
  );
};

export default Products;