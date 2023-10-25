import './Browse.css';
import React from "react"
import { useState } from 'react';
import { useEffect } from 'react';
import Movie from '../Movie/Movie';
  
function Browse() {

    const[movies,setMovies] = useState([]);
    const[userSearch,setSearch] = useState('');

        const handleClick = () => {
        if (userSearch.trim() === '') {
          return;
        }
    
        const apiUrl = `http://localhost:8080/movie/search/${userSearch}`;
    
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
                    <input type='text' placeholder='Movie Title..' id='input'value={userSearch} onChange={(e)=>setSearch(e.target.value)}/>
                    <button type='submit'onClick={handleClick}>Search</button>
        </div>

        <div className='Results'>
            {movies.map(movie =>(
                <Movie movie = {movie} />
            ))}
        </div>
        

      </div>
        

    );

}

export default Browse;
