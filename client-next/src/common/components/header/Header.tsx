import React from 'react';
import { styled } from '@mui/material';
import { useCurrentUserQuery } from '@/src/features/auth/auth-api';

const SHeader = styled('div')`
  border: 1px solid red;
`;

const Header = () => {
  const { data } = useCurrentUserQuery();

  return <SHeader>Header</SHeader>;
};

export default Header;
