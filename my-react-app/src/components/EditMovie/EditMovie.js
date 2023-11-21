import { useEffect, useState } from 'react';

function EditMovie(props) {
    const movie = props;
    const [dateTimeSet, setDateTimeSet] = useState([]);
    const [dateTimeValue, setDateTimeValue] = useState('');
    const [title] = useState(movie.movie.title);

    const handleDate = (e) => {
        e.preventDefault();
        if (!dateTimeSet.includes(dateTimeValue)) {
            const updatedDateTimeSet = [...dateTimeSet, dateTimeValue];
            const movieId = String(movie.movie.id);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDateTimeSet),
            };

            fetch(`http://localhost:8080/movie/${movieId}/show-dates`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log('Show dates added successfully');
                    // Update the state after successful API call
                    setDateTimeSet(updatedDateTimeSet);
                })
                .catch(error => {
                    console.error('There was a problem adding show dates:', error);
                });
        } else {
            console.log('DateTime already exists in the set');
            setDateTimeValue('');
        }
    };

    useEffect(() => {
        console.log(dateTimeSet);
    }, [dateTimeSet]);

    return (
        <tr>
            <td>{title}</td>
            <td>
                <form onSubmit={handleDate}>
                    <input
                        type="datetime-local"
                        value={dateTimeValue}
                        onChange={(e) => setDateTimeValue(e.target.value)}
                    />
                    <button type="submit">Send DateTime</button>
                </form>
            </td>
            <td><button id='editInfo'>Edit Info</button><button>Delete</button></td>
        </tr>
    );
}

export default EditMovie;