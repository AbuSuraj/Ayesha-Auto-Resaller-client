import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../Categories/Category/Products/Product/BookingModal/BookingModal';

const SingleItem = ({advertisementItem }) => {
    const {_id,productName, image,resalePrice} = advertisementItem ;
    const [book,setBook] = useState(null);
    return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img className='w-full h-[300px]' src={image} alt="advertisementItem" /></figure>
  <div className="card-body">
    <h2 className="card-title">{productName}</h2>
    <p><span className='font-bold'>Price: </span> {resalePrice}BDT</p>
    <div className="card-actions justify-end">
    <label 
       onClick={() =>setBook(advertisementItem)}
       htmlFor="booking-modal" className="btn">Book Now</label> 
    </div>
    {
     book &&
     <BookingModal 
     key={_id}
     product = {advertisementItem}
     setBook = {setBook}
     ></BookingModal>
     }
  </div>
</div>
    );
};

export default SingleItem;