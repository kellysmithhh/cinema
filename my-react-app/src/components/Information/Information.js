import './Information.css';
import { useNavigate } from 'react-router-dom';

function Information(props) {

    const info = props.info;

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/ShowtimeSelection`; 
      navigate(path);
    }

    return (
        <div className="Information">
            
            <h1>{info.title}</h1>
        
            <div className='MovieDetails'>
    
                <div className='MovieImage'>
                    <img src ={info.trailer_image} alt = "An "/>
                </div>
        
                <div className='MovieInfo'>
                    <p>Movie Name: {info.title}</p>
                    <p>Category: {info.category} </p>
                    <p>Cast: {info.cast} </p>
                    <p>Director: {info.director}</p>
                    <p>Producer: {info.producer} </p>
                    <p>Synopsis: {info.synopsis}</p>
                    <p>Film Rating: {info.mpaa_rating_code}</p>
                </div>
        
    
            </div>
        
            <div className='buttonInfo'>
                <button onClick = {routeChange} type='submit'>Book Ticket</button>
            </div>
        </div>
    );

}

export default Information;