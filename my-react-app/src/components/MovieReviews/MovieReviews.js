//import React, { useState } from 'react';
import './MovieReviews.css';

function MovieReview(props) {
    const { review } = props;

    return (
        <div className="review">
            <h3>From: {review.fromName}</h3>
            <p>Rating: {review.rating}</p>
            <p>Content: {review.content}</p>
            {/* Display other aspects of the review here */}
        </div>
    );
} 

export default MovieReview