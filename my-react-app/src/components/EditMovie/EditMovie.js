import { useEffect, useState } from 'react';

function EditMovie(props) {
    const movie = props;
    const [dateTimeSet, setDateTimeSet] = useState([]);
    const [dateTimeValue, setDateTimeValue] = useState('');
    const [title] = useState(movie.movie.title);
    //const [movieId] = useState(movie.movie.id)
    const [showRoomId, setShowRoomId] = useState(1);

    const handleDate = (e) => {
        e.preventDefault();
        if (dateTimeValue !== "" ) {
            console.log(dateTimeValue);
            
        if (!dateTimeSet.includes(dateTimeValue)) {
            const updatedDateTimeSet = [...dateTimeSet, dateTimeValue];
            const movieId = String(movie.movie.id);
            const data = {dateTime: dateTimeValue, movieId, showRoomId}
            console.log(data);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            fetch(`http://localhost:8080/movie/show-dates`, requestOptions)
                .then(response => {                   
                    if (!response.ok) {
                        console.log("NO WORK")
                        throw new Error('Network response was not ok');
                    }
                    return response.text();                    
                })
                .then(data => {
                    if (data == "true") {
                        alert("Movie has been scheduled")
                    } else {
                        alert("Time slot not available please choose another time");
                    }
                })
                .catch(error => {
                    console.error('There was a problem adding show dates:', error);
                });
            setDateTimeValue('');
        }
    } else {
        alert("Please enter a Date and Time")
    }
    };

    const handleShowRoomChange = (e) => {
        setShowRoomId(parseInt(e.target.value));
    };

    const handleUpdateMovie = (e) => {
        e.preventDefault();
        const movieId = movie.movie.id;     
        const comingSoon = false;
        const nowShowing = true   
        fetch(`http://localhost:8080/movie/update-status/${movieId}?comingSoon=${comingSoon}&nowShowing=${nowShowing}`,{ 
            method:"POST",
            headers:{"Content-Type":"application/json"},})
        
        .catch(rejected=> {
            console.log(rejected);
        })

        
        //fetch

        console.log("Movie Updated");
    }

    return (
        <table>
        <tr>
            <td>{title}</td>
            <td>
                <form onSubmit={handleDate}>
                    <input
                        type="datetime-local"
                        value={dateTimeValue}
                        onChange={(e) => setDateTimeValue(e.target.value)}
                    />
                    <select value={showRoomId} onChange={handleShowRoomChange}>
                        {[1, 2, 3, 4].map((id) => (
                            <option key={id} value={id}>
                                Showroom {id}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Send DateTime</button>
                </form>
            </td>
            <td><button id='editInfo'onClick = {handleUpdateMovie}>Add to Currently Showing</button></td>
        </tr>
        </table>
    );
}

export default EditMovie;