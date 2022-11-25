import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Category from './Category/Category';

const Categories = () => {
    const { data: categories = [], refetch, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch( 'http://localhost:5000/categories');
            const data = await res.json();
            return data
        }
    });
    console.log(categories)
    return (
        <div className='my-10'>
            <h2 className='font-bold text-3xl text-center'>Products Categories</h2>
            <div className='grid gap-6 ml-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
            {
               categories.map(category =><Category
               key={category._id}
               category = {category}
               ></Category>)
            }
        </div>
        </div>
    );
};

export default Categories;