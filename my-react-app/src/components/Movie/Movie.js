import './Movie.css';
import {useNavigate } from 'react-router-dom';

function Movie() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/MovieInformation`; 
        navigate(path);
    }

    return (
        <div className="Movie">
            <div id = "MovieBlock">
            
                <div className = "movieImage">
                
                </div>

                <div className = "movieInfo">
                    <h1>Barbie</h1>

                    <div className = "rating">
                        <h2>PG-13</h2>
                        <h2>2h 13m</h2>
                    </div>
                    
                    <div className='button'>
                        <button onClick = {routeChange}>Get Info</button>
                    </div>
                    
                </div>

            </div>
        </div>
    );

}

export default Movie;