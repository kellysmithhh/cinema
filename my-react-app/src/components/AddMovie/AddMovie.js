import './AddMovie.css';
import { useState } from 'react';
function AddMovie() {

    const[title,setTitle] = useState('')
    const[mpaa_rating_code,setMpaa_rating_code] = useState('')
    const[cast,setCast] = useState('')
    const[category,setCategory] = useState('')
    const[director,setDirector] = useState('')
    const[producer,setProducer] = useState('')
    const[reviews,setReviews] = useState('')
    const[show_dates,setShow_dates] = useState('')
    const[show_times,setShow_times] = useState('')
    const[synopsis,setSynopsis] = useState('')
    const[trailer_image,setTrailer_image] = useState('')
    const[trailer_link,setTrailer_link] = useState('')
    const[comingSoon,setComingSoon] = useState(true)
    const[nowShowing,setNowShowing] = useState(false)
    const[duration,setDuration] = useState('')


    const handleClick=(e)=>{
        e.preventDefault()
        const movie={mpaa_rating_code,cast,category,director,producer,reviews,show_dates,show_times,synopsis,title,trailer_image,trailer_link,comingSoon,nowShowing,duration}
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
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={trailer_image} onChange={(e)=>setTrailer_image(e.target.value)}></input>
        
                <label className="label">Trailer Link URL</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={trailer_link} onChange={(e)=>setTrailer_link(e.target.value)}></input>

                <label className="label">Film Rating</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={mpaa_rating_code} onChange={(e)=>setMpaa_rating_code(e.target.value)}></input>

                <label className="label">Show Dates</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={show_dates} onChange={(e)=>setShow_dates(e.target.value)}></input>

                <label className="label">Show Times</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd" value ={show_times} onChange={(e)=>setShow_times(e.target.value)}></input>

                <label className="label">Duration</label>
                <input type="text" placeholder="Required Field" value ={duration} onChange={(e)=>setDuration(e.target.value)}></input>

                <input type="checkbox"/>
                <label for="scales" onChange={handleCheck}>Now showing?</label>

                <div className="input-container">
                    <button type="submit" onClick={handleClick}>Add Movie</button>
                </div>
             </form>
       </div>
    );
}

export default AddMovie;
