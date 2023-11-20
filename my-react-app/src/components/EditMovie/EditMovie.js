import { useEffect, useState } from 'react';


function EditMovie(props) {
    const movie = props;

    const [dateTimeSet,setDateTimeSet] = useState([]);
    const [dateTimeValue, setDateTimeValue] = useState('');
    const [title,setTitle] = useState(movie.title);
    
    

    const handleDate = (e) => {
        e.preventDefault();
        setDateTimeSet([...dateTimeSet, dateTimeValue]);
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