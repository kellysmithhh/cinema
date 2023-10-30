import Movie from '../Movie/Movie';
import './MovieGallery.css';

import { useState } from 'react';
import { useEffect } from 'react';

function MovieGallery() {

    const[movies,setMovies] = useState([])

    useEffect(()=> {
        fetch("http://localhost:8080/movie/getAll")
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setMovies(result);
        }
        )
    },[])

    const moviesList = movies.map((movie, k) => <Movie movie = {movie} key ={k}/>);
    

    return (
        <div className="MovieGallery">
            {moviesList} 
        </div>
    );

}

export default MovieGallery;