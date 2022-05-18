import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    identifier: yup.string().required('PLease enter your username'),
    password: yup.string().required('Please enter your password')
});

export const contactSchema = yup.object().shape({
    name: yup.string().required('Please provide a first name'),
    lastname: yup.string().required('Please provide a last name'),
    email: yup.string().required('Please provide a valid email address'),
    message: yup.string().required('Please provide a message')
});

export const hotelSchema = yup.object().shape({
    title: yup.string().required('Please provide a title'),
    price: yup.number().required('Please provide a price'),
    description: yup.string().required('Please provide description'),
    image_url: yup.string().required('Please provide an image URL')
});

export const bookingSchema = yup.object().shape({
    name: yup.string().required('Please provide a first name'),
    lastname: yup.string().required('Please provide a last name'),
    email: yup.string().required('Please provide a valid email address'),
    hotel: yup.string().required('Please provide a hotel name'),
    guests: yup.number().required('Please provide number of guests'),
    date: yup.string().required('Please provide when you want to book')
});