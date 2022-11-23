 import { Navbar } from 'flowbite-react';
import React from 'react';
 
 const Header = () => {
    return (
        <Navbar
  fluid={true}
  rounded={true}
>
  <Navbar.Brand href="https://i.ibb.co/qnsNZHr/logofilnal.jpg">
    <img
    style={{width:'700', height: '700'}}
      src="https://i.ibb.co/qnsNZHr/logofilnal.jpg"
      className="mr-3 w-10 h-10 rounded-3xl sm:h-9"
      alt="Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Ayesha Auto Reseller 
    </span>
  </Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse>
    <Navbar.Link
      href="/navbars"
      active={true}
    >
      Home
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      About
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Services
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Signin
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Sign Up
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>
    );
 };
 
 export default Header;