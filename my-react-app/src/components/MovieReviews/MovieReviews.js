//import React, { useState } from 'react';



function MovieReview(props) {
    const { review } = props;

    return (
        <div>
            <h3>From: {review.fromName}</h3>
            <p>Rating: {review.rating}</p>
            <p>Content: {review.content}</p>
            {/* Display other aspects of the review here */}
        </div>
    );
} 

export default MovieReview