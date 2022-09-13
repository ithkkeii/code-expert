import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import logo from '../../../public/logo.svg';

const NavBar = () => {
  return (
    <div className="flex h-full items-center justify-between border-b border-gray-200">
      <div className="flex items-center px-8">
        <Image src={logo} alt="logo" width={40} height={40} />
      </div>
      <div className="flex flex-1 items-center justify-start text-gray-600">
        <div className="px-4 hover:cursor-pointer hover:text-black">
          Explore
        </div>
        <div className="px-4 hover:cursor-pointer hover:text-black">
          Problems
        </div>
      </div>
      <div className="px-4">
        <div className="text-gray-600">
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
