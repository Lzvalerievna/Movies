import React, { useContext} from 'react';
import 'antd/dist/antd.css';
import PropTypes from "prop-types";
import './card.css';
import { Rate } from 'antd';
import GenreContext from '../../context';



const apiImg = 'http://image.tmdb.org/t/p/w1280';
const apiBase = 'https://api.themoviedb.org/3';
const apiKey = '7ffce4f49b66e12f59dd06c5256de3c2'

export default function CardMovies( { title, poster_path, release_date, vote_average, overview,genre_ids, guestSession, id,rating}) {

  const genres = useContext(GenreContext);
  

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

   const handleOnChange = (stars) => {
  
    console.log(stars)

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: stars })
      }
        fetch(`${apiBase}/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestSession}`, requestOptions)
        .then(response => console.log(response.json()))   
   }

        return (
            <div key = {id} className = "cardMovie">
                      <img src= {poster_path ? (apiImg + poster_path) : 
                        'https://www.culture.ru/storage/images/114ef5db4413d02df173301f52d0ed82/2dbfc90e4ad57203361eff4a6ea41e14.jpeg'} 
                        alt = {title} className="picture" />
                      <div className="MovieInfo">
                          <div className = "containerTitle">
                              <h1 className="title">{title}</h1>
                              <div className={classNames}>{vote_average}</div>
                          </div>
                          <h2 className="releaseDate">{releaseDate}</h2>
                          <div className="container">
                               {genres_names.map((genre) => <h3 className = "genres">{genre}</h3>)}
                          </div>
                          <h4 className="overview">{overview}</h4>
                     </div>
                     <div>
                       <Rate allowHalf 
                       count = {10}  
                       defaultValue={rating} 
                       onChange={handleOnChange}
                       /></div>
            </div>
        )
    }