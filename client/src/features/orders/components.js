import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, addOrder, updateOrder, deleteOrder } from "./slice";

function OrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(false)
 
console.log(orders)
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      dispatch(updateOrder(formData));
      setEditing(false);
    } else {
      dispatch(addOrder(formData));
    }
    setFormData({});
    setModal(false);
  };

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  const handleEditOrder = (id) => {
    const order = orders.find((order) => order.id === id);
    if (order) {
      setFormData(order);
      setEditing(true);
      setModal(true);
    }
  };

  return (
    <div className="admin_table">
      <main className="main">
     
        <section className={modal ? "table-form" : "table_body"}>
        <h1>Orders Table</h1>
        <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>{order.total_amount}
              </td>
              <td>
                <button onClick={() => handleDeleteOrder(order.id)} className="fas fa-trash-alt"></button>
                <button onClick={() => handleEditOrder(order.id)} className="fas fa-edit"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </section>
      </main>
      {modal && (
        <>
        <div className="modal">
        <div className="userForm">
      <form onSubmit={handleFormSubmit}>
        <input
          type="number"
          name="userId"
          value={formData.userId || ""}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="status"
          value={formData.status || ""}
          onChange={handleFormChange}
        />
        <button type="submit">{editing ? "Update Order" : "Add Order"}</button>
      </form>
      </div>
      </div>
      </>
      )}
    </div>

  );
}

export default OrdersTable;