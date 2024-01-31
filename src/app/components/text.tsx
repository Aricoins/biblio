"use client"
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import logo from "../api/assets/moran.png"

const H1 = styled.h1`
font-size: 14px;
height: 50%;
width: 80%;
line-height: 120%;
color: #092945;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0% 25% 25% 25%;


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
    let words = [' Biblioteca y Archivo  Graciela Morán de Di Biase '],
    wordWrapperContent = '',
    addingWord = true,
    counter = 0;
  
    const interval = setInterval(function(){
      if(wordRef.current) {
        if(addingWord && wordWrapperContent.length < words[counter].length) {
          wordRef.current.innerHTML += words[counter].charAt(wordWrapperContent.length);
          wordWrapperContent = wordRef.current.innerHTML;
        } else if(addingWord && wordWrapperContent.length === words[counter].length) {
          addingWord = false;
        
        } else if(!addingWord) {
          addingWord = true;
          if(counter < words.length - 1) {
            counter++;
          } else {
            counter = 0;
          }
          wordWrapperContent = '';
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    (
      <div className="mx-auto">
        <H1 className="w-8/12 text-gray-100 word " id="word" ref={wordRef}></H1>
      </div>
    )
  );
}

export default Text;