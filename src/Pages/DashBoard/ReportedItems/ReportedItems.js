import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


const ReportedItems = () => {
  const {loading} = useContext(AuthContext)
    useTitle('Reported Items');
    const [pageNumber, setPageNumber] = useState(0);
    const reportsPerPage = 5;
    const [sortColumn, setSortColumn] = useState('name'); // Default sorting column
    const [sortDirection, setSortDirection] = useState('asc');
    const {
        data: reportedItems = { data: [], total: 0, currentPage: 1, totalPages: 1},
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["report", pageNumber, sortColumn, sortDirection],
        queryFn: async ({queryKey}) => {
          const [key, page, column, direction] = queryKey;
        
          const res = await fetch(`https://ayeshaauto.vercel.app/report?page=${page}&limit=${reportsPerPage}&sort=${column}&order=${direction}`);
          const data = await res.json();
          return data;
        },
      });
      const pageCount = reportedItems.totalPages;

      const handlePageClick = ({ selected }) => {
        // Handle page click event
        setPageNumber(selected + 1); // Note the +1 to match the backend's 1-based page indexing
    
      };
      const handleDelete = (reportId, itemId) => {
        // console.log(reportId,itemId)
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
            fetch(`https://ayeshaauto.vercel.app/report/${itemId}`, {
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
            //   deleting reported item 
              fetch(`https://ayeshaauto.vercel.app/reportedItem/${itemId}`, {
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

      
      const handleSort = (column) => {
        if (sortColumn === column) {
          // If the same column is clicked again, toggle the sorting direction
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          // If a new column is clicked, set it as the sorting column in ascending order
          setSortColumn(column);
          setSortDirection('asc');
        }
      };
      
      
    return (
        <div className="mx-4">
        <h2 className="text-3xl my-5 text-center">
          Total Reported Items: {reportedItems?.total}
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
          <thead>
        <tr>
          {/* <th></th> */}
          <th
            onClick={() => handleSort('productName')}
            className='w-1/3 cursor-pointer'
          >
            Product Name{' '}
            {sortColumn === 'productName' && (
              <FontAwesomeIcon
              className="ml-3 bg-transparent border-none cursor-pointer p-0 text-base text-black-600 hover:text-gray-600 transition-colors duration-300"
                icon={sortDirection === 'asc' ? faArrowUp : faArrowDown}
              />
            )}
          </th>
          <th
            onClick={() => handleSort('seller')}
            className='w-1/3 cursor-pointer'
          >
            Seller Name{' '}
            {sortColumn === 'seller' && (
              <FontAwesomeIcon
              className="ml-3 bg-transparent border-none cursor-pointer p-0 text-base text-black-600 hover:text-gray-600 transition-colors duration-300"
                icon={sortDirection === 'asc' ? faArrowUp : faArrowDown}
              />
            )}
          </th>
          <th className='w-1/3'>Delete</th>
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
              {reportedItems?.data?.map((reporteditem, i) => (
                <tr key={reporteditem._id}>
                  {/* <th>{i + 1}</th> */}
                  <td>{reporteditem.productName}</td>
                  <td>{reporteditem.seller}</td>
                  {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
                  <td>
                    <button
                      onClick={() => handleDelete(reporteditem._id, reporteditem.product_id)}
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
      </div>
    );
};

export default ReportedItems;