import Movie from '../Movie/Movie';
import './MovieGalleryComingSoon.css';

import { useState } from 'react';
import { useEffect } from 'react';

function MovieGalleryComingSoon() {

    const[comingSoonMovies,setComingSoonMovies] = useState([])

    useEffect(()=> {
        fetch("http://localhost:8080/movie/get/coming/soon/true")
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setComingSoonMovies(result);
        }
        )
    },[])

    const comingSoonMoviesList = comingSoonMovies.map((movie, k) => <Movie movie = {movie} key ={k}/>);
    

    return (
        <div className="MovieGallery">
            {comingSoonMoviesList} 
        </div>
    );

}

export default MovieGalleryComingSoon;