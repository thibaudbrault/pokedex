import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { Spin as Hamburger } from 'hamburger-react'
import { H1 } from '@/components/common/styles/Headings';
import {
  BurgerClose,
  BurgerOpen,
  HeaderBtnConnect,
  HeaderBtnConnected,
  HeaderBtnContainer,
  HeaderBtnTheme,
  HeaderContainer,
} from '@/components/layout/Header/Styled.Header';
import { RiMoonClearLine } from '@meronex/icons/ri';
import { RiSunLine } from '@meronex/icons/ri';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { FiMenu, FiX } from '@meronex/icons/fi';

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
  themeToggler: () => void;
  theme: string;
};

function Header({ navOpen, setNavOpen, themeToggler, theme }: Props) {
  const [user, setUser] = useState<User | null>();
  // const usersCollectionRef = collection(db, `users`);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });
  }, []);

  return (
    <HeaderContainer id="header">
      <H1>PokéRef</H1>
      <HeaderBtnContainer>
        <HeaderBtnTheme
          onClick={themeToggler}
          aria-label="Switch Theme"
          data-testid="themeBtn"
        >
          {theme === `dark` ? (
            <RiSunLine data-testid="sun" />
          ) : (
            <RiMoonClearLine data-testid="moon" />
          )}
        </HeaderBtnTheme>
        {user ? (
          <HeaderBtnConnected>
            <button onClick={logout}>Sign Out</button>
            <Link href="/profile">Profile</Link>
          </HeaderBtnConnected>
        ) : (
          <HeaderBtnConnect>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </HeaderBtnConnect>
        )}
        {navOpen ? (
          <BurgerOpen onClick={() => setNavOpen(!navOpen)}>
            <FiX />
          </BurgerOpen>
        ) : (
          <BurgerClose onClick={() => setNavOpen(!navOpen)}>
            <FiMenu />
          </BurgerClose>
        )}
        {/* <Hamburger
          responsive={true}
          toggled={navOpen}
          toggle={setNavOpen}
          rounded
          size={30}
          label='Show menu'
          hideOutline={false}
        /> */}
      </HeaderBtnContainer>
    </HeaderContainer>
  );
}

export default Header;
