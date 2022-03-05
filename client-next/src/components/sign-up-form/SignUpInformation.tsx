import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Alert, styled, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import PasswordMeasureBar from '@/src/components/sign-up-form/PasswordMeasureBar';
import { useSignUpMutation } from '@/src/features/auth/auth-api';

const SForm = styled('form')`
  display: flex;
  flex-flow: column wrap;
  width: 100%;

  .MuiTextField-root {
    margin: ${({ theme }) => theme.spacing(1)} 0;
  }

  .MuiFormHelperText-root {
    margin: 0;
  }

  button {
    margin: ${({ theme }) => theme.spacing(1)} 0;
  }
`;

const initialValues = {
  email: '',
  name: '',
  password: '',
};

const validationSchema = object().shape({
  email: string()
    .email('Invalid email')
    .min(5, 'Email is over 5 char')
    .required('Required'),
  name: string().min(2, 'Name is over 2 char').required('Required'),
  password: string()
    .min(1, 'Password length is equal or over 9 char')
    .max(20, 'Password length is not over 20 char')
    .required('Required'),
});

const SignUpInformation: React.FC = () => {
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  const [signUp, { isLoading }] = useSignUpMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signUp(values).unwrap();
      } catch (err) {
        const axiosErr = err as AxiosError;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (axiosErr.response?.data.message) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const message = axiosErr.response?.data?.message as string;
          setError(message);
        }
        setError('Sign up fail');
        return;
      }

      // Navigate on success
      const des = '/app/contests';
      try {
        await router.push(des);
      } catch (err) {
        // Hard refresh page if router fail for some reasons
        window.location.href = des;
      }
    },
  });

  return (
    <SForm onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        size="small"
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        size="small"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        size="small"
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <PasswordMeasureBar password={formik.values.password} />
      <LoadingButton
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        loading={isLoading}
      >
        Submit
      </LoadingButton>
      {error && <Alert severity="error">{error}</Alert>}
    </SForm>
  );
};

export default SignUpInformation;
