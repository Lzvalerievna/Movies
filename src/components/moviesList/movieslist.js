import React from 'react';
import 'antd/dist/antd.css';
import './moviesList.css';
import PropTypes from "prop-types";
import CardMovies from '../cards/card';




export default function MoviesList({movies}) {

      MoviesList.propTypes = {
            movies: PropTypes.oneOfType([PropTypes.array]).isRequired
          };
  
      return ( 
        <div className = "movies_container"> 
              {movies.map((movie) => < CardMovies key = {movie.id} {...movie}/>)}
        </div>
    )
  
}