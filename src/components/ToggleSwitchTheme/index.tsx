import { LabelHTMLAttributes } from 'react';

import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type PropsLabel = LabelHTMLAttributes<HTMLLabelElement>;

export function ToggleSwitchTheme(props: PropsLabel) {
  const { toggleTheme } = useTheme();
  return (
    <label htmlFor="checkbox" {...props}>
      {window.localStorage.getItem(`theme`) === `dark` ? (
        <input onClick={toggleTheme} type="checkbox" id="checkbox" checked />
      ) : (
        <input onClick={toggleTheme} type="checkbox" id="checkbox" />
      )}
      <div className="slider round" />
    </label>
  );
}
