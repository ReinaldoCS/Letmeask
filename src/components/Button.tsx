import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: PropsButton) {
  return <button type="submit" className="button" {...props} />;
}
