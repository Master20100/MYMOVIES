import React from 'react';
import {Link}  from "react-router-dom";
import './Home.css';



export const Home = () => {
  return (
<div id='home'>
<Link class='linksToPages' to="/Register">Register </Link> 
<Link class='linksToPages' to="/login">Login </Link>
<Link class='linksToPages' to="/About">  About  </Link>
</div>
  
  )
}
