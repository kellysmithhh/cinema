import { useEffect, useState } from 'react';
import './ManageMovies.css';

function ManageMovies() {

    const [dateTimeSet,setDateTimeSet] = useState([]);
    const [dateTimeValue, setDateTimeValue] = useState('');

    const handleDate = () => {
        setDateTimeSet([...dateTimeSet, dateTimeValue]);
    };

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
        
        </div>
       
    )
}

export default ManageMovies;