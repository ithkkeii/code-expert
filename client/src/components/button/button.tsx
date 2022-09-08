import classNames from 'classnames';
import React from 'react';

type Props = {
  variant?: 'text' | 'contained';
  color?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = (props) => {
  const {
    variant = 'contained',
    color = 'primary',
    children,
    className = '',
    ...rest
  } = props;

  return (
    <button
      className={classNames({
        'border-transparent group relative flex justify-center rounded-md border bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1':
          variant === 'contained',
        'rounded-md py-2 px-4 text-sm hover:bg-gray-200': variant === 'text',
        [className]: true,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
