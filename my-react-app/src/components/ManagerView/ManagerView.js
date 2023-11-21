import './ManagerView.css';
import AddMovie from '../AddMovie/AddMovie'
//import MovieGalleryComingSoon from '../MovieGallery/MovieGalleryComingSoon'
import { useNavigate } from 'react-router-dom';

function ManagerView() {

let navigate = useNavigate(); 

const handleClickMovies = () => {
    let path = `/ManageMovies`;
    navigate(path);
};

const handleClickPromotions = () => {
    let path = `/ManagePromotions`;
    navigate(path);
};

const handleClick = () => {

};

    return (
        <div className="ManagerView">
            <div id ="MVLeft">
                <div className="input-container">
                    <button type="submit" onClick={handleClickPromotions}>Manage Promotions</button>
                </div>
                <div className="input-container">
                    <button type="submit" onClick={handleClick}>Manage Users</button>
                </div>
                <div className="input-container">
                    <button type="submit" onClick={handleClickMovies}>Manage Movies </button>
                </div>
            </div>

            <div id ="MVRight">
                <AddMovie />   
            </div>            
        </div>
    );

}

export default ManagerView;