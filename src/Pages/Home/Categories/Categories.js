import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider';
import Category from './Category/Category';

const Categories = () => {
    const {loading} = useContext(AuthContext)
    const { data: categories = [], refetch, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch( 'https://auto-reseller-api.vercel.app/categories');
            const data = await res.json();
            return data
        }
    });
    if(loading  && isLoading){
        return <div className="spinner"></div>
 
        // <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
    }
    // console.log(categories)
    return (
        <div className='my-10'>
            <h2 className='font-bold text-3xl text-center drop-shadow-2xl'>Products Categories</h2>
            <div className='grid gap-6 ml-36 md:ml-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
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