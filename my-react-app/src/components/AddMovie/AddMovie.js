import './AddMovie.css';
import { useState } from 'react';
function AddMovie() {

    const[title,setTitle] = useState('')
    const[mpaaRatingCode,setMpaaRatingCode] = useState('')
    const[cast,setCast] = useState('')
    const[category,setCategory] = useState('')
    const[director,setDirector] = useState('')
    const[producer,setProducer] = useState('')
    const[reviews,setReviews] = useState('')
    const[showDates,setShowDates] = useState('')
    const[showTimes,setShowTimes] = useState('')
    const[synopsis,setSynopsis] = useState('')
    const[trailerImage,setTrailerImage] = useState('')
    const[trailerLink,setTrailerLink] = useState('')
    const[comingSoon,setComingSoon] = useState(true)
    const[nowShowing,setNowShowing] = useState(false)
    const[duration,setDuration] = useState('')


    const handleClick=(e)=>{
        e.preventDefault()
        const movie={mpaaRatingCode,cast,category,director,producer,reviews,showDates,showTimes,synopsis,title,trailerImage,trailerLink,comingSoon,nowShowing,duration}
        console.log(movie)
        fetch("http://localhost:8080/movie/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(movie)
        }).then(()=>{
            console.log("New movie added.")
        })
    }

    const handleCheck=(e)=>{
        e.preventDefault();
        setComingSoon(false);
        setNowShowing(true);
    }

    return (
       <div className="addMovie">
             <form action=""> 
                <h1>Add Movie</h1>
                <label className="label">Movie Title</label>
                <input type="text" placeholder="Required Field" id="name" name="name" value ={title} onChange={(e)=>setTitle(e.target.value)}></input>

                <label className="label">Category</label>
                <input type="text" placeholder="Required Field" id="name1" name="name1" value ={category} onChange={(e)=>setCategory(e.target.value)}></input>

                <label className="label">Cast</label>
                <input type="text" placeholder="Required Field" id="email" name="email" value ={cast} onChange={(e)=>setCast(e.target.value)}></input>

                <label className="label">Director</label>
                <input type="text" placeholder="Required Field" id="phone" name="phone" value ={director} onChange={(e)=>setDirector(e.target.value)}></input>

                <label className="label">Producer</label>
                <input type="text" placeholder="Required Field" id="pwd" name="pwd" value ={producer} onChange={(e)=>setProducer(e.target.value)}></input>

                <label className="label">Synopsis</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={synopsis} onChange={(e)=>setSynopsis(e.target.value)}></input>

                <label className="label">Reviews</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={reviews} onChange={(e)=>setReviews(e.target.value)}></input>

                <label className="label">Trailer Image URL</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={trailerImage} onChange={(e)=>setTrailerImage(e.target.value)}></input>
        
                <label className="label">Trailer Link URL</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={trailerLink} onChange={(e)=>setTrailerLink(e.target.value)}></input>

                <label className="label">Film Rating</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={mpaaRatingCode} onChange={(e)=>setMpaaRatingCode(e.target.value)}></input>

                <label className="label">Show Dates</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={showDates} onChange={(e)=>setShowDates(e.target.value)}></input>

                <label className="label">Show Times</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={showTimes} onChange={(e)=>setShowTimes(e.target.value)}></input>

                <label className="label">Duration</label>
                <input type="text" placeholder="Required Field" value ={duration} onChange={(e)=>setDuration(e.target.value)}></input>

                <div class="checkbox-label">
                    <input type="checkbox" id="scales" name="scales"/>
                    <label for="scales" onChange={handleCheck}>Now showing?</label>
                </div>

                
                <div className="input-container">
                    <button type="submit" onClick={handleClick}>Add Movie</button>
                </div>
             </form>
       </div>
    );
}

export default AddMovie;
