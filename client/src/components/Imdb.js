import React, { useState,useEffect } from 'react';


const Imdb = ()=>{
const [titles, setTitle] = useState([]);
const [names, setName] = useState([]);
const [ratings, setRating] = useState([]);

//each page has 50 titles

useEffect(()=> {
  //for loop to be fixed
  for (let increment = 1; increment < 200 ; increment+=50) {
  fetch(`https://www.imdb.com/search/title/?genres=comedy,action&start=${increment}&explore=title_type,genres&ref_=adv_nxt`)
  .then(res=>{
    return res.text();
  })
  .then((page)=>{
  let titlesBlocks = page.split(`class="lister-item mode-advanced"`);
//get movies title block
titlesBlocks.splice(0,1);
//filter title html blocks to get title number

setTitle(titlesBlocks.map(titleBlock=>titleBlock.split(`title/`)[1]).map(title=>title.split(`/?`)[0]));

setName(titlesBlocks.map(titleBlock=>titleBlock.split(`<img alt=`)[1]).map(name=>name.split(`class`)[0]));

setRating(titlesBlocks.map(titlesBlock=>titlesBlock.split(`strong>`)[1]).map(rating=>{
  try{
    return rating.split(`<`)[0]}
  catch{
    return "no rating"
  }
}))  

   } 
   )}
  } ,[])
  
  return(
    <div>
   {titles.map((title,index) => (
        <h1>{`${index} ${title} ${names[index]} ${ratings[index]}}`}</h1>
      ))}

    </div>
  )
  
    
    
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