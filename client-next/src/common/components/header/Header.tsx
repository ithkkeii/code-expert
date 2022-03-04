import React from 'react';
import { Container, styled } from '@mui/material';
import { useCurrentUserQuery } from '@/src/features/auth/auth-api';
import UnauthorizedOptions from '@/src/common/components/header/UnauthorizedOptions';
import AuthorizedOptions from '@/src/common/components/header/AuthorizedOptions';
import Logo from '@/src/common/components/header/Logo';

const SHeader = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const Header = () => {
  const { data, isLoading } = useCurrentUserQuery();

  if (isLoading) return <SHeader>Loading</SHeader>;

  if (!data) {
    return (
      <SHeader>
        <Logo />
        <UnauthorizedOptions />
      </SHeader>
    );
  }

  return (
    <SHeader>
      <Logo />
      <AuthorizedOptions />
    </SHeader>
  );
};

export default Header;
