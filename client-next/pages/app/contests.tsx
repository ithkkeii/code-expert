import React from 'react';
import Link from 'next/link';
import Profile from '@/src/components/profile/Profile';

const Contests = () => {
  return (
    <div>
      <Profile />
      <span>contests</span>
      <Link href="/app/algorithms">to algorithm</Link>
    </div>
  );
};

export default Contests;
