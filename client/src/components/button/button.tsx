import React from 'react';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';

const Button: React.FC<ButtonUnstyledProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <ButtonUnstyled
      className="rounded-sm bg-green-600 px-3 py-1 font-semibold text-white hover:bg-green-600 active:outline-none active:ring active:ring-green-100"
      {...rest}
    >
      {children}
    </ButtonUnstyled>
  );
};

export default Button;
