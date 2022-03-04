import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Space } from '@/src/components/space';

const UnauthorizedOptions = () => {
  const router = useRouter();

  return (
    <Space>
      <Button
        variant="text"
        size="small"
        onClick={() => router.push('/auth/sign-in')}
      >
        sign in
      </Button>
      <Button
        variant="text"
        size="small"
        onClick={() => router.push('/auth/sign-up')}
      >
        sign up
      </Button>
    </Space>
  );
};

export default UnauthorizedOptions;
