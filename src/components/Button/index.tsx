import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: PropsButton) {
  return <button type="submit" className="button" {...props} />;
}
