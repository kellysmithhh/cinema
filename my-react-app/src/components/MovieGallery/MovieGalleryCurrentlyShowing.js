import Movie from '../Movie/Movie';
import './MovieGalleryCurrentlyShowing.css';

import { useState } from 'react';
import { useEffect } from 'react';

function MovieGalleryCurrentlyShowing() {

    const[curentlyShowingMovies,setCurrentlyShowingMovies] = useState([])

    useEffect(()=> {
        fetch("http://localhost:8080/movie/get/coming/soon/false")
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setCurrentlyShowingMovies(result);
        }
        )
    },[])

    const currentlyShowingMoviesList = curentlyShowingMovies.map((movie, k) => <Movie movie = {movie} key ={k}/>);

    return (
        <div className="MovieGallery">
            {currentlyShowingMoviesList}
        </div>
    );

}

export default MovieGalleryCurrentlyShowing;