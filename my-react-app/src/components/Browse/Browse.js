import './Browse.css';
import React from "react"
import { useState } from 'react';
import { useEffect } from 'react';
  
function Browse() {

    const[movies,setMovies] = useState([])
    const[userSearch,setSearch] = useState('')
    
    useEffect(()=> {
        fetch("http://localhost:8080/movie/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setMovies(result);
        }
        )
    },[])

    const handleClick = (e) => {
        movies.forEach(element => {
            if (element.title == userSearch) {
                return (
                    <div>
                        YEP!
                    </div>
                )
            }
        });
    }

    return (
    
         <div className = "searchBar">
            <input type='text' placeholder='Movie Name..' id='input'value={userSearch} onChange={(e)=>setSearch(e.target.value)}/>
             <button type='submit'onClick={handleClick}>Search</button>
        </div>

    );

}

export default Browse;
