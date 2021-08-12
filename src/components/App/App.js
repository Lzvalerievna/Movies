
import React,{useEffect,useState}  from 'react';
import 'antd/dist/antd.css';
import {Tabs} from 'antd';
import { debounce } from 'lodash';
import InputSearch from '../search/search';
import MoviesList from '../moviesList/movieslist';
import Spinner from '../spin/spin';
import PaginationMovies from '../pagination/pagination';
import ErrorFetch from '../errorFetch/errorFetch';
import GenreContext from '../../genreContext/genreContext';
import SwapiService from '../../Api/service';
import './App.css';

const { TabPane } = Tabs;

export default function App() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [termSearch,setTermSearch] = useState('return')
  const [err, setErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState('')
  const [totalPage, setTotalPage] = useState(0)
  const [genres, setGenres] = useState([])
  const [guestSession, setGuestSession] = useState('')
  const [movieRated, setMovieRated] = useState([])

  const swapiService = new SwapiService()
 

  useEffect(() => {
    setLoading(true)
    swapiService
      .getMoviesDefault(termSearch)
      .then(data => {
      setMovies(data.results)
      setLoading(false)
      setErr(false)
      })
  },[]);

  const handleOnInput = (ev, pageNumber) => { 
        const text = ev.target.value.trim()
        setLoading(true)
        setErr(false)
        if(text !== '') {
          swapiService
          .getMoviesDefault(text,pageNumber)
          .then(data => {
          if(data.results.length === 0) {
          setErrorMessage('The search did not  any results')
          setMovies([])
          setErr(true)
          }else {   
            setLoading(false)
            setTermSearch(text)
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
      setTotalPage(0)
    }

    useEffect(() => {   
      swapiService
        .getGenre()  
        .then(res =>  {setGenres(res.genres)})
    },[]) 

    useEffect(() => { 
      swapiService 
        .getSessionId()
        .then(obj => { setGuestSession(obj.guest_session_id)})
    },[])

    useEffect(() => {
      const updatedMovies = movies.map((movie) => {
        const aaa = movieRated.find(item => item.id === movie.id)
        if(aaa) {
          movie.rating = aaa.rating
          console.log(movie.rating )
          return movie
        }
          return movie
        })
      setMovies(updatedMovies)
      console.log(updatedMovies)
    },[movieRated])

    const getRated = (activeKey) => {  
    if (activeKey === '2') {
      swapiService
        .getRated(guestSession)
        .then(res => res.json())
        .then(data => {  
        setMovieRated(data.results)
        })
        .catch(error => {
        setErrorMessage('Could not fetch',error)
        setErr(true)
        })
      }
    }

    const nextPage = (pageNumber,value) => {
      swapiService
        .getNextPage(value,pageNumber)
        .then(data => {
        setMovies(data.results)
        setCurrentPage(pageNumber) 
      })
  
    };

  const handleOnChange = debounce(handleOnInput, 1000)

    return (
      <div>
        <GenreContext.Provider value = {genres}>  
        <Tabs defaultActiveKey="1" onChange={getRated} centered>
           <TabPane  tab="Search" key="1">
              < InputSearch handleOnChange={handleOnChange}/>
                {err ? <ErrorFetch errorMessage = {errorMessage}/> : null}
                {loading ? <Spinner /> : null}
                {!(loading || err) ?  < MoviesList movies={movies} 
                  guestSession={guestSession}
                /> : null}
                {totalPage > 20 ?   < PaginationMovies 
                  currentPage = {currentPage} 
                  nextPage = {nextPage}
                  totalPage = {totalPage}
                  termSearch ={termSearch}
                /> : ''}
           </TabPane>
           <TabPane tab="Rated" key="2" >
              < MoviesList movies={movieRated}/>
           </TabPane>
        </Tabs>
        </GenreContext.Provider>
      </div>
    )
}

