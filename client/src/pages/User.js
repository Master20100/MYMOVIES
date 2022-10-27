import React from 'react'
import { Link } from 'react-router-dom'
import {Input} from "antd";
import {Form} from "antd";
import auth from '../utils/auth';
export const User = () => {

const getSavedMovies= ()=>{

  
}
 
console.log("auth.loggedIn()", auth.loggedIn())
console.log("auth.getUser()", auth.getUser())
  return (
    <>
    <div>{auth.loggedIn()? auth.getUser().email:""}</div>
    <div>Saved movies</div>
    <Link to="/">Back </Link> 
    <Link to="/Imdb">Seacrh more </Link> 
    <Link onClick={() =>{auth.logout();alert("logout successful")}}>Sign Out </Link> 
   

<Form>
<label for="filterBy">Filter by:</label>
<select id="filterParameter" name="filterBy" >
 <option value="Rating">Rating</option>
<option value="year">Year</option>
 <option value="title">Title</option>
<option value="plot">Plot</option>
</select>
<Input type="input"/>
{/* <input type="Button" value={document.getElementById("filterParameter").value}/> */}
<br/>
<Input type="Button" value="Saved movies"/>
</Form>
</>
)
}