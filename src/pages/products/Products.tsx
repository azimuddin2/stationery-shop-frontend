import { useState } from "react";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types";
import ProductCard from "../../components/shared/ProductCard";
import { Pagination, Select, Input, Slider } from "antd";
import { categoryOptions } from "../../constants/product";
import Loading from "../../components/shared/Loading";
import useTitle from "../../hooks/useTitle";
import { IoSearchOutline } from "react-icons/io5";

const { Search } = Input;

const Products = () => {
  useTitle("All Products");

  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const { data: productsData, isFetching } = useGetAllProductQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = productsData?.meta;

  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value);
    setParams((prevParams) => {
      return value
        ? [...prevParams.filter((p) => p.name !== "category"), { name: "category", value }]
        : prevParams.filter((p) => p.name !== "category");
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setParams((prevParams) => {
      return value
        ? [...prevParams.filter((p) => p.name !== "searchTerm"), { name: "searchTerm", value }]
        : prevParams.filter((p) => p.name !== "searchTerm");
    });
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange([value[0], value[1]]);
      setParams((prevParams) => [
        ...prevParams.filter((p) => !["minPrice", "maxPrice"].includes(p.name)),
        { name: "minPrice", value: value[0] },
        { name: "maxPrice", value: value[1] },
      ]);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <section className="lg:max-w-7xl lg:mx-auto px-5 my-12">
      <div className="text-center mb-10 lg:w-2xl mx-auto">
        <h2 className="text-3xl mb-2 text-secondary">Our Products</h2>
        <p className="text-accent">
          Our stationery shop offers high-quality notebooks, pens, pencils, and more—perfect for students, professionals, and artists.
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-4 mb-5">
        <Search
          placeholder="Search by name..."
          onSearch={handleSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{ width: "600px" }}
          size="large"
          enterButton={
            <button className="bg-[#3F90FC] hover:bg-[#1677ff] cursor-pointer text-white font-medium py-2 px-4 rounded">
              <IoSearchOutline size={24}/>
            </button>
          }
        />
        <Select
          placeholder="Select Category"
          value={selectedCategory}
          style={{ width: "300px" }}
          onChange={handleCategoryChange}
          options={categoryOptions}
          allowClear
          size="large"
        />
        <div style={{ width: "300px" }}>
          <p className="text-sm text-accent">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
          <Slider
            range
            min={0}
            max={1000}
            step={10}
            defaultValue={priceRange}
            onChange={handlePriceChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 mb-12">
        {productsData?.data?.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
      <Pagination
        style={{ marginTop: "20px", textAlign: "right" }}
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
