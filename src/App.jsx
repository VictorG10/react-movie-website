import React, { useState, useEffect } from "react";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/MovieCard";
import "./App.css";

const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=2b3448b8`;

const App = () => {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("bat man");
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  return (
    <div className="app">
      <h1>Search for your favorite movies here</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Type here..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => setMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
