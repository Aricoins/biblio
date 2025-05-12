"use client";
import { useState, useEffect } from "react";

interface ChatMessage {
  role: string;
  content: string | JSX.Element;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatResponse = (text: string): JSX.Element => {
    const projectMatches = text.match(/####(.*?)\n- (.*?)(?=\n####|$)/gs);
    if (projectMatches) {
      return (
        <div className="project-container">
          {projectMatches.map((project, index) => {
            const details = project.split('\n').filter(line => line.trim());
            return (
              <div key={index} className="project-card">
                {details.map((line, i) => {
                  if (line.startsWith('-')) {
                    const [key, ...value] = line.replace('-', '').split(':');
                    return (
                      <div key={i} className="project-detail">
                        <strong>{key.trim()}:</strong> 
                        <span>{value.join(':').trim()}</span>
                      </div>
                    );
                  }
                  return <div key={i} className="project-title">{line.replace(/####/g, '').trim()}</div>;
                })}
              </div>
            );
          })}
        </div>
      );
    }
    return <>{text}</>;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const tempBotMessage = { role: "bot", content: "Consulta enviada" };
      setMessages((prev) => [...prev, tempBotMessage]);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const formattedResponse = formatResponse(data.reply);
      
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: formattedResponse }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: "⚠️ Error al obtener la respuesta. Intenta nuevamente." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos en objetos para mantener la coherencia
  const styles = {
    floatingButton: {
      position: 'fixed' as const,
      bottom: 35,
      right: 20,
      zIndex: 9,
      transform: 'scale(0.8)',
      transition: 'transform 0.3s ease',
    },
    chatWindow: {
      position: 'fixed' as const,
      bottom: 100,
      right: 20,
      width: '50%',
      height: '60%',
      minWidth: 300,
      maxWidth: 600,
      backgroundColor: 'white',
      borderRadius: 10,
      boxShadow: '0 0 15px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column' as const,
      zIndex: 9,
    },
    messageBubble: (role: string) => ({
      background: role === 'user' ? 'orangered' : '#e4e6eb',
      color: role === 'user' ? 'white' : 'black',
      padding: '8px 12px',
      borderRadius: 15,
      maxWidth: '80%',
      margin: '10px 0',
      alignSelf: role === 'user' ? 'flex-end' as const : 'flex-start' as const,
    }),
    projectCard: {
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 15,
      margin: '10px 0',
      backgroundColor: '#f8f9fa',
    },
    projectTitle: {
      fontSize: '1.1em',
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#2c3e50',
    },
    projectDetail: {
      margin: '5px 0',
      lineHeight: '1.4',
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...styles.floatingButton,
          backgroundColor: 'orangered',
          color: 'white',
          border: '2px solid white',
          borderRadius: '25%',
          padding: '15px 25px',
          cursor: 'pointer',
          fontSize: '1.1em',
        }}
      >
        {isOpen ? "✕" : "Dibiase IA ✨"}
      </button>

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={{
            backgroundColor: 'orangered',
            color: 'white',
            padding: '15px',
            textAlign: 'center',
            fontSize: '1.2em',
          }}>
            Asistente Virtual - DiBiase IA
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '15px',
            backgroundColor: '#f9f9f9',
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={styles.messageBubble(m.role)}>
                  {typeof m.content === 'string' ? m.content : m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={styles.messageBubble('bot')}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="loader-dots"></div>
                  <span style={{ marginLeft: 10 }}>Procesando respuesta...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} style={{
            display: 'flex',
            borderTop: '1px solid #ddd',
            padding: '15px',
            backgroundColor: 'white',
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '10px 15px',
                borderRadius: 20,
                border: '1px solid #ddd',
                marginRight: 10,
                fontSize: '1em',
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: 'orangered',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 20,
                cursor: 'pointer',
                fontSize: '1em',
                transition: 'opacity 0.3s',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .loader-dots {
          display: inline-block;
          position: relative;
          width: 40px;
          height: 20px;
        }
        
        .loader-dots:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #666;
          animation: dotFlashing 1s infinite linear;
        }
        
        .loader-dots:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #666;
          animation: dotFlashing 1s infinite linear 0.3s;
        }
        
        @keyframes dotFlashing {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }

        .project-container {
          max-width: 100%;
          overflow-x: auto;
        }

        .project-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .project-title {
          font-size: 1.1em;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 10px;
          border-bottom: 2px solid #eee;
          padding-bottom: 5px;
        }

        .project-detail {
          margin: 8px 0;
          font-size: 0.95em;
          color: #34495e;
        }

        .project-detail strong {
          color: #2c3e50;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}