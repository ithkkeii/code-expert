import React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/auth/sign-in">sign-in</Link>
        <Link href="/auth/sign-up">sign-up</Link>
        <Link href="/app/contests">contests</Link>
        <Link href="/app/algorithms">algorithms</Link>
      </Box>
    </Container>
  );
};

export default Home;
