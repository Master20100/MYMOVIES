import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import { Form } from "antd";
import auth from "../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
export const User = () => {
  const [getUserInfo, { loading, data }] = useLazyQuery(QUERY_ME);

  console.log("data", data);

  console.log("auth.loggedIn()", auth.loggedIn());
  console.log("auth.getUser()", auth.getUser());
  return (
    <>
      <div>{auth.loggedIn() ? auth.getUser().email : ""}</div>
      <div>Saved movies</div>
      <Link to="/">Back </Link>
      <Link to="/Imdb">Seacrh more </Link>
      <Link
        onClick={() => {
          auth.logout();
          alert("logout successful");
        }}
      >
        Sign Out{" "}
      </Link>

      <Form>
        <label for="filterBy">Filter by:</label>
        <select id="filterParameter" name="filterBy">
          <option value="Rating">Rating</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
          <option value="plot">Plot</option>
        </select>
        <Input type="input" />
        {/* <input type="Button" value={document.getElementById("filterParameter").value}/> */}
        <br />
        <Input type="Button" onClick={getUserInfo} value="Saved movies" />
      </Form>
      {data?.me.favourite_movies.map((movie) => (
        <div>
          <ul>
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
