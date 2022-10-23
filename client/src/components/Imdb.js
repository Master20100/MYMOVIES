import React, { useState } from 'react'

export default function ImdbNew() {
    const [movies, setMovies] = useState([])
    const fetchImdb = async () => {
        const tempTitle = [];
        const tempName = [];
        const tempRating = [];
        const tempYear = [];
        const tempPlot = [];
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

            })
        }
    //    console.log(tempPlot[0]);
        tempTitle.map((title,index)=> {
            data.push({
                title,
                rating: tempRating[index],
                name: tempName[index],
                year:tempYear[index],
                plot:tempPlot[index]
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
        {
        
        movies.map(movie => (
            <div>
            <button>Save to favorites</button>
            <ul>
            <li>{movie.title}</li>
            <li>{movie.rating}</li>
            <li>{movie.name}</li>
            <li>{movie.year}</li>
            <li>{movie.plot}</li>
            </ul>
            </div>
        ))
        
        
        }
        <button>save all</button>
        </>
    )
}
