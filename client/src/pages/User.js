import React from 'react'
import { Link } from 'react-router-dom'
import {Input} from "antd";
import {Form} from "antd";
export const User = () => {

const getSavedMovies= ()=>{

  
}
 

  return (
    <>
    <div>Saved movies</div>
    <Link to="/">Back </Link> 
    <Link to="/Imdb">Seacrh more </Link> 
    <Link to="/Home">Sign Out </Link> 
   

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