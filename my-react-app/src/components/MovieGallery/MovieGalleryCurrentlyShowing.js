// import Movie from '../Movie/Movie';
// import './MovieGalleryCurrentlyShowing.css';

// import { useState } from 'react';
// import { useEffect } from 'react';

// function MovieGalleryCurrentlyShowing() {

//     const[curentlyShowingMovies,setCurrentlyShowingMovies] = useState([])

//     useEffect(()=> {       
//         fetch("http://localhost:8080/movie/get/coming/soon/false")
//         .then(res=>res.json())
//         .then((result)=>{
//             console.log(result);
//             setCurrentlyShowingMovies(result);
//         }
//         ) 
//         .catch(rejected => {
//             console.log(rejected);
//         })   
//     },[])

//     const currentlyShowingMoviesList = curentlyShowingMovies.map((movie, k) => <Movie movie = {movie} key ={k}/>);

//     return (
//         <div className="MovieGallery">
//             {currentlyShowingMoviesList}
//         </div>
//     );

// }

// export default MovieGalleryCurrentlyShowing;

import Movie from '../Movie/Movie';
import './MovieGalleryCurrentlyShowing.css';

import { useState, useEffect } from 'react';

function MovieGalleryCurrentlyShowing() {
    const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/movie/get/coming/soon/false")
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                setCurrentlyShowingMovies(result);
            })
            .catch(rejected => {
                console.log(rejected);
            })
    }, [])

    const currentlyShowingMoviesList = currentlyShowingMovies.map((movie, k) => <Movie movie={movie} key={k} />);

    return (
        <div className="MovieGallerySection">
            <div className="MovieGallery">
                {currentlyShowingMoviesList}
            </div>
        </div>
    );
}

export default MovieGalleryCurrentlyShowing;
