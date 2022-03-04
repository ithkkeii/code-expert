import Link from 'next/link';
import React from 'react';

const ExtraOptions: React.FC = () => {
  return (
    <div>
      <Link href="/auth/sign-in">Already have an account? Sign in</Link>
    </div>
  );
};

export default ExtraOptions;
