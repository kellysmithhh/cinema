import './Movie.css';

function Movie() {

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
                        <button>Book Ticket</button>
                    </div>
                    
                </div>

            </div>
        </div>
    );

}

export default Movie;