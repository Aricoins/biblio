"use client"
import Link from 'next/link';
import logo from "../api/assets/concejo.png"
import Image from 'next/image';
import styles from './NavFoot.module.css';



const NavFoot = () => {
  return (
    <div className ={ styles.navFoot }  >
      
      <ul className="flex text-6x1 items-center flex-row justify-between w-full mx-28">
      <li>
          <Link href="https://concejobariloche.gov.ar/" 
          target="_blank">
          Concejo Municipal
          </Link>
        </li>
        <li>
          <Link href="http://10.20.101.141/gbuscador/" 
          target="_blank">
           Digesto Jurídico
          </Link>
        </li>
        <li>
          <Link 
          href="https://concejobariloche.gov.ar/index.php?option=com_rsform&formId=5"
          target="_blank"
          >
           Mesa de entradas
          </Link>
        </li>
</ul>
      <Image 
      src={logo} 
      width={180}
      alt="logotipo"/>
    </div>
  );
};

export default NavFoot;