import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";
import useTitle from "../../../Hooks/useTitle";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome icons

library.add(faArrowUp, faArrowDown);

const AllSellers = () => {
  useTitle("Sellers");
  const { loading } = useContext(AuthContext);
  const [pageNumber, setPageNumber] = useState(0);
  const sellersPerPage = 5;
  const [sortBy, setSortBy] = useState({column: 'name', order: 'asc'});

  const {
    data: sellers = {data: [], total:0, currentPage: 1, totalPages:1},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellers", pageNumber, sortBy],
    queryFn: async ({queryKey}) => {
      const [key, page, sort] = queryKey;
      const {column, order} = sort;
      const res = await fetch(`http://localhost:5000/users/sellers?page=${page}&limit=${sellersPerPage}&sort=${column}&order=${order}`, {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const pageCount = sellers.totalPages;

  const handlePageClick = ({selected}) =>{
    setPageNumber(selected + 1)
  }
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
        fetch(`http://localhost:5000/users/seller/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
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
  // verify seller
  const handleVerify = (id) => {
    Swal.fire({
      title: "Are you sure to verify this seller?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, verify it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/verify-seller/${id}`, {
          method: "PATCH",

          headers: {
            "content-type": "application/json",

            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          // body: JSON.stringify( )
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire("Verified successfully");
              refetch();
            }
          });
      }
    });
  };

  // console.log(sellers);
  // if (isLoading && loading) {
  //   return (
  //     <div className="spinner"></div>
  //   );
  // }
  const toggleSort = (column) => {
    setSortBy((prevSort) => ({
      column,
      order: prevSort.column === column ? (prevSort.order === "asc" ? "desc" : "asc") : "asc",
    }));
  };
  return (
    <div className="mx-4">
      <h2 className="text-3xl my-5 text-center">
        Total sellers: {sellers?.total}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {/* <th></th> */}
              <th className="cursor-pointer">Name
              <button
                  onClick={() => toggleSort("name")}
                  className="ml-3 bg-transparent border-none cursor-pointer p-0 text-base text-black-600 hover:text-gray-600 transition-colors duration-300"
                >
                  {sortBy.column === "name" && sortBy.order === "asc" && (
                    <FontAwesomeIcon icon="arrow-up" />
                  )}
                  {sortBy.column === "name" && sortBy.order === "desc" && (
                    <FontAwesomeIcon icon="arrow-down" />
                  )}
                </button>
              </th>
              <th>Email</th>
              <th>Delete</th>
              <th>Verifcation Status</th>
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
            {sellers?.data?.map((seller, i) => (
              <tr key={seller._id}>
                {/* <th>{i + 1}</th> */}
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
                <td>
                  <button
                    onClick={() => handleDelete(seller._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {seller.verify ? (
                    <button className="btn btn-xs btn-info">Verified</button>
                  ) : (
                    <button
                      onClick={() => handleVerify(seller._id)}
                      className="btn btn-xs btn-secondary"
                    >
                      Verify
                    </button>
                  )}
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

export default AllSellers;
