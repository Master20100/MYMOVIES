import React from 'react'
import { Link } from 'react-router-dom'

export const User = () => {

const getSavedMovies= ()=>{

  
}
 

  return (
    <>
    <div>Saved movies</div>
    <Link to="/">Back </Link> 
    <Link to="/Imdb">Seacrh more </Link> 
    <Link to="/Home">Sign Out </Link> 
   

<form>
<label for="filterBy">Filter by:</label>
<select name="filterBy" >
 <option value="Rating">Rating</option>
<option value="year">Year</option>
 <option value="title">Title</option>
<option value="plot">Plot</option>
</select>
<input type="Button" value="Go"/>
<input type="Button" value="Saved movies"/>
</form>
</>
)
}