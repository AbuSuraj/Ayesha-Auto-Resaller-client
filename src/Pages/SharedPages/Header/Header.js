import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    let activeStyle = {
        backgroundColor: 'BFEAF5',
        // color: 'black',
        paddingLeft: '4px',
        paddingRight: '4px',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderRadius: '10px'
      };
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }
    const menuItems = <React.Fragment>
  <li><NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }   to="/">Home</NavLink></li>
  <li><NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  to="/blog">Blog</NavLink></li>
  {/* <li><Link to="/login">Sign In</Link></li> */}
  
  {user?.uid ?
      <>
          <li><NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } > {user?.displayName}</NavLink></li>
          <li><button onClick={handleLogOut}>Sign out</button></li>
      </>
      : 
      <>
      <li><NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } to="/login">Sign In</NavLink></li>
      <li><NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  to="/register">Sign Up</NavLink></li>
      </>
      
      }
</React.Fragment>
    return (
        <div className="navbar bg-base-200 flex justify-between">
        <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <nav tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {menuItems}
                </nav>
            </div>
            <img
                  className="rounded-full"
                  style={{ width: 40, height: 40 }}
                  src="https://i.ibb.co/qnsNZHr/logofilnal.jpg"
                  alt="logo"
                ></img>
            <Link to="/" className="btn btn-ghost normal-case text-xl">Ayesha Auto Reseller</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
                {menuItems}
            </ul>
        </div>
        <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
    </div>
    );
};

export default Header;