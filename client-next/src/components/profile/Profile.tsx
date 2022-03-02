import React from 'react';
import { useCurrentUserQuery } from '@/src/features/auth/auth-api';

const Profile = () => {
  const { isError, isLoading, error } = useCurrentUserQuery();

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>{JSON.stringify(error)}</div>;

  return <div>Profile</div>;
};

export default Profile;
