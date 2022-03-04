import React from 'react';
import { LoadingButton } from '@mui/lab';
import { useSignOutMutation } from '@/src/features/auth/auth-api';

const SignOut = () => {
  const [signOut, { isLoading }] = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      // TODO: show something useful
    }
  };

  return (
    <LoadingButton
      loading={isLoading}
      variant="text"
      size="small"
      onClick={handleSignOut}
    >
      sign out
    </LoadingButton>
  );
};

export default SignOut;
