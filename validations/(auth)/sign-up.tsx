import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Full Name is required').default(''),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required')
    .default(''),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .default(''),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password')
    .default(''),
});
