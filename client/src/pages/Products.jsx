import React, { useEffect, useState } from "react";
import API from "../api/axios";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
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
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <NavBar />
          <div>{err}</div>
          <div className="body">
            {products.map((pro) => (
              <div key={pro.id}>
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
