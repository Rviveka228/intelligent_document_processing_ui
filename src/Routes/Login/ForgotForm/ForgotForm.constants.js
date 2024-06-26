import * as Yup from 'yup';

export const forgotSchema = Yup.object({
  email: Yup.string().email('Not a valid email').required(),
});
