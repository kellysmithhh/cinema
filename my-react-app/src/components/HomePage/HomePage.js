import NavBar from '../NavBar/NavBar';
import MovieGallery from '../MovieGallery/MovieGallery';
import './HomePage.css';
import InitialPreviewCarousel from '../InitialPreviewCarousel/InitialPreviewCarousel';

function HomePage() {

    return (
        <div className="HomePage">
            <NavBar />
            <InitialPreviewCarousel />
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