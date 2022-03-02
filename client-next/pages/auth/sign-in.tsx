import React from 'react';
import { styled } from '@mui/material';
import SignInForm from '@/src/components/sign-in-form/SignInForm';

const SSignIn = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignIn = () => {
  return (
    <SSignIn>
      <SignInForm />
    </SSignIn>
  );
};

export default SignIn;
