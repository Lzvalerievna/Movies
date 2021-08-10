import React, { useContext, useState} from 'react';
import 'antd/dist/antd.css';
import PropTypes from "prop-types";
import './cardMovies.css'
import { Rate } from 'antd';
import GenreContext from '../../genreContext/genreContext';
import SwapiService from '../../Api/service';



export default function CardMovies( {functionMovieArr, title, poster_path, release_date, vote_average, overview,genre_ids, guestSession, id,rating}) {

  const genres = useContext(GenreContext);
  const swapiService = new SwapiService();
  const movieImg = swapiService.apiImg
  const movieImg2 = swapiService.apiImg2
  const [ratingDefault, setRatingDefault] = useState(rating)
  
  const genres_names = genre_ids
   .map((genre) => genres.filter((item) => item.id === genre))
   .flat()
   .map((genre_obj) => genre_obj.name);

  const date = new Date(release_date);
  const options = { year: 'numeric', month: 'long', day: 'numeric'}
  const  releaseDate = date.toLocaleDateString("en-CA", options)
 

  CardMovies.propTypes = {
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genre_ids: PropTypes.oneOfType([PropTypes.array]).isRequired,
    id:PropTypes.number.isRequired,
    guestSession: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
   };

  if(movieImg + poster_path === null) {
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

  const handleOnChange = (stars) => {
    setRatingDefault(stars)
    functionMovieArr({stars,id})
   swapiService
    .postRated(stars,id,guestSession) 
   }

  return (
    <div className = "cardMovie">
      <img src= {poster_path ? (movieImg + poster_path) : movieImg2 } alt = {title} className="picture" />
        <div className="MovieInfo">
          <div className = "containerTitle">
            <h1 className="title">{title}</h1>
            <div className={classNames}>{vote_average}</div>
          </div>
          <h2 className="releaseDate">{releaseDate}</h2>
          <div className="container">{genres_names.map((genre) => <h3 className = "genres">{genre}</h3>)}</div>
          <h4 className="overview">{overview}</h4>
        </div>
        <div>
          <Rate allowHalf 
            count = {10}  
            defaultValue={ratingDefault} 
            onChange={handleOnChange}
            value={ratingDefault}
          /></div>
      </div>
    )
   }