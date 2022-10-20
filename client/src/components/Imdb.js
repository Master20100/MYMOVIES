import React, { useState,useEffect } from 'react';
let titles = [];
let names = [];
let ratings = [];
const movies = {};
// let new1 = [];
// const [titles, setTitle] = useState([]);

const Imdb = ()=>{
//each page has 50 titles

useEffect(()=> {
  fetch(`https://www.imdb.com/search/title/?genres=comedy,action&start=${1}&explore=title_type,genres&ref_=adv_nxt`)
  .then(res=>{
    return res.text();
  })
  .then((page)=>{
  let titlesBlocks = page.split(`class="lister-item mode-advanced"`);
//get movies title block
titlesBlocks.splice(0,1);
//filter title html blocks to get title number
titles = titlesBlocks.map(titleBlock=>titleBlock.split(`title/`)[1]).map(title=>title.split(`/?`)[0]);
console.log(titles);
names = titlesBlocks.map(titleBlock=>titleBlock.split(`<img alt=`)[1]).map(name=>name.split(`class`)[0]);
console.log(names);

ratings = titlesBlocks.map(titlesBlock=>titlesBlock.split(`strong>`)[1]).map(rating=>{
  try{
    return rating.split(`<`)[0]}
  catch{
    return "no rating"
  }
})   
  console.log(ratings)
   } )
  } ,[])



  // }
  //put names and titles of movies in movies object
  for (let index = 0; index < titles.length; index++) {
    movies[titles[index]] = names[index];
  }
  
  return(
    <div>
    {console.log("titles")}
   <h1>MOVIES</h1>
   <h1>{titles}</h1>
    </div>
  )
  // return(
    //   <div>hello</div>
    //   )
    // console.log(movies);
    
    
    
    
  }
  
  export default Imdb;


























  
  // class="global-sprite rating-star imdb-rating"
  // titles = titles.map(title=>title.split(`/?`)[0]);
  // titles = titles.map(title=>title.split(`/?`)[0]);
  // titles =  titles.map(title=>title.split(`/?`));
  //remove duplicates
  // titles = [...new Set(titles)];
  
  // const nameBlocks = page.split(`/?ref_=adv_li_tt"`);
  // //remove the first element which does not have a movie name
  // nameBlocks.splice(0, 1);
  // //filter name html blocks to get movie name
  // names = nameBlocks.map(nameBlock=>nameBlock.split(`</a>`)[0]);
  
  // const ratingBlocks = page.split(`<div class="inline-block ratings-imdb-rating" name="ir" data-value="`);
  
  // remove the first element which does not a rating block
  // ratingBlocks.splice(0, 1);
  //filter rating html blocks to get rating
  // ratings = ratingBlocks.map(ratingBlock=>ratingBlock.split(`>`)[0]);
  // for (let increment = 1; increment < 2 ; increment++) {
  // console.log("1");
  // const response  = await fetch(`https://www.imdb.com/search/title/?genres=comedy,action&start=${increment}&explore=title_type,genres&ref_=adv_nxt`);
  // const page = await response.text();
  // let titlesBlocks = page.split(`class="lister-item mode-advanced"`);
  // //get movies title block
  // titlesBlocks.splice(0,1);
  
  // //filter title html blocks to get title number
  // titles = titlesBlocks.map(titleBlock=>titleBlock.split(`title/`)[1]);
  // titles = titles.map(title=>title.split(`/?`)[0]);
  
  // names = titlesBlocks.map(titleBlock=>titleBlock.split(`<img alt=`)[1]);
  // names = names.map(name=>name.split(`class`)[0]);
  
  // ratings = titlesBlocks.map(titlesBlock=>titlesBlock.split(`strong>`)[1]);
  // ratings = ratings.map(rating=>{
  //   try{
  //     return rating.split(`<`)[0]}
  //   catch{
  //     return "no rating"
  //   }
  // })
  
  // // ratings = ratings.map(rating=>rating.split(`<strong></strong>)`)[1]);