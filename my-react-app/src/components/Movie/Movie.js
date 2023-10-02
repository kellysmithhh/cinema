import './Movie.css';
import React from "react"
import { Link} from 'react-router-dom';

function Movie(props) {

    const movie = props.movie;

    

    return (
        <div className="Movie">
            <div id = "MovieBlock">

                <div className = "movieImage">
                    <img src = {movie.trailer_image} alt = "barbie poster"/>
                </div>

                <div className = "movieInfo">
                    <h1>{movie.title}</h1>

                    <div className = "rating">
                        <h2>{movie.mpaa_rating_code}</h2>
                        <h2>{movie.category}</h2>
                    </div>

                    <div className='link'>
                        <Link id ="hey" to ='/MovieInformation' state={{from: movie.title}}>More Information</Link>
                    </div>
                    
                    
                </div>

            </div>
        </div>
    );

}

export default Movie;