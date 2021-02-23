import { useContext } from 'react';
import { GlobalContext } from '../global-state';
import { AppBar } from '../ui/AppBar';

export default function Header() {
  const { pageName } = useContext(GlobalContext);

  return (
    <header>
      <AppBar py={3} px={4}>
        {pageName}
      </AppBar>
    </header>
  );
};