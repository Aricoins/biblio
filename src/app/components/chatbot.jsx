'use client';
import { useState, useEffect } from 'react';
import { MLCEngine } from "@mlc-ai/web-llm";

const selectedModel = "Llama-3-8B-Instruct-q4f32_1-MLC";
let engine;

async function initializeEngine() {
    if (!engine) {
        engine = new MLCEngine();
        engine.setInitProgressCallback(console.info);
        await engine.reload(selectedModel);
    }
}

export default function ChatBot() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        initializeEngine();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/IA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();

            // Procesar el mensaje en el cliente usando MLCEngine
            const messages = [
                { role: "system", content: "You are a helpful AI assistant." },
                { role: "user", content: message },
            ];
            const reply = await engine.chat.completions.create({ messages });
            const responseMessage = reply.choices[0].message;

            setResponse(responseMessage);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setResponse('Error al enviar mensaje');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            {response && <p>Respuesta: {response}</p>}
        </div>
    );
}
