import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const MailLink = ({ mail }) => {
  // Validar el correo electrónico
  const isValidEmail = (mail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  };

  if (!isValidEmail(mail)) {
    return null; // No renderiza el enlace si el correo no es válido
  }

  return (
    <Link 
      href={`mailto:${mail}`} 
      target="_blank" 
      rel="noopener noreferrer" 

      aria-label={`Enviar correo a ${mail}`}>
      <FontAwesomeIcon icon={faGoogle} size="2x" />
    </Link>
  );
};

MailLink.propTypes = {
  mail: PropTypes.string.isRequired,
};

export default MailLink;
