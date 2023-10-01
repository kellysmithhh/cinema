import './Movie.css';
import React from "react"
import { useState } from 'react';
import { useEffect } from 'react';

function Movie() {

    const[movies,setMovies] = useState([])


    useEffect(()=> {
        fetch("http://localhost:8080/movie/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setMovies(result);
        }
        )
    },[])

    return (
        <div className="Movie">
            <div id = "MovieBlock">
            
                <div className = "movieImage">
                
                </div>

                <div className = "movieInfo">
                    <h1>Barbie</h1>

                    <div className = "rating">
                        <h2>PG-13</h2>
                        <h2>2h 13m</h2>
                    </div>
                    
                    <div className='button'>
                        <button>Book Ticket</button>
                    </div>
                    
                </div>

            </div>
        </div>
    );

}

export default Movie;