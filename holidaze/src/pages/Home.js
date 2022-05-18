import { useEffect, useState } from 'react';
import { BASE_URL, HOTELS_PATH } from '../utils/constants';
import axios from 'axios';

const Home = () => {
  const [hotels, setHotels] = useState(null);

  useEffect(() => {
    
    try {
    axios
      .get(`${BASE_URL}${HOTELS_PATH}`)
      .then(response => {
        console.log(response);
        setHotels(response.data);
      });
    } catch {
      console.log(Error);
    }
  }, []);
  return (
    <>
      <div className="banner">
        <h1 className="banner__heading">
          Bergen by er nydelig!
          <br />
          Finn plass å bo her
        </h1>
      </div>
    </>
  );
};

export default Home;