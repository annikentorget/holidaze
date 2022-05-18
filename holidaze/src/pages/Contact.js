import { useState } from 'react';
import { BASE_URL, CONTACT_PATH } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '../utils/schemas';
import axios from 'axios';

const Contact = () => {
    const [contact, setContact] = useState(null);

    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)
    const [success, setSuccess] = useState(null);

     const { register, handleSubmit, errors } = useForm({
       resolver: yupResolver(contactSchema)
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setPostError(null);
        console.log(data);
        try {
            const response = await axios.post(`${BASE_URL}${CONTACT_PATH}`, data)
            console.log(response)
            setContact(response.data)
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
            <h2 className='heading'>Contact form</h2>
            <div className='formbox'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
                        <textarea
                            name='message'
                            placeholder='Message'
                            ref={register}
                            type='text'
                        />
                        {errors.message && <p>{errors.message.message}</p>}
                    </div>

                    <button type='submit'>
                        {submitting ? 'Sending ...' : 'Send'}
                    </button>
                </fieldset>
            </form>
            
            {success ? <p>Message was sent.</p> : null}
        </div>
        </>
    );
};

export default Contact;