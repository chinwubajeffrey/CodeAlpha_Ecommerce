import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuthStore } from "../store/authStore";

const ProductCard = ({ product }) => {
  console.log(product);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const token = useAuthStore((state) => state.token);

  const navigate = useNavigate();
  const cardDetails = () => {
    navigate(`/products/:${product.id}`);
  };

  useEffect(() => {
    const checkStock = async () => {
      if (product.stock === 0) {
        setQuantity("Out of Stock");
      }
    };
  }, []);

  const addToCart = async (e) => {
    e.stopPropagation();
    if (!token) {
      return navigate("/login");
    }
    try {
      const addCart = await API.post("/cart", {
        productId: product.id,
        quantity: quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={cardDetails} className="card p-4 flex flex-col">
      <div className="img">
        <img src={product.image} alt="product image" />
      </div>
      <div className="body">
        <div className="text">
          <div className="cakename text-xl font-bold">{product.name}</div>
          <div className="des">{product.description}</div>
          <div className="price text-lg font-medium"> {product.price}</div>
        </div>
        <div className="quant">
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="quantity"
          />
        </div>
        <div className="button">
          <button
            disabled={product.stock === 0}
            onClick={addToCart}
            className={"bg-pink-600"}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
