import './ManagerView.css';
import AddMovie from '../AddMovie/AddMovie'
//import MovieGalleryComingSoon from '../MovieGallery/MovieGalleryComingSoon'

function ManagerView() {

const handleClick = () => {
    
};

    return (
        <div className="ManagerView">
            <div id ="MVLeft">
                <div className="input-container">
                    <button type="submit" onClick={handleClick}>Manage Promotions</button>
                </div>
                <div className="input-container">
                    <button type="submit" onClick={handleClick}>Manage Users</button>
                </div>
                <div className="input-container">
                    <button type="submit" onClick={handleClick}>Manage Movies </button>
                </div>
            </div>

            <div id ="MVRight">
                <AddMovie />   
            </div>            
        </div>
    );

}

export default ManagerView;