import MovieGallery from '../MovieGallery/MovieGallery';
import './HomePage.css';
import InitialPreviewCarousel from '../InitialPreviewCarousel/InitialPreviewCarousel';
import AddMovie from '../AddMovie/AddMovie';
import CheckoutUI from '../CheckoutUI/CheckoutUI';

function HomePage() {

    return (
        <div className="HomePage">
            <AddMovie />
            <CheckoutUI />
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