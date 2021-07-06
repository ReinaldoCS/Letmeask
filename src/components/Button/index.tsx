import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: PropsButton) {
  return (
    <button
      type="submit"
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  );
}
