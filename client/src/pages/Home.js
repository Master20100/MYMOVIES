import React from 'react';
import { NavLink, Router } from "react-router-dom";
import { Login } from './Login';


export const Home = () => {
 

  return (<>



  <NavLink
    className="navbar-item"
    activeClassName="is-active"
    to="/"
    exact
>
	Home
</NavLink>
  
    <div>Home</div>
    <button>Login</button>
    <button>Register</button>
    </>
  )
}
