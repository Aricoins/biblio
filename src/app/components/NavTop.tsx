"use client"
import Link from 'next/link';
import logo from "../api/assets/moran.png"
import Image from 'next/image';
import styles from './NavTop.module.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';


const NavTop = () => {

  const pathname = usePathname();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
    return (
   <div className={styles.navTop}>
    <Link href="/" passHref className={styles.navTopLink} >
        <div >
        <Image 
          src={logo}
          width={200} 
          height={300} 
          alt="logotipo" 
          priority
       style={{width: "50%", height: "100%"}}
        />
        </div>
      </Link>
    <div className={styles.navTopList}>
      <div className={styles.item}>    
       <Link href="/archivo" className={clsx(styles.link, {
         [styles.link2]: pathname === '/archivo',
        
        })}>
          Archivo
        </Link>
      </div>

      <div className={styles.item}>
        <Link   href="/libros" className={clsx(styles.link, {
          [styles.link2]: pathname === '/libros',
        
        })}>
        Bilioteca
        </Link>
      </div>
      <div className= {styles.item}>
        <Link  className ={styles.link} href="/admin" >
          Datos
        </Link>
      </div>
      <div className={styles.item2}> <li>

      <SignedOut>
              <SignUpButton > Ingresar </SignUpButton>
            
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
      
      </li> 
    </div>
      </div>
    </div>

  );
};
export default NavTop;