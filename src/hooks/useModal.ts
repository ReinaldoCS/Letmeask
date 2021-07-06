import { useState } from 'react';

export function useModal(boolean: boolean) {
  const [thisOpen, setThisOpen] = useState(false);

  setThisOpen(boolean);

  return { thisOpen };
}
