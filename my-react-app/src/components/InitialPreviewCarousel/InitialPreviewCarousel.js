import "./InitialPreviewCarousel.css";
import InitialPreview from "../InitialPreview/InitialPreview";

function InitialPreviewCarousel() {

    const items = [
        {
            link: "https://www.youtube.com/embed/uYPbbksJxIg",
    }, ]


    return (
        <div className="Carousel">
            <div className = "inner">
                {items.map((item) => {
                    return <InitialPreview link = {'https://www.youtube.com/embed/uYPbbksJxIg'} />;
                })}
            </div>
            
        </div>
    );
}

export default InitialPreviewCarousel;