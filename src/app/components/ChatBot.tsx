"use client";
import { useState, useEffect } from "react";
interface ChatMessage {
  role: string;
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { role: "bot", content: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };


  return (
    <div>
      {/* Botón flotante para abrir/cerrar el chat */}
      <div
        style={{
          position: "fixed",
          bottom: 35,
          zIndex: 9,
          right: 0,
          scale: 0.5,
          color: "orangered",
          width: "40%",
          padding: "10px",
       
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: "orangered" ,
            color: "white",
            border: "2px solid white",
            cursor: "pointer",
            fontSize: "large",
            borderRadius: "50%",
            zIndex: 9,
            textAlign: "right",
            justifyContent: "right",
            padding: "2%",
            boxShadow: "0px 10px 15px rgba(0,0,0,0.8)",
          }}
        >
          {isOpen ? "X" : "Dibiase IA ✨"}
        </button>
      </div>

      {/* Ventana de chat */}
      {isOpen && (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "Roboto",
            position: "fixed",
            bottom: 100,
            right: 20,
            width: "50%",
            height: "60%",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
            color: "black",
            zIndex: 9,
          }}
        >
          <div
            style={{
              backgroundColor: "orangered",
              color: "white",
              padding: "10px",
              textAlign: "center",
              fontSize: "16px",
              zIndex: 9,
              fontFamily: "Roboto",
            }}
          >
            DiBiase IA ✨
          </div>

          <div
            style={{
              flex: 1,
              zIndex: 9,
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
              width: "90%",
              margin: " 0 auto",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  margin: "10px 0",
                  textAlign: m.role === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    background: m.role === "user" ? "orangered" : "#e4e6eb",
                    color: m.role === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    display: "inline-block",
                    fontFamily: "Roboto",
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              borderTop: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "white",
              fontFamily: "Roboto",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu consulta ..."
              style={{
                flex: 1,
                minWidth: "60%",
                marginRight: "10px",
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "orangered",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
