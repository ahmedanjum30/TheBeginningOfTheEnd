import * as yup from 'yup';

const PHONE_REGEX = /^(\+92|92|0)?3[0-9]{9}$/;

// Shared validators
const cnicField = yup
  .string()
  .required('CNIC is required')
  .length(13, 'CNIC must be exactly 13 digits')
  .matches(/^\d+$/, 'CNIC must contain only digits')
  .default('');
const phoneField = yup
  .string()
  .required('Phone is required')
  .matches(PHONE_REGEX, 'Enter a valid phone number')
  .default('');
const emailField = yup.string().email('Invalid email').optional().default('');
const nameField = yup.string().required('Name is required').default('');

// Main schema
export const customerSchema = yup.object().shape({
  cnic: cnicField,
  name: nameField,
  email: emailField,
  phone: phoneField,
  policeVerification: yup.boolean().required().default(false),

  guaranters: yup
    .array()
    .of(
      yup.object().shape({
        name: nameField,
        email: emailField,
        cnic: cnicField,
        phone: phoneField,
      }),
    )
    .default([]),
});
