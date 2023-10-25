import './ManagerView.css'
import AddMovie from '../AddMovie/AddMovie'
import MovieGallery from '../MovieGallery/MovieGallery'

function ManagerView() {

    return (
        <div className="ManagerView">
            <div id ="MVLeft">
                <div className ="top">
                    <h1>Promotions</h1>
                        <input type="text" placeholder="Promotion Name" id="cpwd" name="cpwd"></input>
                        <input type="text" placeholder="Promotion Percentage" id="cpwd" name="cpwd"></input>
                        <button type="submit">Submit</button>
                </div>
                <div className ="middle">
                    <h1>Manage Users</h1>

                    <table>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Promotions</th>
                            <th>Actions</th>
                        </tr>
                        <tr>
                            <td>Walker</td>
                            <td>Bryant</td>
                            <td>Subscriber</td>
                            <td><button>Delete</button></td>
                        </tr>
                        <tr>
                            <td>Kelly</td>
                            <td>Smith</td>
                            <td>Subscriber</td>
                            <td><button>Delete</button></td>
                        </tr>
                    </table>

                </div>
                <div className ="bottom">
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
            </div>

            <div id ="MVRight">
                <AddMovie />   
            </div>            
        </div>
    );

}

export default ManagerView;