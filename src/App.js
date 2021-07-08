
import React,{useEffect,useState}  from 'react';
import 'antd/dist/antd.css';
import { Pagination} from 'antd';
import { debounce } from 'lodash';
import InputSearch from './components/search/search';
import TabPanel from './components/tabpanel/tabpanel';
import MoviesList from './components/moviesList/movieslist';
import './App.css';
import ErrorFetch from './components/errorFetch/errorFetch';
import Spinner from './components/spin/spin';



export default function App(){
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(true)
const [termSearch,setTermSearch] = useState('return')
const [err, setErr] = useState(false)
const [errorMessage, setErrorMessage] = useState('')
const [errorMessage2, setErrorMessage2] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [totalPage, setTotalPage] = useState(0)


const moviePage = `https://api.themoviedb.org/3/search/movie?api_key=7ffce4f49b66e12f59dd06c5256de3c2&language=en-US&query=${termSearch}`

 const getDefaultMovies = async (url) => {

  try{
      const res = await fetch(url);
      if(!res.ok) {
        setErr(true)
        setErrorMessage2('The search did not  any results')
        console.log(res.status)
      }
      const body =  await res.json()
      return body;
  }catch (error) {
      setErr(true)
      setErrorMessage('Could not fetch, check the connection')
      console.log("Could not fetch")
      return false;
  }
  
}

useEffect(() =>{
  setLoading(true)
  getDefaultMovies(moviePage)
 .then((data) => {
   setMovies(data.results)
   setLoading(false)
   setErr(false)
 });
}, []);


const handleOnInput = (ev, pageNumber) => { 
    const text = ev.target.value
    const getMovies = `https://api.themoviedb.org/3/search/movie?api_key=7ffce4f49b66e12f59dd06c5256de3c2&language=en-US&query=${text}&page=${pageNumber}`
      setLoading(true)
      setErr(false)
      if(text !== '') {
        getDefaultMovies(getMovies)    
        .then(data => {
        if(data.results.length === 0) {
        setMovies([])
        setErr(true)
        setErrorMessage2('The search did not  any results')
        }else {   
          getDefaultMovies(getMovies)    
          .then(response => {
          setLoading(false)
          setTermSearch(text)
          setMovies(response.results)
          setTotalPage(response.total_results)
          console.log(response.total_results)
         })
        }
     })
    }
  }

  const nextPage = async(pageNumber,value) => {
         const getMovies2 =  `https://api.themoviedb.org/3/search/movie?api_key=7ffce4f49b66e12f59dd06c5256de3c2&language=en-US&query=${value}&page=${pageNumber}`
         getDefaultMovies(getMovies2)
         .then(data => {
          setMovies(data.result)
          setCurrentPage(pageNumber)
         })

  };

  const handleOnChange = debounce(handleOnInput, 1000)
  
  const hasData = !(loading || err)
  

    return (
      <div>
        <TabPanel/>
        < InputSearch handleOnChange={handleOnChange}/>
        {err ? <ErrorFetch errorMessage = {errorMessage} errorMessage2 = {errorMessage2}/> : null}
        {loading ? <Spinner /> : null}
        {hasData ?  < MoviesList movies={movies} /> : null}
        {totalPage > 20 ?   < Pagination 
        defaultCurrent={1}
        current = {currentPage}
        onChange = {(page) => nextPage(page, termSearch)}
        total={totalPage}
        /> : ''}
      </div>
    )
}