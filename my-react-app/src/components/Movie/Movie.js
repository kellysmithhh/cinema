import './Movie.css';
import React from "react"
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Movie(props) {

    const movie = props.movie;

    const ratingMap = {
        G: 'G',
        PG: 'PG',
        PG13: 'PG13',
        R: 'R',
        NC17: 'NC17'
    };

    const mpaaRating = movie.ratingMPAA ? ratingMap[movie.ratingMPAA] : 'Unknown';

    let navigate = useNavigate();
   const routeChange = () => {
       let path = `/ShowtimeSelection`;
       navigate(path, {state: movie});
   };

    return (
        <div className="Movie">
            <div id = "MovieBlock">

                <div className = "movieImage">
                    <img src = {movie.trailerImage} alt = "barbie poster"/>  
                    {/* <iframe src = {movie.trailerLink} />  */}

                </div>

                <div className = "movieInfo">
                    <h1>{movie.title}</h1>
                    
                    
                    
                    <div className = "rating">
                        <h2>{String(mpaaRating)}</h2>
                        <h2>{movie.category}</h2>
                    </div>

                    <div className='link'>
                        <Link id ="hey" to ='/MovieInformation' state={{from: movie.title}}>More Information</Link>
                        
                        <button onClick={routeChange} type='submit'>Book Ticket</button>
                        
                    </div>
                    
                    
                </div>

            </div>
        </div>
    );

}

export default Movie;