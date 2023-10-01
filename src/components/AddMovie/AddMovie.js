import './AddMovie.css';

function AddMovie() {
    return (
       <div className="addMovie">
             <form action=""> 
                <h1>Add Movie</h1>
                <label className="label">Movie Title</label>
                <input type="text" placeholder="Required Field" id="name" name="name"></input>

                <label className="label">Category</label>
                <input type="text" placeholder="Required Field" id="name1" name="name1"></input>

                <label className="label">Cast</label>
                <input type="text" placeholder="Required Field" id="email" name="email"></input>

                <label className="label">Director</label>
                <input type="text" placeholder="Required Field" id="phone" name="phone"></input>

                <label className="label">Producer</label>
                <input type="text" placeholder="Required Field" id="pwd" name="pwd"></input>

                <label className="label">Synopsis</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd"></input>

                <label className="label">Link to Trailer</label>
                <input type="text" placeholder="Required Field" id="cpwd" name="cpwd"></input>

                <label className="label">Film Rating</label>
                <select>
                    <option>G</option>
                    <option>PG</option>
                    <option>PG-13</option>
                    <option>R</option>
                </select>

                <div className="input-container">
                    <button type="submit">Add Movie</button>
                </div>
             </form>
       </div>
    );
}

export default AddMovie;