import NavBar from '../NavBar/NavBar';
import MovieGallery from '../MovieGallery/MovieGallery';
import './HomePage.css';
import InitialPreview from '../InitialPreview/InitialPreview';

function HomePage() {

    return (
        <div className="HomePage">
            <NavBar />
            <InitialPreview />
            <div className ="Gallery">
                <h1>Currently Showing</h1>
                <MovieGallery />
                <h1>Coming Soon</h1>
                <MovieGallery />
            </div>
        </div>
    );

}

export default HomePage;