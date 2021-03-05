import { useState, useEffect } from 'react';
import Map from './components/Map';
import './App.css';

const App = () => {
  const [info, setInfo] = useState();

  useEffect(() => {
    let ipifyData;
    fetch(
      'https://geo.ipify.org/api/v1?apiKey=at_q0PPYNVebXnhMzJOUModD2NEMlCWC'
    )
      .then(res => res.json())
      .then(data => {
        ipifyData = data;
        return data;
      })
      .then(data =>
        fetch(`https://restcountries.eu/rest/v2/alpha/${data.location.country}`)
          .then(res => res.json())
          .then(data => setInfo({ ...data, ...ipifyData }))
      );
  }, []);

  return info ? (
    <div>
      {info.ip}
      <img src={info.flag} alt={info.name} width='100px' />
      <Map lat={info.location.lat} lon={info.location.lng} />
    </div>
  ) : (
    'Loading...'
  );
};

export default App;
