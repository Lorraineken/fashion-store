import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from './slice';
import './productslice.css'

function ProductTable() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [modal, setModal] = useState(false)
  

  // Fetch products on component mount
  console.log(products)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle form changes
  const handleFormChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateProduct({ id: editingProductId, ...formData }));
      setEditing(false);
    } else {
      dispatch(addProduct(formData));
    }
    setFormData({});
    setModal(false);
  };

  // Handle delete product
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  // Handle edit product
  const handleEditProduct = (productId) => {
    setFormData(products.find((product) => product.id === productId));
    setEditing(true);
    setEditingProductId(productId);
    setModal(true);
  };

  return (
    <div className='admin_table'>
      <main className='main'> 
      <section className={modal ? "table-form" : "table_body"}>    
         <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)} className="fas fa-trash-alt"></button>
                <button onClick={() => handleEditProduct(product.id)} className="fas fa-edit"></button>
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
      <h1> Products Table</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" value={formData.name || ''} onChange={handleFormChange} />
        <input type="text" name="description" value={formData.description || ''} onChange={handleFormChange} />
        <input type="number" name="price" value={formData.price || ''} onChange={handleFormChange} />
        <button type="submit">{editing ? 'Update Product' : 'Add Product'}</button>
      </form>
      </div>
</div>
</>
)}
    </div>
  );
}

export default ProductTable;
