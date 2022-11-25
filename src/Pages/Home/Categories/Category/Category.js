import React from 'react';

const Category = ({category}) => {
    const {categoryName, image} = category;
    return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="category" /></figure>
  <div className="card-body">
    <h2 className="card-title">{categoryName}</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">See all cars</button>
    </div>
  </div>
</div>
    );
};

export default Category;