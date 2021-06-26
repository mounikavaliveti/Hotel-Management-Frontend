import React, { Component, useState, setState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Container } from 'react-bootstrap';
import axios from "axios";
import { FaAlignRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import logo from "../images/logo.svg";
const Navbar = ({cred, setCred}) =>{
  console.log("Navbarlog"+cred.login);
  console.log(" Navbar"+cred.role);
  let history = useHistory();
   const[open, setOpen] = useState(false);
  
  const handleToggle = () => {
    setState({ open: !open });
  };
 const handleLogout=()=> {
    localStorage.clear();
    setCred(false,'', '');
  }
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Beach Resort" />
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={open ? "nav-links show-nav" : "nav-links"}
          >
             <li>
              <Link to="/">Home</Link>
            </li>
          { !cred.login &&<li>
              <Link to="/signIn">Login</Link>
            </li>}
            { !cred.login &&<li>
              <Link to="/signup">Signup</Link>
            </li>}
           
            {cred.login&& cred.role=='admin' && <li>
              <Link to="/staff">Staff</Link>
            </li>}
            
           {cred.login && (cred.role=='admin'||cred.role=='manager') && <li>
              <Link to="/inventory">Inventory</Link>
            </li>}
            {cred.login &&<li>
              <Link onClick={()=>handleLogout()} to="/">Logout</Link>
            </li>}
          </ul>
        </div>
      </nav>
    );
  };
  export default Navbar;
