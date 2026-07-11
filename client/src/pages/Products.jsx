import React, { useEffect, useState } from "react";
import API from "../api/axios";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const { products, categories } = res.data;
        setProducts(products);
        setCategories(categories);
      } catch (error) {
        console.log(error);
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
