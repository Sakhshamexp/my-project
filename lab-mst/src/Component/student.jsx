import React, { useState } from "react";

function Onlinestore() {
  const [orders, setOrders] = useState([{ id: 1, product: "Laptop", status: "Shipped" }]);
  const [id, setId] = useState("");
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState("");

  const addOrder = (e) => {
    e.preventDefault();
    setOrders([...orders, { id: +id, product, status }]);
    setId(""); setProduct(""); setStatus("");
  };

  return (
    <div>
      <ul>{orders.map(o => <li key={o.id}>{o.id}-{o.product}-{o.status}</li>)}</ul>
      <form onSubmit={addOrder}>
        <input type="number" value={id} onChange={e=>setId(e.target.value)} required />
        <input value={product} onChange={e=>setProduct(e.target.value)} required />
        <input value={status} onChange={e=>setStatus(e.target.value)} required />
        <button>Add</button>
      </form>
    </div>
  );
}

export default Onlinestore;
