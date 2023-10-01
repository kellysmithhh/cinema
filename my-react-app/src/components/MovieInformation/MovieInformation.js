import React from 'react';
import InitialPreview from '../InitialPreview/InitialPreview';
import './MovieInformation.css';

function MovieInformation(props) {
  const {
    confirmationNumber = '',
    
  } = props;

  return (
    <div className="MovieInformation">
      <InitialPreview />

      <h1>Movie Name</h1>
     
    <div className='MovieDetails'>

      <div className='MovieImage'>
        <img src ="https://image.tmdb.org/t/p/original/u5kboZR4OMi4QdbOhawCZuzMVWJ.jpg" alt = "barbie poster"/>
      </div>
    
      <div className='MovieInfo'>
          <p>Movie Name: {confirmationNumber}</p>
          <p>Category: </p>
          <p>Cast: </p>
          <p>Director: </p>
          <p>Producer: </p>
          <p>Synopsis: </p>
          <p>Film Rating: </p>
      </div>
    

     </div>
      
      <div className='buttonInfo'>
        <button type='submit'>Book Ticket</button>
      </div>
      


    </div>
  );
}

export default MovieInformation;