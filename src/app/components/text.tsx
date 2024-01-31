"use client"
import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import logo from "../api/assets/moran.png"

const H1 = styled.h1`
font-size: 60px;
height: 100%;
color: black;

&::after {
    content: '/';
    background-color: #070000;
    width: 1px;
    position: absolute;
    top: 5px;
    bottom: 5px;
    color: #0a0101;
    right: 7px;
    animation: blinkAnim 50ms linear infinite;
  }

  @keyframes blinkAnim {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;

const Text: FC = () => {
  const wordRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    let words = ['  ',' Biblioteca ', ' y ', ' Archivo ', ' Graciela ', 'Morán ', ' de ', ' Di ', ' Biase  ',  `_`, ` __ `, ` __ `, ` ___ ` ,` ____ `, `Ingresar >`  ],
    wordWrapperContent = '',
    addingWord = true,
    counter = 0;

    const interval = setInterval(function(){
      if(wordRef.current) {
        if(wordWrapperContent.length > 0 && !addingWord ) {
          wordRef.current.innerHTML = wordWrapperContent.slice(0, -1);
          wordWrapperContent = wordRef.current.innerHTML;
        } else {
          addingWord = true;
        }

        if(addingWord && wordWrapperContent.length < words[counter].length) {
          wordRef.current.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1);
          wordWrapperContent = wordRef.current.innerHTML;
        } else if(addingWord && wordWrapperContent.length === words[counter].length) {
          addingWord = false;
          if(counter < words.length - 1) {
            counter++;
          } else {
            counter = 0;
          }
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        <H1 className="text-2x1 text-gray-100 word " id="word" ref={wordRef}></H1>
         </div>
  )
}

export default Text;