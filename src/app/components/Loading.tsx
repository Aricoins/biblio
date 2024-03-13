import React from 'react';
import spin from '../api/assets/spin.gif';
import Image from 'next/image';

export default function Loading() {
    return (
        <div>
            <Image src={spin} alt="loading" />
        </div>
    )
}