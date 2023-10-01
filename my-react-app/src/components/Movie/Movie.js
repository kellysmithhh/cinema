import './Movie.css';
import React from "react"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/MovieInformation`; 
        navigate(path);
    }

    

    return (
        <div className="Movie">
            <div id = "MovieBlock">

                <div className = "movieImage">
                    <img src ="https://image.tmdb.org/t/p/original/u5kboZR4OMi4QdbOhawCZuzMVWJ.jpg" alt = "barbie poster"/>
                </div>

                <div className = "movieInfo">
                    <h1>Barbie</h1>

                    <div className = "rating">
                        <h2>PG-13</h2>
                        <h2>2h 13m</h2>
                    </div>
                    
                    <div className='button'>
                        <button onClick = {routeChange} type="submit">More Information</button>
                    </div>
                    
                </div>

            </div>
        </div>
    );

}

export default Movie;