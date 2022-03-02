import React from 'react';
import { styled } from '@mui/material';
import { SignInForm } from '@/src/components/sign-in-form';

const SAuthPage = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthPage = () => {
  return (
    <SAuthPage>
      <SignInForm />
    </SAuthPage>
  );
};

export default AuthPage;
