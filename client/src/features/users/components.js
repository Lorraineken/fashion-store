import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "./slice";
import './userTable.css'
function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(false)
 
console.log(users)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  

      // Set background color when component mounts
     
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
    setModal(false);
  };

  const handleDeleteUser = (id) => {
     dispatch(deleteUser(id));
 
     
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setFormData(user);
      setEditing(true);
      setModal(true)
    }
  };

  return (
    <div className="admin_table">
            <main className="main ">
       
  
        
        <section className={modal ? "table-form" : "table_body"}>
        <h1>Customers Table</h1>
       
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              
              
              <td className="table-action-btn">
                <button onClick={() => handleDeleteUser(user.id)} className="fas fa-trash-alt"></button>
                <button onClick={() => handleEditUser(user.id)} className="fas fa-edit"></button>
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
      <h1>Table</h1>
    
      <form onSubmit={handleFormSubmit}>
      <label htmlFor="">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username || ""}
          onChange={handleFormChange}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email || ""}
          onChange={handleFormChange}
        />
        <button type="submit">{editing ? "Update User" : "Add User"}</button>
      </form>
      </div>
      </div>
      </>
)}

    </div>
  );
}

export default UserTable;