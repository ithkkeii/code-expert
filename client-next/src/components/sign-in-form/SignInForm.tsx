import React from 'react';
import { styled, Paper, Divider } from '@mui/material';
import SignInInformation from '@/src/components/sign-in-form/SignInInformation';
import ExtraOptions from '@/src/components/sign-in-form/ExtraOptions';

const SSignInForm = styled(Paper)`
  display: flex;
  flex-flow: column nowrap;
  width: 400px;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  margin: auto;
`;

const SignInForm: React.FC = () => {
  return (
    <SSignInForm>
      <SignInInformation />
      <Divider>OR</Divider>
      <Divider />
      <ExtraOptions />
    </SSignInForm>
  );
};

export default SignInForm;
