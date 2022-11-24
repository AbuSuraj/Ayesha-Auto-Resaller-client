import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Pages/SharedPages/Footer/Footer';
import Header from "../Pages/SharedPages/Header/Header"
const DashBoardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-slate-100 shadow-2xl">
                        <li className='my-1'><Link to="/dashboard">My Orders</Link></li>
                        <li className='my-1'><Link to="/dashboard/myproducts">My Products</Link></li>
                        <li className='my-1'><Link to="/dashboard/allsellers">All Sellers</Link></li>
                        <li className='my-1'><Link to="/dashboard/allbuyers">All Buyers</Link></li>
                        <li className='my-1'><Link to="/dashboard/reporteditem">Reported Item</Link></li>
                        {/* {
                            isAdmin && <>
                                <li><Link to="/dashboard/allusers">All users</Link></li>
                                <li><Link to="/dashboard/adddoctor">Add A Doctor</Link></li>
                                <li><Link to="/dashboard/managedoctors">Manage Doctors</Link></li>
                            </>
                        } */}

                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoardLayout;