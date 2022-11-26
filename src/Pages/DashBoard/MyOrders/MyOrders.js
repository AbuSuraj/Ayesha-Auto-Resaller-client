import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import MyOrder from './MyOrder';


const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    console.log(email);
    const {
      data: myOrders = [],
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["myorders"],
      queryFn: async () => {
        const res = await fetch(
          `http://localhost:5000/myorders/buyer/${email}`
        );
        const data = await res.json();
        return data;
      },
    });

    console.log(myOrders)

    if (isLoading) {
      return (
        <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      );
    }
    return (
        <div  className='grid gap-6 ml-4 grid-cols-1 md:grid-cols-2  my-10'>
            {
                myOrders.map(myorder => <MyOrder
                key={myorder._id}
                myorder = {myorder}
                ></MyOrder>)
            }
        </div>
    );
};

export default MyOrders;