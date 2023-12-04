import { useEffect, useState } from 'react';
import './ManageMovies.css';
import EditMovie from '../EditMovie/EditMovie';

function ManageMovies() {

    const [dateTimeSet,setDateTimeSet] = useState([]);
    const [dateTimeValue, setDateTimeValue] = useState('');
    const [movies,setMovies] = useState([]);    
    const movieList = movies.map((movie, k) => <EditMovie movie = {movie} key ={k}/>);

    const handleDate = (e) => {
        e.preventDefault();
        setDateTimeSet([...dateTimeSet, dateTimeValue]);
    };

    useEffect (() => {
        fetch("http://localhost:8080/movie/getAll")
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setMovies(result);
        })
    }, []);

    useEffect (() => {
        console.log(dateTimeSet);
    }, [dateTimeSet]);

    return (
             
        <div>
            <h1>Showing Movies</h1>
            {movieList}
        </div>       
    )
}

export default ManageMovies;