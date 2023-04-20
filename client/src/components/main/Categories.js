import React from 'react'
import '../main/Categories.css'

const categories = [
  { id: 1, name: 'Men' },
  { id: 2, name: 'Women' },
  { id: 3, name: 'Jackets' },
  {id: 4, name: 'Hats'},
  {id: 5, name: 'Bags'},
  {id: 6, name: 'sneakers'}
];
const CategoriesPage = () => {
  return (
    <div className='categories'>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage