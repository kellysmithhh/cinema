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
            setMovies(result);
        }
        )
    },[])

    return (
        <div className="MovieGallery">

        <Movie img = "https://image.tmdb.org/t/p/original/u5kboZR4OMi4QdbOhawCZuzMVWJ.jpg" title ="Barbie" MPAA_rating_code ="PG-13" catagory = "Romance"/>
        <Movie img ="https://m.media-amazon.com/images/I/71xDtUSyAKL._AC_UF894,1000_QL80_.jpg" title = "Oppenheimer" MPAA_rating_code ="R"  catagory = "Action"/>          
            
        </div>
    );

}

export default MovieGallery;