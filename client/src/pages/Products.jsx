import React, { useEffect, useState } from "react";
import API from "../api/axios";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const { products, categories } = res.data;
        setProducts(products);
        setCategories(categories);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setErr("There was an error while fetching");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-pink-50">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col justify-center">
          <NavBar />
          <div>{err}</div>
          <div className=" flex justify-center gap-6 mt-10 flex-wrap ">
            {products.map((pro) => (
              <div key={pro.id} className=" flex w-[20%] h-full">
                <ProductCard product={pro} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
