import { useContext } from 'react';

import { RiMoonClearLine, RiSunLine } from '@meronex/icons/ri';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components';
import { ThemeContext } from '@/contexts';

import { MobileNav } from '../Nav';
import styles from './Header.module.scss';

export function Header() {
  const { status } = useSession();

  const { theme, setTheme } = useContext(ThemeContext);

  const logout = async () => {
    await signOut();
  };

  const themeHandler = () => {
    if (theme === `light`) {
      setTheme(`dark`);
    } else {
      setTheme(`light`);
    }
  };

  return (
    <header className={styles.header} id="header">
      <h1 className="h1">
        <Link href={`/`}>PokéRef</Link>
      </h1>
      <div className={styles.buttons}>
        <button
          className={styles.theme}
          onClick={themeHandler}
          aria-label="Switch Theme"
          data-testid="themeBtn"
        >
          {theme === `dark` ? (
            <RiSunLine data-testid="sun" />
          ) : (
            <RiMoonClearLine data-testid="moon" />
          )}
        </button>
        {status === `authenticated` ? (
          <div className={styles.auth}>
            <Button intent="secondary" onClick={logout}>
              Sign Out
            </Button>
            <Button intent="primary" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
          </div>
        ) : (
          <div className={styles.auth}>
            <Button intent="secondary" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button intent="primary" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
        <MobileNav />
      </div>
    </header>
  );
}