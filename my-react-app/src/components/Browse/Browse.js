import './Browse.css';
import React from "react"
import { useState } from 'react';
import Movie from '../Movie/Movie';
  
function Browse() {

  const[movies,setMovies] = useState([]);
  const[userSearch,setSearch] = useState('');
  const[searchBy,setSearchBy] = useState('')

  const handleSelectChange = (event) => {
    setSearchBy(event.target.value);
  };

        const handleClick = () => {
        if (userSearch.trim() === '') {
          return;
        }
        console.log(searchBy);
        let trimmedSearchBy = searchBy.trim();
        const apiUrl = `http://localhost:8080/movie/search/${trimmedSearchBy}/${userSearch}`;
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            setMovies(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

    return (
      <div className = "browse">

        <div className = "searchBar">
          <label>Search By: </label>
          <select value={searchBy} onChange={handleSelectChange}>
            <option value="">Select...</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
          </select>
          <input type='text' placeholder='Input' id='input'value={userSearch} onChange={(e)=>setSearch(e.target.value)}/>
          <button type='submit'onClick={handleClick}>Search</button>
        </div>

        <div className='Results'>
        {movies.length !== 0 ? (
          movies.map(movie => (
            <Movie movie={movie} key={movie.id} />
              ))
          ) : (
            <p>No movies fitting that description</p>
          )}
        </div>

      </div>

    );

}

export default Browse;
