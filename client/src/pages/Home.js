import React from 'react';
import { Link, Router } from "react-router-dom";


export const Home = () => {
  return (<>

<Link to="/"> Home</Link>
<Link to="/About">  About  </Link>
<Link to="/login">Login </Link>
<Link to="/Register">Register </Link> 


</>

  
  )
}
