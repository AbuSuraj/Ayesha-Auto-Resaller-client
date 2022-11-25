import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product/Product';

const Products = () => {
    const {id} = useParams();
    console.log(id);
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category/${id}`);
            const data = await res.json();
            return data
        }
    });
    console.log(products)
    return (
        <div>
           <div className='grid gap-6 ml-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
             {
                products.map(product =><Product
                key={product._id}
                product = {product}
                ></Product>)
             }
           </div>
        </div>
    );
};

export default Products;