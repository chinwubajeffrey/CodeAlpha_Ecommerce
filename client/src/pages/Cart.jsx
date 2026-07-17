import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const [message, setMessage] = useState("");
  const fetchCart = useCartStore((state) => state.fetchCart);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);
  const total = useCartStore((state) => state.total);
  const clear = useCartStore((state) => state.clearCart);
  const updateItem = useCartStore((state) => state.updateItem);
  const navigate = useNavigate();
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    fetchCart();
  }, []);

  const placeOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      navigate("/products");
      return;
    }
    try {
      const order = await API.post("/orders");
      clear();
      setMessage("Order Placed Successfully");
      navigate("/orders");
    } catch (error) {
      console.log(error);
      setMessage(JSON.stringify(error.message));
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading..</div>
      ) : items.length === 0 ? (
        <div>
          <h2>Your cart is empty</h2>
          <Link to="/products">Go to products</Link>
        </div>
      ) : (
        <div>
          <h1>Cart</h1>
          {message && <div>{message}</div>}
          <div className="body">
            {items.map((item) => (
              <div key={item.id}>
                <div className="img">
                  <img src={item.product.image} alt="what??" />
                </div>
                <div className="body">
                  {item.product.name}
                  {item.product.price}

                  <span>Total: {item.product.price * item.quantity}</span>

                  <div className="btn">
                    <button
                      className="plus"
                      onClick={() => updateItem(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      className="minus"
                      onClick={() =>
                        item.quantity - 1 <= 0
                          ? removeItem(item.id)
                          : updateItem(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)}>
                    remove row
                  </button>
                </div>
              </div>
            ))}

            <div className="total">Cart total: {total()}</div>
            <button onClick={(e) => placeOrder(e)}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
