import { useState, useCallback, useRef, useEffect } from "react";

export function useChat() {
  const [messages, setMessages] = useState<{ role:string; content:string }[]>([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController>();

  const send = useCallback(async (text: string) => {
    setMessages(m => [...m, { role: "user", content: text }]);
    setLoading(true);
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
        signal: controllerRef.current.signal
      });
      const { reply } = await res.json();
      setMessages(m => [...m, { role: "bot", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "bot", content: "Error en la conversación." }]);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  return { messages, loading, send };
}