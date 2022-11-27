import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";
import useTitle from "../../../Hooks/useTitle";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  useTitle('My products')
  const email = user?.email;
  console.log(email);
  const {
    data: myProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myproducts/seller/${email}`
      );
      const data = await res.json();
      return data;
    },
  });

const handleAdvertise = id =>{
  console.log(id)
  fetch(`http://localhost:5000/products/advertise/${id}`,{
    method: 'PATCH',
    headers: {
        'content-type':'application/json'
    },
    // body: JSON.stringify( )
})
.then(res => res.json())
.then(data =>{
    if(data.modifiedCount > 0){
        Swal.fire("Added to the advertisement card successfully");
        refetch();
   }
})
}

  if (isLoading) {
    return (
      <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    );
  }
  console.log(myProducts);

  return (
    <div className="mx-4">
      <h2 className="text-3xl my-5 text-center">
        Total Products: {myProducts?.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myProducts?.map((myProduct, i) => (
              <tr key={myProduct._id}>
                <th>{i + 1}</th>
                <td>{myProduct.productName}</td>
                <td>{myProduct.resalePrice}</td>
                {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}

                <td>
                  <select className="select select-primary max-w-xs">
                    <option >
                      Available
                    </option>
                    <option>Sold</option>
                     
                    
                  </select>
                </td>
                <td>
{            myProduct.isAdvertised ==='false' ?
                    <button
                    onClick={() => handleAdvertise(myProduct._id)}
                    
                    className={`btn btn-xs btn-secondary `}
                  >
                    Advertise
                  </button>
                  :
                  <>
                                     <button
                   
                    
                    className={' btn btn-xs btn-accent' }
                  >
                    Advertised
                  </button></>
                  
}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
