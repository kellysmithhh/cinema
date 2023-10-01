import './ManagerView.css'
import AddMovie from '../AddMovie/AddMovie'

function ManagerView() {

    return (
        <div className="ManagerView">
            <div id ="MVLeft">
                <div className ="Bottom">
                    <h1>Promotions</h1>
                    <input type="text" placeholder="Promotion Name" id="cpwd" name="cpwd"></input>
                    <input type="text" placeholder="Promotion Percentage" id="cpwd" name="cpwd"></input>

                </div>
                <div className ="Middle">
                    <h1>Manage Users</h1>
                </div>
                <div className ="Top">
                    <h1>Manage Movies</h1>
                </div>
            </div>

            <div id ="MVRight">
                <AddMovie />   
            </div>            
        </div>
    );

}

export default ManagerView;