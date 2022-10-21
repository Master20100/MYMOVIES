import React, { useState } from 'react'

export default function ImdbNew() {
    const [movies, setMovies] = useState([])
    const fetchImdb = async () => {
        const tempTitle = [];
        const tempName = [];
        const tempRating = [];
        const data = [];

        for (let increment = 1; increment < 200 ; increment+=50) {
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
                tempName.push(...titlesBlocks.map(titleBlock=>titleBlock.split(`<img alt=`)[1]).map(name=>name.split(`class`)[0]));
                console.log("inside for",tempTitle[0]);
                tempRating.push(...titlesBlocks.map(titlesBlock=>titlesBlock.split(`strong>`)[1]).map(rating=>{
                    try{
                        return rating.split(`<`)[0]}
                    catch{
                        return "no rating"
                    }

                }))
            })
        }

        tempTitle.map((title,index)=> {
            data.push({
                title,
                rating: tempRating[index],
                name: tempName[index]
            })
        })

        setMovies(data)
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
        {movies.map(movie => (
            <div>{movie.title}</div>
        ))}
        </>
    )
}
