import './Browse.css';
import React from "react"
import { useState } from 'react';
import { useEffect } from 'react';
  
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
    
         <div className = "searchBar">
            <input type='text' placeholder='Movie Name..' id='input'value={userSearch} onChange={(e)=>setSearch(e.target.value)}/>
             <button type='submit'onClick={handleClick}>Search</button>
             {movies.map(movie =>(
                <h3>{movie.title} {movie.id}</h3>
             ))}
        </div>

    );

}

export default Browse;
