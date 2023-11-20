import './ManageMovies.css';

function ManageMovies() {
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
                <td><input type='time'/> <button>Submit</button></td>
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