import React from 'react';
import { Button as NextUIButton } from '@nextui-org/react';

const MyButton = ({ children }) => {
  return (
    <NextUIButton className='hover:bg-orange-500'>
      {children}
    </NextUIButton>
  );
};

export default MyButton;