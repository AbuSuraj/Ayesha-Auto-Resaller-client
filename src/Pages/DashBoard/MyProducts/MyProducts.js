import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";
import useTitle from "../../../Hooks/useTitle";

const MyProducts = () => {
  const { user,loading } = useContext(AuthContext);
  useTitle('My products')
  const email = user?.email;
  // console.log(email);
  const {
    data: myProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      const res = await fetch(
        `https://auto-reseller-api.vercel.app/products/seller/${email}`,
 {       headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`
      },}
      );
      const data = await res.json();
      return data;
    },
  });
  

const handleAdvertise = id =>{
  console.log(id)
  fetch(`https://auto-reseller-api.vercel.app/products/advertisement/${id}`,{
    method: 'PATCH',
    headers: {
        'content-type':'application/json',
        
        authorization: `bearer ${localStorage.getItem('accessToken')}`
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

const handleDeleteProduct = (id) =>{
   Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://auto-reseller-api.vercel.app/products/${id}`, {
          method: "DELETE",
          headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        })
          .then((res) => res.json())
          .then((data) => {
            /// deletedCount // dont forget this spelling
            if (data?.deletedCount > 0) {
              refetch();
            }
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
}
  if (isLoading && loading ) {
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
              <th>Status</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {isLoading && (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <div className="spinner"></div>
                </td>
              </tr>
            )}
            {myProducts?.map((myProduct, i) => (
              <tr key={myProduct._id}>
                <th>{i + 1}</th>
                <td>{myProduct.productName}</td>
                <td>{myProduct.resalePrice}</td>
                {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
                 {/* {console.log(myProduct)} */}
                <td>
                 {
                  myProduct.isPaid ? <p>Sold</p>:<p>Available</p>
                 }
                  {/* <select className="select select-primary max-w-xs">
                    <option >
                      Available
                    </option>
                    <option>Sold</option>
                  </select> */}
                </td>
                <td>
                  { myProduct.isPaid ? "No Action need" :
                   <>
                  {            myProduct.isAdvertised === false ?
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
                  </>}

                </td>
                <td>
                  <button onClick={()=>handleDeleteProduct(myProduct._id)} className="btn btn-sm">Delete</button>
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
