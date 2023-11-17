import Movie from '../Movie/Movie';
import './MovieGalleryComingSoon.css';

import { useState } from 'react';
import { useEffect } from 'react';

function MovieGalleryComingSoon() {

    const[comingSoonMovies,setComingSoonMovies] = useState([])
    const[curentlyShowingMovies,setCurrentlyShowingMovies] = useState([])

    useEffect(()=> {
        fetch("http://localhost:8080/movie/get/coming/soon/true")
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setComingSoonMovies(result);
        }
        )
    },[])

    useEffect(()=> {
        fetch("http://localhost:8080/movie/get/coming/soon/false")
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setCurrentlyShowingMovies(result);
        }
        )
    },[])

    const comingSoonMoviesList = comingSoonMovies.map((movie, k) => <Movie movie = {movie} key ={k}/>);
    const currentlyShowingMoviesList = curentlyShowingMovies.map((movie, k) => <Movie movie = {movie} key ={k}/>);
    

    return (
        <div className="MovieGallery">
            {comingSoonMoviesList} 
            {currentlyShowingMoviesList}
        </div>
    );

}

export default MovieGalleryComingSoon;