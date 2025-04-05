
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Create a motion div that forwards any custom Button props
const MotionButton = motion(React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <Button ref={ref} {...props} />;
}));

interface AnimatedButtonProps extends ButtonProps {
  whileHover?: object;
  whileTap?: object;
  transition?: object;
  children: React.ReactNode;
}

export const AnimatedButton = ({
  children,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  transition = { type: "spring", stiffness: 400, damping: 10 },
  ...props
}: AnimatedButtonProps) => {
  return (
    <MotionButton
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default AnimatedButton;
