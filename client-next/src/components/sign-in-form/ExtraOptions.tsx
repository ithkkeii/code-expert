import React from 'react';
import Link from 'next/link';
import { Space } from '@/src/components/space';

const ExtraOptions: React.FC = () => {
  return (
    <Space split="&bull;" size="middle">
      <Link href="/">Can&apos;t log in? </Link>
      <Link href="/">Sign up for an account</Link>
    </Space>
  );
};

export default ExtraOptions;
