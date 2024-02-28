import { Button } from "../ui/button";
import ProductLayout from "./ProductLayout";
import useFetchProducts from "@/hooks/useFetchProducts";
import { Link } from "react-router-dom";

const categories = [
  { label: "Bed", value: "bed" },
  { label: "Table", value: "table" },
  { label: "Sofa", value: "sofa" },
  { label: "Chair", value: "chair" },
  { label: "Closet", value: "closet" },
];

const ProductByCategory = () => {
  const { dataList } = useFetchProducts();

  console.log(categories);

  return (
    <>
      <div className="m-8">
        <h1> All Products</h1>
        <div className="border border-gray border-y-2 border-x-0 my-2">
          <div>
            {categories.map((category) => (
              <Link
                to={`/product/${category.value}`}
                key={category.value}
                className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-gray-light hover:font-semibold focus:outline-none active:bg-gray-light  disabled:pointer-events-none disabled:opacity-50 "
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="my-8 flex flex-wrap justify-around ">
          <ProductLayout dataList={dataList} />
        </div>
      </div>
    </>
  );
};

export default ProductByCategory;
