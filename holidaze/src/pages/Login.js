import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BASE_URL, AUTH_PATH } from '../utils/constants';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Heading from '../components/layout/Heading';


const loginSchema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password')
});

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, data);
      console.log('response', response.data);
      setAuth(response);
    } catch (error) {
      console.log('error', error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
      history.push('/');
    }
  };

  return (
    <>
    <Heading title='Logg inn' />
      <div className='formbox'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <p>{loginError}</p>}
        <fieldset disabled={submitting}>
          <div className='form__input'>
            <input name='identifier'
            placeholder='Username' 
            ref={register}
            type='text'
            />
            {errors.identifier && <p>{errors.identifier.message}</p>}
          </div>

          <div className='form__input'>
            <input
              name='password'
              placeholder='Password'
              ref={register}
              type='password'
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type='submit'>{submitting ? 'Loggin in...' : 'Login'}</button>
        </fieldset>
      </form>
      </div>
    </>
  );
};

export default Login;