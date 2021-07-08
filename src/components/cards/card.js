import React from 'react';
import 'antd/dist/antd.css';
import PropTypes from "prop-types";
import './card.css';



const apiImg = 'http://image.tmdb.org/t/p/w1280'


export default function CardMovies( {title, poster_path, release_date, vote_average, overview}) {
  
  const date = new Date(release_date);
  const options = { year: 'numeric', month: 'long', day: 'numeric'}
  const  releaseDate = date.toLocaleDateString("en-CA", options)
 

  CardMovies.propTypes = {
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired
  };

    if(apiImg + poster_path === null) {
      console.log('poster_path undefined')
   }
   let classNames = "voteAverage"
   if(vote_average < 3) {
       classNames = "red"
   }if(vote_average >= 3) {
      classNames = "orange"
   }if(vote_average >= 5) {
      classNames = "welloy"
   }if(vote_average >= 7) {
      classNames = "green"
   }
        return (
            <div className = "cardMovie">
                      <img src= {poster_path ? (apiImg + poster_path) : 
                        'https://www.culture.ru/storage/images/114ef5db4413d02df173301f52d0ed82/2dbfc90e4ad57203361eff4a6ea41e14.jpeg'} 
                        alt = {title} className="picture" />
                      <div className="MovieInfo">
                         <h1 className="title">{title}</h1>
                         <h2 className="releaseDate">{releaseDate}</h2>
                         <h3 className="overview">{overview}</h3>
                      </div>
                      <div>
                          <h3 className={classNames}>{vote_average}</h3>
                      </div>
            </div>
        )
    }