import MovieGalleryComingSoon from '../MovieGallery/MovieGalleryComingSoon';
import './HomePage.css';
import InitialPreviewCarousel from '../InitialPreviewCarousel/InitialPreviewCarousel';
import MovieGalleryCurrentlyShowing from '../MovieGallery/MovieGalleryCurrentlyShowing';

function HomePage() {

    return (
        <div className="HomePage">
            <InitialPreviewCarousel />
            <div className ="Gallery">
                <h1>Currently Showing</h1>
                <MovieGalleryCurrentlyShowing />
                <h1>Coming Soon</h1>
                <MovieGalleryComingSoon />
            </div>
        </div>
    );

}

export default HomePage;