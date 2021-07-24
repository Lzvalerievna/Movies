
import React,{useEffect,useState}  from 'react';
import 'antd/dist/antd.css';
import {Tabs} from 'antd';
import { debounce } from 'lodash';
import InputSearch from './components/search/search';
import MoviesList from './components/moviesList/movieslist';
import './App.css';
import Spinner from './components/spin/spin';
import PaginationMovies from './components/pagination/pagination';
import GenreContext from './context';
import ErrorFetch from './components/errorFetch/errorFetch';
import { getResource } from './service';


const { TabPane } = Tabs;

export default function App() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [termSearch,setTermSearch] = useState('return')
  const [err, setErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [genres, setGenres] = useState([])
  const [guestSession, setGuestSession] = useState([])
  const [movieRated, setMovieRated] = useState([])
 
  const apiBase = 'https://api.themoviedb.org/3';
  const apiKey = '7ffce4f49b66e12f59dd06c5256de3c2'



  useEffect(() => {
    setLoading(true)
    getResource(`${apiBase}/search/movie?api_key=${apiKey}&query=${termSearch}`)
   .then(data => {
     setMovies(data.results)
     console.log(data.results)
     setLoading(false)
     setErr(false)
   })

  }, []);

  const handleOnInput = (ev, pageNumber) => { 
      const text = ev.target.value
      const getMovies = `${apiBase}/search/movie?api_key=${apiKey}&query=${text}&page=${pageNumber}`
        setLoading(true)
        setErr(false)
        if(text !== '') {
          getResource(getMovies)    
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
          }
       })
       .catch(error => {
         setErrorMessage('Could not fetch',error)
         setErr(true)
       })
      }
    }

      useEffect(() => {   
        getResource(`${apiBase}/genre/movie/list?api_key=${apiKey}`)
      .then(res => setGenres(res.genres))
      },[]) 

    useEffect(() => {  
      getResource(`${apiBase}/authentication/guest_session/new?api_key=${apiKey}`)
      .then(obj => {
        setGuestSession(obj.guest_session_id)
        })
    },[])

    const getRated = (activeKey) => {  
      if (activeKey === '2') {
        console.log(guestSession)
        fetch(`${apiBase}/guest_session/${guestSession}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc`)
        .then(res => res.json())
        .then(data => {  
          console.log(data.results)
          setMovieRated(data.results)
        })
        .catch(error => {
          setErrorMessage('Could not fetch',error)
          setErr(true)
        })
    }
  }

    const nextPage = async(pageNumber,value) => {
           const getNextPage =  `${apiBase}/search/movie?api_key=${apiKey}&query=${value}&page=${pageNumber}`
           getResource(getNextPage)
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

