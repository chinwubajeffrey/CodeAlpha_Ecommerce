import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Orders = () => {
  const [order, setOrder] = useState([]);
  const [loading, setloading] = useState(true);

  const statusColors = {
    PENDING: "bg-yellow-200 text-yellow-800",
    PROCESSING: "bg-blue-200 text-blue-800",
    SHIPPED: "bg-purple-200 text-purple-800",
    DELIVERED: "bg-green-200 text-green-800",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const getOrders = await API.get("/orders");
        const { getOrd } = getOrders.data;
        setOrder(getOrd);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading..</div>
      ) : order.length === 0 ? (
        <div>You haven't placed an order</div>
      ) : (
        <div>
          <h1>Orders</h1>
          {order.map((o) => (
            <div key={o.id}>
              <div className="time">
                {new Date(o.createdAt).toLocaleDateString()}
              </div>
              <div className={statusColors[o.status]}>{o.status}</div>

              <div className="id">{o.id.slice(0, 8)}</div>
              {o.items.map((item) => (
                <div key={item.id}>
                  <img src={item.product.image} alt={item.product.name} />
                  <span>{item.product.name}</span>
                  <span>{item.price}</span>{" "}
                  {/* price at time of purchase, from OrderItem itself */}
                </div>
              ))}

              <div className="total">{o.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
