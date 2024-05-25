import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler = useCallback( async()=> {
    setLoading(true);
    setError(null);

  try {
      const response = await fetch("https://swapi.dev/api/films/")
      const data = await response.json();
      if(!response.ok){
        throw new Error('Something went wrong')
      }
     
      const transformed = data.results.map((movieData) => {
        return ({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        })
      });
      setMovies(transformed);
     
    }
    catch (error) {
        setError(error.message)
    }
    setLoading(false);
  },[]);

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

   return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        { !loading && <MoviesList movies={movies} />}
        { loading && <p>Loading...</p>}
        { !loading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
