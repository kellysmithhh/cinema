import './Information.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Information(props) {

    const info = props.info;
    const [rating, setRating] = useState('');

    const handleRatingChange = (event) => {
        const inputValue = event.target.value;
        // Ensure the entered value is within the range of 1-10
        if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 5) {
          setRating(inputValue);
        }
      };


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/ShowtimeSelection`; 
      navigate(path);
    }

    const ratingMap = {
        G: 'G',
        PG: 'PG',
        PG_13: 'PG-13',
        R: 'R',
        NC_17: 'NC-17'
    };

    const mpaaRating = info.ratingMPAA ? ratingMap[info.ratingMPAA] : 'Unknown';

    return (
        <div className="Information">
            
            <h1>{info.title}</h1>
        
            <div className='MovieDetails'>
    
                <div className='MovieImage'>
                    <img src ={info.trailerImage} alt = "An "/>
                </div>
        
                <div className='MovieInfo'>
                    <p>Movie Name: {info.title}</p>
                    <p>Category: {info.category} </p>
                    <p>Cast: {info.cast} </p>
                    <p>Director: {info.director}</p>
                    <p>Producer: {info.producer} </p>
                    <p>Synopsis: {info.synopsis}</p>
                    <p>Film Rating: {mpaaRating}</p>
                    <p><label>Reviews:</label></p>
                    <label htmlFor="ratingInput">Rate (1-5):</label>
                    <input
                        type="number"
                        id="ratingInput"
                        value={rating}
                        onChange={handleRatingChange}
                        min="1"
                        max="5"
                        placeholder="Enter a number from 1 to 5"
                    />
                </div>
        
    
            </div>
        
            <div className='buttonInfo'>
                <button onClick = {routeChange} type='submit'>Book Ticket</button>
            </div>
        </div>
    );

}

export default Information;