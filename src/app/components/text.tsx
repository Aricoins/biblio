// Asegúrate de importar las bibliotecas necesarias
import { FC, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';


const H1 = styled.h6`
  font-size: 12px;
  height: 100%;
  width: 90%;
  color: #080855;
  text-align: justify;
  inline-size: 100%;
  margin: 10% 0% 0% 0%;
  line-height: 1.6;
  justify-self: center;

  @keyframes blinkAnim {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;



const Text: FC<{ setComplete: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setComplete }) => {
  const wordRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const words = [
      " La Biblioteca del Concejo brinda resguardo a la normativa de la ciudad; cuenta con un corpus literario de interés para la comunidad y un archivo de destacado valor documental e histórico."
    ];

    let wordWrapperContent = '';
    let addingWord = true;
    let counter = 0;

    const interval = setInterval(() => {
      if (wordRef.current) {
        const currentWord = words[counter];

        if (addingWord && wordWrapperContent.length < currentWord.length) {
          wordRef.current.innerHTML += currentWord.charAt(wordWrapperContent.length);
          wordWrapperContent = wordRef.current.innerHTML;
        } else if (addingWord && wordWrapperContent.length === currentWord.length) {
          addingWord = false;
          setComplete(true); 
        } else if (!addingWord) {
          addingWord = true;
          counter = (counter + 1) % words.length;
          wordWrapperContent = '';
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [setComplete]);

  return (

      <H1 id="word" ref={wordRef}></H1>
  );
};

export default Text;
