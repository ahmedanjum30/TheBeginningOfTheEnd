import * as yup from 'yup';

const PHONE_REGEX = /^(\+92|92|0)?3[0-9]{9}$/;

export const customerSchema = yup.object().shape({
  cnic: yup.string().required('CNIC is required').default(''),
  name: yup.string().required('Name is required').default(''),
  email: yup.string().email('Invalid email').optional().default(''),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(PHONE_REGEX, 'Enter a valid phone number')
    .default(''),
  policeVerification: yup.boolean().required().default(false),
});
