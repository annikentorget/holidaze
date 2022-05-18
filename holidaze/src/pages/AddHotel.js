import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Hotel from '../components/layout/Hotel';
import { BASE_URL, HOTELS_PATH } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hotelSchema } from '../utils/schemas';
import axios from 'axios';

const AddHotel = () => {
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [hotel, setHotel] = useState(null);

    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)
    const [success, setSuccess] = useState(null);

     const { register, handleSubmit, errors } = useForm({
       resolver: yupResolver(hotelSchema)
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setPostError(null);
        console.log(data);
        try {
            const response = await axios.post(`${BASE_URL}${HOTELS_PATH}`, data)
            console.log(response)
            setHotel(response.data)
            setSuccess(true)
        } catch (error) {
            console.log('error', error)
            setPostError(error.toString())
        } finally {
            setSubmitting(false);
        }
    };

    if(!auth) {
        history.push('/login');
    }

    return (
        <>
            <h2 className='heading'>Add hotel</h2>
            <div className='formbox'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {postError && <p>{postError}</p>}
                <fieldset disabled={submitting}>
                    <div className='form__input'>
                        <input
                            name='title'
                            placeholder='Title'
                            ref={register}
                        />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>

                    <div className='form__input'>
                        <input
                            name='price'
                            placeholder='Price'
                            ref={register}
                            type='number'
                        />
                        {errors.price && <p>{errors.price.message}</p>}
                    </div>
                    <div className='form__input'>
                        <textarea
                            name='description'
                            placeholder='Description'
                            ref={register}
                            type='text'
                        />
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <div className='form__input'>
                        <input
                            name='image_url'
                            placeholder='Image URL'
                            ref={register}
                            type='text'
                        />
                        {errors.image_url && <p>{errors.image_url.message}</p>}
                    </div>

                    <button type='submit'>
                        {submitting ? 'Adding ...' : 'Add hotel'}
                    </button>
                </fieldset>
            </form>
            {success ? <p>Listing og {hotel.title} was added.</p> : null}
            <Hotel {...hotel} />
            </div>
        </>
    );
};

export default AddHotel;