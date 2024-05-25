import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler = useCallback( async()=> {
    setLoading(true);
    setError(null);

  try {
      const response = await fetch("https://react-http-251e2-default-rtdb.firebaseio.com/movies.json")
    
      if(!response.ok){
        throw new Error('Something went wrong')
      }
      const data = await response.json();

      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      };

      // const transformed = data.map((movieData) => {
      //   return ({
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date
      //   })
      // });
      setMovies(loadedMovies);
     
    }
    catch (error) {
        setError(error.message)
    }
    setLoading(false);
  },[]);

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

 async function addMovieHandler(movie) {
   const response = await fetch("https://react-http-251e2-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  };

   return (
    <React.Fragment>
      <section>
      <MovieForm onAddMovie={addMovieHandler}/>
      </section>
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
