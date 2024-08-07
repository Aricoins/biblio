"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const Home: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            saveAs(response.data, 'proyectoshoy.json');
        } catch (error) {
            console.error('Error al procesar el archivo:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Subir archivo para extracción</h1>
            <input type="file" accept=".docx" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Procesando...' : 'Subir y procesar'}
            </button>
        </div>
    );
};

export default Home;
