import { useContext } from 'react';
import { GlobalContext } from '../global-state';
import { AppBar } from '../ui/AppBar';

export default function Header() {
  const { pageName } = useContext(GlobalContext);

  return (
    <header>
      <AppBar padding={3}>
        {pageName}
      </AppBar>
    </header>
  );
};