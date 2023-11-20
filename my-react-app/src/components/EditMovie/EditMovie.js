import { useEffect, useState } from 'react';


function EditMovie(props) {
    const movie = props;

    const [dateTimeSet,setDateTimeSet] = useState([]);
    const [dateTimeValue, setDateTimeValue] = useState('');
    const [title] = useState(movie.movie.title);

    const handleDate = (e) => {
        e.preventDefault();
        setDateTimeSet([...dateTimeSet, dateTimeValue]);
        const movieId = String(movie.movie.id);
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dateTimeSet),
        };

        fetch(`http://localhost:8080/movie/${movieId}/show-dates`, requestOptions)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                // Handle successful response here if needed
                console.log('Show dates added successfully');
            })
            .catch(error => {
                // Handle error case here
                console.error('There was a problem adding show dates:', error);
            });
    };

    useEffect (() => {
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
                <td><button id = 'editInfo'>Edit Info</button><button>Delete</button></td>
            </tr>
        

    );
}
export default EditMovie