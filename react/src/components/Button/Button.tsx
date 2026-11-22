// React
import type { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'outline';

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
  isIcon?: boolean;
};

const baseClasses =
  'h-12 cursor-pointer rounded-full border border-primary px-5 text-base leading-[normal] font-medium uppercase transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary enabled:hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white',
  outline: 'bg-white text-primary',
};

const iconClasses = 'inline-grid min-w-16 place-items-center sm:min-w-20';
const textClasses = 'sm:min-w-32';

const Button = ({
  variant = 'primary',
  isIcon = false,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) => {
  const classes = [
    baseClasses,
    variantClasses[variant],
    isIcon ? iconClasses : textClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={classes} {...props} />;
};

export default Button;
