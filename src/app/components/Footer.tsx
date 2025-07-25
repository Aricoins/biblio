import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 px-4 md:px-8  w-full mb-0" >
   <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sección Acerca de */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#74cbc3] ">DiBiase.Net</h2>
            <p className="text-gray-400">
              Biblioteca y Archivo Graciela Di Biase del Concejo Deliberante de de San Carlos de Bariloche.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#74cbc3]  transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/archivo" className="hover:text-[#74cbc3] transition-colors">
                Archivo
                </Link>
              </li>
              <li>
                <Link href="/libros" className="hover:text-[#74cbc3] transition-colors">
                Biblioteca
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-[#74cbc3]  transition-colors">
                  Nosotros
                </Link>
              </li>
   
              <li>
                <Link href="mailto:digestoconcejo@gmail.com" className="hover:text-[#74cbc3]  transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Conectate</h3>
            <div className="flex space-x-4">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#74cbc3]  transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#74cbc3]  transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                 className="text-gray-400 hover:text-[#74cbc3]  transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                 className="text-gray-400 hover:text-[#74cbc3]  transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>digestoconcejo@gmail.com</li>
              <li>+54 9 294 429100</li>
              <li>Bariloche, Argentina</li>
            </ul>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-gray-800 py-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} DiBiase.Net | Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;