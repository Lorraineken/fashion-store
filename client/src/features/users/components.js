import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "./slice";

function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
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
    <div>
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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Password</th>
            <th>Name</th>
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
    </div>
  );
}

export default UserTable;