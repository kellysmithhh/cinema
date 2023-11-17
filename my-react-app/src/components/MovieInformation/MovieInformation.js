import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InitialPreview from '../InitialPreview/InitialPreview';
import './MovieInformation.css';
import Information from '../Information/Information'

function MovieInformation() {

  const location = useLocation()
  const {from} = location.state
  const[info,setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `http://localhost:8080/movie/search/${from}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setInfo(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [from]);

    let infoList = null;
    if(loading) {
      infoList = <p>Loading...</p>  
    } else {
      infoList = info.map((info, k) => <Information info = {info} key ={k}/>);
    }
   

  return (
    <div className="MovieInformation">
      <InitialPreview />
     {infoList}
    </div>
  );
  }

export default MovieInformation;