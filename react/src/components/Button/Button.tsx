// React
import type { ComponentProps } from 'react';

// Styles
import styles from './Button.module.css';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'outline';
  isIcon?: boolean;
};

const Button = ({
  variant = 'primary',
  isIcon = false,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) => {
  const classes = [
    styles.button,
    styles[variant],
    isIcon && styles.icon,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={classes} {...props} />;
};

export default Button;
