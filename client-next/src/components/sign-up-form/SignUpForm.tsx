import React from 'react';
import { Divider, Paper, styled } from '@mui/material';
import SignUpInformation from '@/src/components/sign-up-form/SignUpInformation';
import ExtraOptions from '@/src/components/sign-in-form/ExtraOptions';

const SSignUpForm = styled(Paper)`
  display: flex;
  flex-flow: column nowrap;
  width: 400px;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4)};
  margin: auto;
`;

const SignUpForm: React.FC = () => {
  return (
    <SSignUpForm>
      <SignUpInformation />
      <Divider variant="middle">OR</Divider>
      <Divider variant="middle" />
      <ExtraOptions />
    </SSignUpForm>
  );
};

export default SignUpForm;
