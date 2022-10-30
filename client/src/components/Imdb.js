import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE } from '../utils/mutations';
import { Link } from "react-router-dom";
import {Button} from "antd";
import TokenAuth from '../utils/auth';
import "./Imdb.css";


export default function Imdb() {
    const [addMovie, { error }] = useMutation(ADD_MOVIE);
    
    const saveMovie = async (event) => {
       console.log("year is " + event.target.parentNode.parentElement.querySelector('.year').innerHTML);
        event.preventDefault();
        try {
            const { data } = await addMovie({
                variables: {
                    title: event.target.parentNode.parentElement.querySelector('.title').innerHTML,
                    name: event.target.parentNode.parentElement.querySelector('.name').innerHTML,
                    rating: event.target.parentNode.parentElement.querySelector('.rating').innerHTML,
                    plot: event.target.parentNode.parentElement.querySelector('.plot').innerHTML,
                    year: event.target.parentNode.parentElement.querySelector('.year').innerHTML,
                    image: event.target.parentNode.parentElement.querySelector('.image').src,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };
    const [movies, setMovies] = useState([])
    const fetchImdb = async (genres,noOfMovies) => {
        const tempTitle = [];
        const tempName = [];
        const tempRating = [];
        const tempYear = [];
        const tempPlot = [];
        const tempImage = [];
        const data = [];
        for (let increment = 1; increment < noOfMovies; increment += 50) {
            await fetch(`https://www.imdb.com/search/title/?genres=${genres}&start=${increment}&explore=title_type,genres&ref_=adv_nxt`)
                .then(res => {
                    return res.text();
                })
                .then(page => {
                    let titlesBlocks = page.split(`class="lister-item mode-advanced"`);
                    //get movies title block
                    titlesBlocks.splice(0, 1);
                    //filter title html blocks to get title number

                    tempTitle.push(...titlesBlocks.map(titleBlock => titleBlock.split(`title/`)[1]).map(title => title.split(`/?`)[0]));
                    tempName.push(...titlesBlocks.map(titleBlock => titleBlock.split(`<img alt="`)[1]).map(name => name.split(`"\nclass=`)[0]));
                    tempRating.push(...titlesBlocks.map(titlesBlock => titlesBlock.split(`strong>`)[1]).map(rating => {
                        try {
                            return rating.split(`<`)[0]
                        }
                        catch {
                            return "no rating"
                        }

                    }))
                    tempYear.push(...titlesBlocks.map(titleBlock => titleBlock.split(`<span class="lister-item-year text-muted unbold">`)[1]).map(year => year.split(/[^0-9]/)[1]));

                    // tempPlot.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`<p class="text-muted">`)[1]));
                    tempPlot.push(...titlesBlocks.map(titleBlock => titleBlock.split(`<p class="text-muted">`)[1]).map(plot => plot.split(`</p>`)[0]));
                    tempImage.push(...titlesBlocks.map(titleBlock => titleBlock.split(`loadlate=`)[1]).map(plot => plot.split(`"`)[1]));
                })
        }
        //    console.log(tempPlot[0]);
        tempTitle.map((title, index) => {
            data.push({
                title,
                rating: tempRating[index],
                name: tempName[index],
                year: tempYear[index],
                plot: tempPlot[index],
                image: tempImage[index],
            })
        })
        // console.log(data);
        //setMovies only for display on dom not for console, runs async only for rendering
        setMovies(data);



    }
    const saveAll = async () => {
        await fetch("/api/users/saveData", {
            method: "POST",
            body: JSON.stringify(movies),
            headers: { "Content-Type": "application/json" },
        });
    }

    return (
        <div id="Imdb">
            <Link class="ImdbFields" to="/">Log out </Link>
            <Link class="ImdbFields" to="/User">User page</Link>
            <Button id="ImdbButton" onClick={()=>fetchImdb(document.getElementById("genres").value,document.getElementById("noOfMovies").value,)}>Search</Button>
            <select id="genres" >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Biography">Biography</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Family">Family</option>
                <option value="Fantasy">Fantasy</option>
                <option value="History">History</option>
                <option value="Horror">Horror</option>
                <option value="Music">Music</option>
                <option value="Musical">Musical</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Short">Short</option>
                <option value="Sport">Sport</option>
                <option value="Thriller">Thriller</option>
                <option value="War">War</option>
                <option value="Western">Western</option>
            </select>
            <select id="noOfMovies" >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
            </select>
          
            {(movies.length > 1 ?
                (<>
                <Button onClick={saveAll}>save all</Button>
                {movies.map(movie => (
                    <div>
                        <ul className="movieBlock">
                            <li>IMDB title: <span className="title">{movie.title}</span></li>
                            <li>Rating:<span className="rating">{movie.rating}</span></li>
                            <li>Movie name:<span className="name">{movie.name}</span></li>
                            <li>Movie year:<span className="year">{movie.year}</span></li>
                            <li>Plot:<span className="plot">{movie.plot}</span></li>
                            <img className="image" src={movie.image} alt={movie.title} width="150" height="200"/>
                        </ul>
                        <Button onClick={saveMovie}>Save to favorites</Button>
                    </div>
                )

                )}
                
                </>
                 )
                : "")}
        </div>
    )
}

