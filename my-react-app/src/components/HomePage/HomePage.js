import MovieGallery from '../MovieGallery/MovieGallery';
import './HomePage.css';
import InitialPreviewCarousel from '../InitialPreviewCarousel/InitialPreviewCarousel';

function HomePage() {

    return (
        <div className="HomePage">
            <InitialPreviewCarousel />
            <div className ="Gallery">
                <h1>Currently Showing</h1>
                <MovieGallery />
                <h1>Coming Soon</h1>
            </div>
        </div>
    );

}

export default HomePage;