import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE } from '../utils/mutations';
export default function Imdb() {
    const [addMovie, { error }] = useMutation(ADD_MOVIE);
    const saveMovie = async (event) => {
        console.log(event.target.parentNode.querySelector('.title').innerHTML);

        event.preventDefault();
        try {
          const { data } = await addMovie({
            variables: { 
                title:event.target.parentNode.querySelector('.title').innerHTML,
                name:event.target.parentNode.querySelector('.name').innerHTML, 
                rating:event.target.parentNode.querySelector('.rating').innerHTML,
                year: event.target.parentNode.querySelector('.year').innerHTML,
                plot: event.target.parentNode.querySelector('.plot').innerHTML, 
                image: event.target.parentNode.querySelector('.image').innerHTML, 
            },
          });
    
        } catch (err) {
          console.error(err);
        }
      };


    
    const [movies, setMovies] = useState([])
    const fetchImdb = async () => {
        const tempTitle = [];
        const tempName = [];
        const tempRating = [];
        const tempYear = [];
        const tempPlot = [];
        const tempImage = [];
        const data = [];

        for (let increment = 1; increment < 51 ; increment+=50) {
            await fetch(`https://www.imdb.com/search/title/?genres=comedy,action&start=${increment}&explore=title_type,genres&ref_=adv_nxt`)
            .then(res=>{
                return res.text();
            })
            .then(page=> {
                let titlesBlocks = page.split(`class="lister-item mode-advanced"`);
                //get movies title block
                titlesBlocks.splice(0,1);
                //filter title html blocks to get title number

                tempTitle.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`title/`)[1]).map(title=>title.split(`/?`)[0]));
                tempName.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`<img alt=`)[1]).map(name=>name.split(`"\nclass=`)[0]));
                // console.log("inside for",tempTitle[0]);
                tempRating.push(...titlesBlocks.map(titlesBlock=>titlesBlock.split(`strong>`)[1]).map(rating=>{
                    try{
                        return rating.split(`<`)[0]}
                        catch{
                            return "no rating"
                        }
                        
                    }))
                tempYear.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`<span class="lister-item-year text-muted unbold">`)[1]).map(year=>year.split(/[^0-9]/)[1]));

                // tempPlot.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`<p class="text-muted">`)[1]));
                tempPlot.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`<p class="text-muted">`)[1]).map(plot=>plot.split(`</p>`)[0]));
                tempImage.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`loadlate=`)[1]).map(plot=>plot.split(`"`)[1]));
            })
        }
    //    console.log(tempPlot[0]);
        tempTitle.map((title,index)=> {
            data.push({
                title,
                rating: tempRating[index],
                name: tempName[index],
                year:tempYear[index],
                plot:tempPlot[index],
                image:tempImage[index],
            })
        })
// console.log(data);
        setMovies(data);
        console.log(movies);
        console.log(movies.length);
         const response = async()=>{await fetch("/api/users/saveData", {
    method: "POST",
    body: JSON.stringify(movies),
    headers: { "Content-Type": "application/json" },
  });}
  response();
        
    }

    




    return (
        <>
        <button onClick={fetchImdb}>Submit</button>
        <button onClick={saveMovie}>Save Movie</button>
        {
        
        movies.map(movie => (
            <div>
            <ul>
            <li className="title">{movie.title}</li>
            <li className="rating">{movie.rating}</li>
            <li className="name">{movie.name}</li>
            <li className="year">{movie.year}</li>
            <li className="plot">{movie.plot}</li>
            <li className="image">{movie.image}</li>
            </ul>
            <button onClick={saveMovie}>Save to favorites</button>
            </div>
        ))
        
        
        }
        <button onClick={""}>save all</button>
        </>
    )
}

