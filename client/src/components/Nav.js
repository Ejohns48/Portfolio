import '../css/App.css';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import React from 'react'

function Nav() {

  return (
    <div id='header-container'>
      <Header 
        imgsrc="logo6.png"
        imgheight= "125vh"
        imgwidth= "125vh"
        alttext="Logo Image"        
      />
      <nav>
        <NavLink to="/home" ><li>Home</li></NavLink>
        <NavLink to="/about"><li>About</li></NavLink>            
        <NavLink to="/contact"><li>Contact</li></NavLink>
        <NavLink to="/portfolio"><li>Portfolio</li></NavLink> 
      </nav>
    </div>
  );

}

export default Nav;
