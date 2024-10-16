import { useState } from 'react';
import './App.css'
import MovieList from './components/Movie/MovieList'

function App() {
  
  const dummyData = [{
    id: 1,
    title: 'The Godfather',
    release_date: "1972-01-20",
    opening_crawl: 'Francis Ford Coppola',
  },
  {
    id: 2,
    title: 'Pulp Fiction',
    release_date: "1994-03-29",
    opening_crawl: 'Quentin Tarantino',
  }
]

const [movieList, setMovieList] = useState([]);
const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try{
      setIsLoading(true)
      const response = await fetch('https://swapi.dev/api/films')
      
      const data = await response.json()
      
      setMovieList(data.results)
      setIsLoading(false)
    } catch(err){
      console.error('Error fetching movies:', err)
      setMovieList([])
      setIsLoading(false)
    }
  }

  return (
    <>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
      <MovieList  movieList={movieList} isLoading={isLoading}/>
      </section>
    </>
  )
}

export default App
