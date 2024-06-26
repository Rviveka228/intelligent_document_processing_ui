import * as Yup from 'yup';

export const loginSchema = Yup.object({
  //   username: Yup.string().email('Not a valid email').required(),
  //   password: Yup.string().required().min(6),
  username: Yup.string().required(),
  password: Yup.string().required(),
});
