import React from 'react';
import { styled } from '@mui/material';
import SignUpForm from '@/src/components/sign-up-form/SignUpForm';

const SSignUp = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUp = () => {
  return (
    <SSignUp>
      <SignUpForm />
    </SSignUp>
  );
};

export default SignUp;
