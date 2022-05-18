import Heading from '../components/layout/Heading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, HOTELS_PATH } from '../utils/constants';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const getHotel = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${HOTELS_PATH}/${id}`);
        console.log(response)
        setHotel(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getHotel();
  }, [id]);

  if (!hotel) {
    return <h3>Loading...</h3>;
}

  return (
    <>
      <Heading title={hotel.name} />
    </>
  );
};

export default Details;