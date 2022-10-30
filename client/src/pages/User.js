import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import { Form } from "antd";
import auth from "../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_MOVIE } from '../utils/mutations';
import "./User.css";


// const deleteFromFavorites= ()=>{
//   const [deleteMovie, { loading, data }] = useLazyQuery(DELETE_MOVIE);

// }

export const User = () => {
  const [getUserInfo, { loading, data }] = useLazyQuery(QUERY_ME);





  return (
    <>
    <div id='links'>
      <div id="userGreeting"><span>Welcome </span>{auth.loggedIn() ? auth.getUser().email : ""}</div>
      {/* <Link className="linkToPages" to="/">Back </Link> */}
      <Link className="linkToPages" to="/Imdb">Search more </Link>
      <Link className="linkToPages"
        onClick={() => {
          auth.logout();
          alert("logout successful");
        }}
      >
        Sign Out{" "}
      </Link>
      </div>
      <Form id="filterForm">
        {/* <label id="filterLabel" for="filterBy">Filter by:</label>
        <select id="filterParameter" name="filterBy">
          <option value="Rating">Rating</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
          <option value="plot">Plot</option>
        </select>
        <Input id="filterInput" type="input" /> */}
        {/* <input type="Button" value={document.getElementById("filterParameter").value}/> */}
        <br />
        <Input type="Button" id="savedResultsButton" onClick={getUserInfo} value="Saved movies" />
      </Form>
      {data?.me.favourite_movies.map((movie) => (
        <div>
          <ul className="movieBlock">
            <li>
              IMDB title: <span className="title">{movie.title}</span>
            </li>
            <li>
              Rating:<span className="rating">{movie.rating}</span>
            </li>
            <li>
              Movie name:<span className="name">{movie.name}</span>
            </li>
            <li>
              Movie year:<span className="year">{movie.year}</span>
            </li>
            <li>
              Plot:<span className="plot">{movie.plot}</span>
            </li>
            <img
              className="image"
              src={movie.image}
              alt={movie.title}
              width="150"
              height="200"
            />
          </ul>
          <Button>Delete from favorites</Button>
        </div>
      ))}
    </>
  );
};
