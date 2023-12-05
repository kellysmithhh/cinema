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

const handleClickUsers = () => {
    let path = `/ManageUsers`;
    navigate(path);
};

const handleClickAddMovies = () => {
    let path ='/AddMovie';
    navigate(path);
}


    return (
        <div className="ManagerView">
        
                <br></br>

                <h1> Hello, welcome!</h1>

                <br></br>

                <div className='MVbuttons'>
                    <div className="input-containerMV">
                        <button type="submit" onClick={handleClickPromotions}>Manage Promotions</button>
                    </div>
                    <div className="input-containerMV">
                        <button type="submit" onClick={handleClickUsers}>Manage Users</button>
                    </div>
                    <div className="input-containerMV">
                        <button type="submit" onClick={handleClickMovies}>Manage Movies </button>
                    </div>
                    <div className="input-containerMV">
                        <button type="submit" onClick={handleClickAddMovies}>Add Movies </button>

                    </div> 
                </div>
                       
     </div>

    );

}

export default ManagerView;