

import React,{useEffect,useState}  from 'react';
import 'antd/dist/antd.css';
import {Tabs} from 'antd';
import { debounce } from 'lodash';
import InputSearch from '../inputSearch/inputSearch';
import MoviesList from '../moviesList/movieslist';
import Spinner from '../spinner/spinner';
import PaginationMovies from '../pagination/pagination';
import ErrorFetch from '../errorFetch/errorFetch';
import GenreContext from '../../genreContext/genreContext';
import SwapiService from '../../Api/service';
import './App.css';

const { TabPane } = Tabs;

export default function App() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentRate, setCurrentRate] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [genres, setGenres] = useState([])
  const [guestSession, setGuestSession] = useState('')
  const [movieRated, setMovieRated] = useState([])
  const [idStar, setIdStar] = useState([])
  const [activPage, setActivePage] = useState('1')
  const [input, setInput] = useState('return')


  const swapiService = new SwapiService()
 

  useEffect(() => {
    swapiService
      .getSearchMovies()
      .then(data => {
      setMovies(data.results)
      setTotalPage(data.total_results)
      setCurrentPage(1)
      setLoading(false)
      setErr(false)
      })
    swapiService
      .getGenre()  
      .then(res =>  {setGenres(res.genres)})
    swapiService 
      .getSessionId()
      .then(obj => { setGuestSession(obj.guest_session_id)})
  },[]);

  const handleOnInput = (ev, pageNumber) => { 
    const text = ev.target.value.trim();
    if(text !== "") {
      setInput(text)
      swapiService
      .getSearchMovies(text,pageNumber)
      .then(data => {
      if(data.results.length === 0) {
      setErrorMessage('The search did not  any results')
      setMovies([])
      setErr(true)
      }else {   
        setLoading(false)
        setErr(false)
        setMovies(data.results)
        setTotalPage(data.total_results)
        setCurrentPage(1)
      }
      })
      .catch(error => {
        setErrorMessage('Could not fetch',error)
        setErr(true)
      })
    }
  }


  useEffect(() => {
    if (activPage === '1') {
      setActivePage('1')
      swapiService
        .getSearchMovies(input,currentPage)
        .then(data => {
        setMovies(data.results)
        setTotalPage(data.total_results)
        setLoading(false)
      })
    }
    if (activPage === '2') {
      setTotalPage(0)
      setActivePage('2')
      swapiService
        .getRated(guestSession,currentRate)
        .then(res => res.json())
        .then(data => {  
        setMovieRated(data.results)
        setTotalPage(data.total_results)
        })
      }
  },[activPage,currentRate,currentPage])

  const getRate = (key) => {  
    if (key === '1') {
      setActivePage('1')
    }
    if (key === '2') {
      setActivePage('2')
    }
  };

  const onChange = (page) => {
    if(activPage === '1'){
      setCurrentPage(page)
    }
    if(activPage !== '1') {
      setCurrentRate(page)
    }
  }

  const handleOnChange = debounce(handleOnInput, 1000)

  const functionMovieArr = (obj) => {
    console.log("functionMovieArr");
    const moviesObj = idStar;
    moviesObj.push(obj)
    setIdStar(moviesObj)
  }

  return (
    <div className = 'content'>
      <GenreContext.Provider value = {genres}>  
      <Tabs defaultActiveKey="1" onChange={getRate} centered>
        <TabPane  tab="Search" key="1">
          < InputSearch handleOnChange={handleOnChange}/>
            {err ? <ErrorFetch errorMessage = {errorMessage}/> : null}
            {loading ? <Spinner /> : null}
            {!(loading || err) ? < MoviesList movies={movies} functionMovieArr = {functionMovieArr} idStar = {idStar} guestSession={guestSession}/> : null}
            < PaginationMovies currentPage = {currentPage} nextPage = {onChange} totalPage = {totalPage}/>
        </TabPane>
        <TabPane tab="Rated" key="2" >
          < MoviesList movies={movieRated} functionMovieArr = {functionMovieArr} idStar = {idStar}/>
          < PaginationMovies currentPage = {currentRate} nextPage = {onChange} totalPage = {totalPage} />
        </TabPane>
      </Tabs>
      </GenreContext.Provider>
    </div>
  )
}

