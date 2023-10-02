import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './AllBuyers.css'
const AllBuyers = () => {
  const {loading} = useContext(AuthContext)
  useTitle('Buyers');
  const [pageNumber, setPageNumber] = useState(0); // Initialize the page number state
  const buyersPerPage = 5; // Number of buyers to display per page

    // const {
    //     data: buyers = [],
    //     refetch,
    //     isLoading,
    //   } = useQuery({
    //     queryKey: ["buyers"],
    //     queryFn: async () => {
    //       const res = await fetch("https://ayeshaauto.vercel.app/buyers",
    //       {    headers: {
    //         'content-type': 'application/json',
    //         authorization: `bearer ${localStorage.getItem('accessToken')}`
    //     },}
    //       );
    //       const data = await res.json();
    //       return data;
    //     },
    //   });
    const {
      data: buyers = { data: [], total: 0, currentPage: 1, totalPages: 1 },
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ['buyers', pageNumber],
      queryFn: async ({ queryKey }) => {
        const [key, page] = queryKey;
        const res = await fetch(
          `https://ayeshaauto.vercel.app/buyers?page=${page}&limit=${buyersPerPage}`,
          {
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        const data = await res.json();
        console.log(buyers);
        return data;
      },
    });
  
    const pageCount = buyers.totalPages;

  const handlePageClick = ({ selected }) => {
    // Handle page click event
    setPageNumber(selected + 1); // Note the +1 to match the backend's 1-based page indexing

  };
      const handleDelete = (id) => {
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
            fetch(`https://ayeshaauto.vercel.app/buyer/${id}`, {
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
      };
    
    
      // if (isLoading && loading) {
      //   return (
      //     <div className="spinner"></div>
      //   );
      // }
      return (
        <div className="mx-4">
          <h2 className="text-3xl my-5 text-center">
            Numbers of Buyers: {buyers?.total}
          </h2>
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
              {isLoading && (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  <div className="spinner"></div>
                </td>
              </tr>
            )}
                {buyers?.data?.map((buyer, i) => (
                  <tr key={buyer._id}>
                    <th>{i + 1}</th>
                    <td>{buyer.name}</td>
                    <td>{buyer.email}</td>
                    {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
                    <td>
                      <button
                        onClick={() => handleDelete(buyer._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {/* {pageCount > 1 && ( // Display pagination only if there is more than one page */}
        
        <ReactPaginate
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          previousClassName={pageNumber === 1 ? 'previous disabled' : 'previous'}
          nextClassName={pageNumber === pageCount ? 'next disabled' : 'next'}
          previousLabel={pageNumber === 1 ? 'Previous' : 'Previous'}
          nextLabel={pageNumber === pageCount ? 'Next' : 'Next'}
        />
        {/* )} */}
        </div>
        
    );
};

export default AllBuyers;