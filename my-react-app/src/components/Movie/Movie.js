import './Movie.css';
import React from "react"
import { useNavigate } from 'react-router-dom';

function Movie(props) {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/MovieInformation`; 
        navigate(path);
    }

    return (
        <div className="Movie">
            <div id = "MovieBlock">

                <div className = "movieImage">
                    <img src = {props.img} alt = "barbie poster"/>
                </div>

                <div className = "movieInfo">
                    <h1>{props.title}</h1>

                    <div className = "rating">
                        <h2>{props.MPAA_rating_code}</h2>
                        <h2>{props.catagory}</h2>
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