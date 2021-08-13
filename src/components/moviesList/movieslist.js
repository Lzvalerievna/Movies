import React from 'react';
import 'antd/dist/antd.css';
import './moviesList.css';
import PropTypes from "prop-types";
import CardMovies from '../cardMovies/cardMovies';

export default function MoviesList({movies, guestSession,functionMovieArr,idStar}) {

  MoviesList.propTypes = {
    movies: PropTypes.oneOfType([PropTypes.array]).isRequired,
    guestSession: PropTypes.string.isRequired,
    functionMovieArr: PropTypes.func.isRequired,
    idStar: PropTypes.oneOfType([PropTypes.array]).isRequired
  };
  
  const elements = movies.map((movie) => {
    idStar.forEach((movieObj) => {
      const copyMovie = movie;
        if (copyMovie.id === movieObj.id) {
          copyMovie.rating = movieObj.stars;
        }
      });

      return ( 
        < CardMovies key={movie.id} {...movie}
          guestSession = {guestSession}
          functionMovieArr = {functionMovieArr}
        />
      )
  });

  return ( 
    <div className = "movies_container"> 
         {elements}
    </div>
  )
}


 