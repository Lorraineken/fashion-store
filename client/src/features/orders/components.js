import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, addOrder, updateOrder, deleteOrder } from "./slice";

function OrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  console.log(orders)
  const [formData, setFormData] = useState({
    role: { name: "" }, // set a default value for the name field
  });
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(false)
 
console.log(orders)
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      if (name.startsWith("role.")) {
        return {
          ...prevData,
          role: {
            ...prevData.role,
            [name.substring(5)]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (editing) {
      const data = {
        id: formData.id,
        user: formData.user,
        role: {
          ...formData.role,
          name: formData.name // Use the new name field in the formData object
        }
      };
  
      dispatch(updateOrder(data));
      setEditing(false);
    } else {
      const data = {
        user: formData.user,
        role: {
          ...formData.role,
          name: formData.name // Use the new name field in the formData object
        }
      };
  
     dispatch(addOrder(data));
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
      setFormData({
        id: order.id,
        user: order.user,
        role: {
          ...order.role
        },
        name: order.role.name 
      });
      setEditing(true);
      setModal(true);
    }
  };
  

  return (
    <div className="admin_table">
      <main className="main">
     
        <section className={modal ? "table-form" : "table_body"}>
        <h1>User Roles Table</h1>
        <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.role.name}</td>
              <td>{order.user.username}</td>
              <td>{order.user.email}
              
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
  type="text"
  name="role.name"
  value={formData.role.name || ""}
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