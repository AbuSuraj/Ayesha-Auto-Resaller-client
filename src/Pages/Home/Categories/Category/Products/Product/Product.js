import { format } from 'date-fns';
import React from 'react';

const Product = ({product}) => {
    const {productName,condition,originalPrice,resalePrice,location,mobile,productDescription,purchaseYear,createdDate,image, seller} = product;
 const date = new Date();
 const year = date.getFullYear();
  const pYear = parseInt(purchaseYear)
  const usedYear = year - pYear;
 console.log(year,pYear)
    return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img className='w-full' src={image} alt="car" /></figure>
  <div className="card-body">
    <h2 className="card-title">{productName}
    <div className="badge badge-secondary">{condition}</div>
    </h2>
     <div className='flex justify-between'>
        <p>Original Price: <span className='font-bold'>{originalPrice} BDT</span></p>
        <p>Resale Price: <span className='font-bold'>{resalePrice} BDT</span></p>
     </div>
     <div>
        <p>Location: <span className='font-bold'>{location}</span></p>
        <p>Contact Number: <span className='font-bold'>{mobile}</span></p>
        <p><span className='font-bold'>Years of used:</span> {usedYear} years</p>
        <p><span className='font-bold'>Overview:</span> {productDescription}</p>
        <p><span className='font-bold'>Posted Date:</span> {createdDate.slice(0,10)}</p>
        <p><span className='font-bold'> Seller Name:</span> {seller}</p>
     </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Book Now</button>
    </div>
  </div>
</div>
    );
};

export default Product;