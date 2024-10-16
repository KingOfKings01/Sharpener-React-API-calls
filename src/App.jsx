import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import MovieList from './components/Movie/MovieList';
import AddForm from './components/Movie/AddForm';

function App() {
  const dummyData = [
    {
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
  ];

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(false);
  const retryTimeoutRef = useRef(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_FIREBASE_PATH);
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();

      console.log(data);

      const loadedMovie = []

      for (const key in data){
        loadedMovie.push({
          id: key,
          title: data[key].title,
          release_date: data[key].release_date,
          opening: data[key].opening,
        });
      }

      setMovieList(loadedMovie);
      setError("");
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err.message);
      setMovieList([]);
      if (retry) {
        retryTimeoutRef.current = setTimeout(fetchMovies, 5000);
      }
    }
    setIsLoading(false);
  },[])

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const retryFetch = () => {
    setRetry(true);
    fetchMovies();
  };

  const cancelRetry = () => {
    setRetry(false);
    clearTimeout(retryTimeoutRef.current);
    setError("Cancelled retry");
  };

  let content = <p>No movies found!</p>;

  if (movieList.length > 0) {
    content = <MovieList movieList={movieList} setMovieList={setMovieList} />;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <section>
        <AddForm setMovieList={setMovieList}/>
      </section>

      <section>
        <button onClick={retryFetch}>Fetch Movies</button>
        {retry && error && movieList.length == 0 && <button onClick={cancelRetry}>Cancel Retry</button>}
      </section>

      <section>
        <h1>MovieList</h1>
        {content}
      </section>
    </>
  );
}

export default App;
