import './InitialPreview.css';

function InitialPreview({link}) {

    return (
        <div className="initialpreview">
            <div id = "block">
                <iframe title="video" height = "100%" width = "100%" src={link}></iframe>
            </div>
        </div>
    );
}

export default InitialPreview;