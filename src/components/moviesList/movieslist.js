import React from 'react';
import 'antd/dist/antd.css';
import './moviesList.css';
import PropTypes from "prop-types";
import CardMovies from '../cardMovies/cardMovies';

export default function MoviesList({movies, guestSession}) {

  console.log(movies)

  MoviesList.propTypes = {
    movies: PropTypes.oneOfType([PropTypes.array]).isRequired,
    guestSession: PropTypes.string.isRequired
  };
 
  return ( 
    <div className = "movies_container">
      {movies.map((movie) =>  
         < CardMovies key={movie.id}  {...movie} 
           guestSession = {guestSession}
        />
      )}   
    </div>
  )
}
 