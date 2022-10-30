import React from 'react';
import {Link}  from "react-router-dom";
import './About.css';


export const About = () => {
  return (
    <>    
    <div id='DeveloppersTitle'>Developpers</div>
    <div id='Developpers'>
    <br />
    Mina Ghaly
    <br/>
    Zixin Ye
    </div>
    <Link id="backLink" to="/">Back </Link> 
    </>

  )
}
