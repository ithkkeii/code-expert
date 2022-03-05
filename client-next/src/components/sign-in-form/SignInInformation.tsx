import React, { useState } from 'react';
import { Alert, Button, styled, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { object, string } from 'yup';
import { AxiosError } from 'axios';
import { useSignInMutation } from '@/src/features/auth/auth-api';

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
  password: '',
};

const validationSchema = object().shape({
  email: string()
    .email('Invalid email')
    .min(5, 'Email is over 5 char')
    .required('Required'),
  password: string()
    .min(8, 'Password length is over 8 char')
    .max(20, 'Password length is not over 20 char')
    .required('Required'),
});

const SignInInformation: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const [signIn, { isLoading }] = useSignInMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values).unwrap();
      } catch (err) {
        const axiosErr = err as AxiosError;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (axiosErr.response?.data.message) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const message = axiosErr.response?.data?.message as string;
          setError(message);
        }

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
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={isLoading}
      >
        Submit
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </SForm>
  );
};

export default SignInInformation;
