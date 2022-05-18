import { useState } from 'react';
import { BASE_URL, BOOKING_PATH } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../utils/schemas';
import axios from 'axios';

const Booking = () => {
    const [booking, setBooking] = useState(null);

    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)
    const [success, setSuccess] = useState(null);

     const { register, handleSubmit, errors } = useForm({
       resolver: yupResolver(bookingSchema)
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setPostError(null);
        console.log(data);
        try {
            const response = await axios.post(`${BASE_URL}${BOOKING_PATH}`, data)
            console.log(response)
            setBooking(response.data)
            setSuccess(true)
        } catch (error) {
            console.log('error', error)
            setPostError(error.toString())
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2 className='heading'>Booking form</h2>
            <div className='formbox'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {postError && <p>{postError}</p>}
                <fieldset disabled={submitting}>
                    <div className='form__input'>
                        <input
                            name='name'
                            placeholder='First name'
                            ref={register}
                            type='text'
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className='form__input'>
                        <input
                            name='lastname'
                            placeholder='Last name'
                            ref={register}
                            type='text'
                        />
                        {errors.lastname && <p>{errors.lastname.message}</p>}
                    </div>
                    <div className='form__input'>
                        <input
                            name='email'
                            placeholder='Email'
                            ref={register}
                            type='text'
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className='form__input'>
                        <input
                            name='hotel'
                            placeholder='Hotel name'
                            ref={register}
                            type='text'
                        />
                        {errors.hotel && <p>{errors.hotel.message}</p>}
                    </div>
                    <div className='form__input'>
                        <input
                            name='guests'
                            placeholder='Number of guests'
                            ref={register}
                            type='number'
                        />
                        {errors.guests && <p>{errors.guests.message}</p>}
                    </div>
                    <div className='form__input'>
                        <textarea
                            name='date'
                            placeholder='Date of booking'
                            ref={register}
                            type='text'
                        />
                        {errors.date && <p>{errors.date.message}</p>}
                    </div>

                    <button type='submit'>
                        {submitting ? 'Booking ...' : 'Book'}
                    </button>
                </fieldset>
            </form>
            {success ? <p>Thank you for booking.</p> : null}
            </div>
        </>
    );
};

export default Booking;