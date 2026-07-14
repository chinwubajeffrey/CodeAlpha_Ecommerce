import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuthStore } from "../store/authStore";

const ProductCard = ({ product }) => {
  const token = useAuthStore((state) => state.token);

  const navigate = useNavigate();
  const cardDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    if (!token) {
      return navigate("/login");
    }
    try {
      const addCart = await API.post("/cart", {
        productId: product.id,
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={cardDetails}
      className="card p-4 flex w-full border border-amber-800 flex-col"
    >
      <div className="img h-[50%]">
        <img
          src={product.image}
          alt="product image"
          className="h-full w-full"
        />
      </div>
      <div className="body h-[50%]">
        <div className="text">
          <div className="cakename text-xl font-bold">{product.name}</div>
          <div className="des">{product.description}</div>
          <div className="price text-lg font-medium"> {product.price}</div>
        </div>
        <div className="button">
          <button
            disabled={product.stock === 0}
            onClick={addToCart}
            className={"bg-pink-600"}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
