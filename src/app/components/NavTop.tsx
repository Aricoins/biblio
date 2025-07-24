"use client"
import Link from 'next/link';
import logo from "../api/assets/moran.png"
import Image from 'next/image';
import styles from './NavTop.module.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
// Importar los iconos mejorados
import { FaArchive, FaBook, FaDatabase, FaUser } from 'react-icons/fa';

const NavTop = () => {
  const pathname = usePathname();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={clsx(styles.navTop, { [styles.hidden]: isHidden })}>
      <Link href="/" className={styles.navTopLink}>
        <div className={styles.logoContainer}>
          <Image 
            src={logo}
            width={200} 
            height={300} 
            alt="DiBiase.Net - Archivo Municipal" 
            priority
            className={styles.navTopImage}
          />
        </div>
      </Link>
      
      <ul className={styles.navTopList}>
        <li className={styles.item}>
          <Link href="/archivo" className={clsx(styles.link, {
            [styles.link2]: pathname === '/archivo',
          })}>
            <span className={styles.linkContent}>
              <FaArchive className={styles.linkIcon} />
              <span className={styles.linkText}>Archivo</span>
            </span>
          </Link>
        </li>
        
        <li className={styles.item}>
          <Link href="/libros" className={clsx(styles.link, {
            [styles.link2]: pathname === '/libros',
          })}>
            <span className={styles.linkContent}>
              <FaBook className={styles.linkIcon} />
              <span className={styles.linkText}>Biblioteca</span>
            </span>
          </Link>
        </li>
        
        <li className={styles.item}>
          <Link href="/admin" className={clsx(styles.link, {
            [styles.link2]: pathname === '/admin',
          })}>
            <span className={styles.linkContent}>
              <FaDatabase className={styles.linkIcon} />
              <span className={styles.linkText}>Datos</span>
            </span>
          </Link>
        </li>
        
        <li className={styles.authItem}>
          <div className={styles.authContainer}>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className={styles.authButton}>
                  <FaUser className={styles.authIcon} />
                  <span className={styles.authText}>Ingresar</span>
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className={styles.userButtonContainer}>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: styles.userAvatar,
                      userButtonTrigger: styles.userButtonTrigger
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavTop;
