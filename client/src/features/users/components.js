import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "./slice";
import './userTable.css'
function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  

      // Set background color when component mounts
      useEffect(() => {
        // Create style element
        const style = document.createElement('style');
        style.innerHTML = `
          body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-image: url('https://images.pexels.com/photos/6408282/pexels-photo-6408282.jpeg?auto=compress&cs=tinysrgb&w=1600');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            opacity: 0.4;
          }
        `;
    
        // Append style element to head
        document.head.appendChild(style);
    
        // Remove style element when component unmounts
        return () => {
          document.head.removeChild(style);
        };
      }, []);
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      dispatch(updateUser(formData));
      setEditing(false);
    } else {
      dispatch(addUser(formData));
    }
    setFormData({});
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setFormData(user);
      setEditing(true);
    }
  };

  return (
    <div className="admin_table">
      <h1>Table</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="email"
          value={formData.email || ""}
          onChange={handleFormChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={handleFormChange}
        />
        <button type="submit">{editing ? "Update User" : "Add User"}</button>
      </form>
      <main>
        <section className="table_header">
    <h1>Customers Table</h1>
        </section>
        <section className="table_body">

       
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Password</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      </main>
    </div>
  );
}

export default UserTable;