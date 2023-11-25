// Information.js
import './Information.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieReview from '../MovieReviews/MovieReviews';


function Information(props) {
   const info = props.info;   
   const[oldReviews,setOldReviews] = useState([])
   useEffect(() => {
    if (info.reviews !== undefined) {
      setOldReviews(info.reviews);
      console.log(info.reviews)
    } else {
        console.log("is null")
    }
   }, [info.reviews]);

   //const reviewList = oldReviews.map((reviews, k) => <MovieReview reviews = {reviews} key ={k}/>); 

   const [rating, setRating] = useState('');
   const [newReview, setNewReview] = useState('');   
   const movieId = info.id;
   const [showTimes, setShowTimes] = useState([]);

   const handleRatingChange = (event) => {
       const inputValue = event.target.value;
       if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 5) {
           setRating(inputValue);
       }
   };


   useEffect(() => {
       fetch(`http://localhost:8080/movie/${movieId}/get/show-dates`)
           .then(response => {
               if (!response.ok) {
                   throw new Error('Network response was not ok');
               }
               return response.json();
           })
           .then(data => {
               setShowTimes(data);
               console.log(data)
           })
           .catch(error => {
               console.error('There was a problem getting show dates:', error);
           });
   }, [movieId]);


   let navigate = useNavigate();
   const routeChange = () => {
       let path = `/ShowtimeSelection`;
       navigate(path, {state: info});
   };


   const ratingMap = {
       G: 'G',
       PG: 'PG',
       PG_13: 'PG-13',
       R: 'R',
       NC_17: 'NC-17'
   };


   const mpaaRating = info.ratingMPAA ? ratingMap[info.ratingMPAA] : 'Unknown';

   const handleClick = (e) => {
        e.preventDefault();
        if (localStorage.getItem("session") !== "") {
            var session = localStorage.getItem('session');
            session = session.replace(/^"(.*)"$/, '$1');       
            const apigetURL = `http://localhost:8080/user/get/fname/${session}`;
            fetch(apigetURL, {          
                method:"GET",
                headers:{"Content-Type":"application/json"}})
                .then((response)=> response.text())
                .then((data) => {           
                    const user = {fromName: data, rating: rating, content: newReview}
                    const url = `http://localhost:8080/movie/${movieId}/add-review`;
                    fetch(url,{ 
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(user)
                }).then(()=>{
                    console.log("Movie Review Added")
                    fetch(`http://localhost:8080/movie/${movieId}/get-reviews`)
                            .then(response => response.json())
                            .then(data => {
                                setOldReviews(data);
                                console.log(data)
                            })
                            .catch(error => {
                                console.error('Error fetching reviews:', error);
                            });
                })
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        } else {
            alert("Please login to leave a comment!")
        }
    }


   return (
       <div className="Information">
           <h1>{info.title}</h1>
           <div className='MovieDetails'>
               <div className='MovieImage'>
                   <img src={info.trailerImage} alt="An " />
               </div>
               {/* <iframe src = {movie.trailerLink} />  */}
               <div className='MovieInfo'>
                   <p>Movie Name: {info.title}</p>
                   <p>Category: {info.category} </p>
                   <p>Cast: {info.cast} </p>
                   <p>Director: {info.director}</p>
                   <p>Producer: {info.producer} </p>
                   <p>Synopsis: {info.synopsis}</p>
                   <p>Film Rating: {mpaaRating}</p>
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
                   <div>
                   <label htmlFor="reviewInput">Review:</label>
                    <input
                        type="text"
                        id="reviewInput"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Add your review"
                    />
                    <button type="button" onClick={handleClick}>Submit</button>
                    </div>

                    {/* Display existing reviews */}
                    <div className="existingReviews">
                    {oldReviews && oldReviews.length > 0 ? (
                        <div>
                            {oldReviews.map((review, index) => (
                                <MovieReview key={index} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p>No reviews available</p>
                    )}
                    </div>
                   <div className="ShowTimes">
                       <label htmlFor="showTimes">Show Times:</label>
                       {showTimes && showTimes.length > 0 ? (
                           <ul>
                               {showTimes.map((time, index) => (
                                   <li key={index}>{time}</li>
                               ))}
                           </ul>
                       ) : (
                           <p>No show times available</p>
                       )}
                   </div>
               </div>
           </div>
           <div className='buttonInfo'>
               <button onClick={routeChange} type='submit'>Book Ticket</button>
           </div>
       </div>
   );
}


export default Information;


