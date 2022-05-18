import Heading from '../components/layout/Heading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, CONTACT_PATH, BOOKING_PATH } from '../utils/constants';

const Enquiries = () => {
  const [contact, setContact] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const getContact = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${CONTACT_PATH}`);
        console.log(response)
        setContact(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${BOOKING_PATH}`);
        console.log(response)
        setBooking(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooking();
  }, []);

  if (!contact) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      <Heading title='Contact' />

      {contact.map(contact => {
        return (
          <>
            <div className='enquiry__box' key={contact.id}>
                <p>{contact.name}</p>
                <p>{contact.lastname}</p>
                <p>{contact.email}</p>
                <p>{contact.message}</p>
            </div>
          </>
        );
      })}
      {booking.map(booking => {
        return (
          <>
            <div className='enquiry__box' key={booking.id}>
                <p>{booking.name}</p>
                <p>{booking.lastname}</p>
                <p>{booking.email}</p>
                <p>{booking.hotel}</p>
                <p>{booking.guests}</p>
                <p>{booking.date}</p>
            </div>
          </>
        );
      })}
    </>
  );
};



export default Enquiries;