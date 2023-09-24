import './InitialPreview.css';

function InitialPreview({item}) {

    return (
        <div className="initialpreview">
            <div id = "block">
                <iframe title="video" height = "100%" width = "100%" src="https://www.youtube.com/embed/uYPbbksJxIg"></iframe>
            </div>
        </div>
    );
}

export default InitialPreview;