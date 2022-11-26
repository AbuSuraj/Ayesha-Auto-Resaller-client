import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSellers = () => {

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/sellers');
            const data = await res.json();
            return data
        }
    });
    // console.log(sellers);
    if(isLoading){
        return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
    }
    return (
<div>
<h2 className="text-3xl my-5 text-center">Total sellers: {sellers.length}</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        sellers?.map((seller, i) =><tr key={seller._id}>
            <th>{i+1}</th>
            <td>{seller.name}</td>
            <td>{seller.email}</td>
            {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
            <td><button className='btn btn-xs btn-error'>Delete</button></td>
          </tr>)
      }
      
    </tbody>
  </table>

</div>
        </div>
    );
};

export default AllSellers;