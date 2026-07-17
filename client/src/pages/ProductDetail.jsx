import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quant, setQuant] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await API.get(`/products/${id}`);
        setProduct(products.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const addToCart = async (e) => {
    if (!token) {
      return navigate("/login");
    }
    try {
      const addCart = await API.post("/cart", {
        productId: product.id,
        quantity: quant,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="image">
            <img src={product.image} alt="product image" />
          </div>
          <div className="body">
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>{product.price}</div>
            <div className="quantity">
              <input
                type="number"
                value={quant}
                onChange={(e) => setQuant(e.target.value)}
                min={1}
                max={product.stock}
                placeholder="Quantity"
              />
            </div>
            <div>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </div>
            <button disabled={product.stock === 0} onClick={addToCart}>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
