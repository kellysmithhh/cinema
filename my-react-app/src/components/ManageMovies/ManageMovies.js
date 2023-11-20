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
            <h1>Manage Movies</h1>

            <table>
                    
            <tr>
                <th>Movie</th>
                <th>Add Showtime</th>
                <th>Actions</th>
            </tr>

            <tr>
                <td>Oppenheimer</td>
                <td>
                <form onSubmit={handleDate}>
                    <input
                        type="datetime-local"
                        value={dateTimeValue}
                        onChange={(e) => setDateTimeValue(e.target.value)}
                    />
                    <button type="submit">Send DateTime</button>
                </form>
                </td>
                <td><button id = 'editInfo'>Edit Info</button><button>Delete</button></td>
            </tr>

            <tr>
                <td>Barbie</td>
                <td><input type='time'/> <button>Submit</button></td>
                <td><button id = 'editInfo'>Edit Info</button><button>Delete</button></td>
            </tr>
            </table>                    
        
        <div>
            {movieList}
        </div>

        </div>
        

        
       
    )
}

export default ManageMovies;