import React, { useEffect, useState } from 'react';
import { Alert, Button, styled } from '@mui/material';
import {
  Field,
  Form,
  Formik,
  FormikHelpers,
  useFormik,
  useFormikContext,
} from 'formik';
import { object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '@/src/app/hook';
import FormikTextField from '@/src/components/formik-text-field/FormikTextField';
import { useSignInMutation } from '@/src/features/auth/authApi';

const SForm = styled(Form)`
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

const AuthError = () => {
  // const authError = useAppSelector((store) => store.auth.error);
  const authError = null;
  // Submitting error
  const [rejectedError, setRejectedError] = useState<string | null>(null);

  const { setSubmitting } = useFormikContext();

  useEffect(() => {
    if (authError) {
      setSubmitting(false);
    }
  }, [authError, setSubmitting]);

  if (!rejectedError) return null;

  return <Alert severity="error">{rejectedError}</Alert>;
};

const SignInInformation: React.FC = () => {
  const dispatch = useAppDispatch();

  const [signIn, result] = useSignInMutation();

  const handleSubmit = (values: typeof initialValues) => {
    signIn({ email: values.email, password: values.password })
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (result.error) {
      console.log(result.error);
    }
  }, [result.error]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <SForm>
          <Field
            component={FormikTextField}
            type="email"
            name="email"
            value={values.email}
            label="Email"
            variant="outlined"
            color="primary"
            size="small"
          />
          <Field
            component={FormikTextField}
            type="password"
            name="password"
            value={values.password}
            label="Password"
            variant="outlined"
            color="primary"
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Submit
          </Button>
          <AuthError />
        </SForm>
      )}
    </Formik>
  );
};

export default SignInInformation;
