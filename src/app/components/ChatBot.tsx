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
  const sections = text.split(/\n\n+/);
  return (
    <div className="response-container">
      {sections.map((section, index) => {
        if (section.startsWith("###")) {
          return <h3 key={index} className="section-title">{section.replace(/###/, "").trim()}</h3>;
        }
        if (section.startsWith("**Consulta:**")) {
          return (
            <div key={index} className="question-section">
              <div className="icon-section">📋</div>
              <div className="content-section">
                <p className="question-text">{section.replace("**Consulta:**", "").trim()}</p>
              </div>
            </div>
          );
        }
        if (section.startsWith("**Respuesta:**")) {
          return (
            <div key={index} className="answer-section">
              <div className="icon-section">✅</div>
              <div className="content-section">
                <p className="answer-text">{section.replace("**Respuesta:**", "").trim()}</p>
              </div>
            </div>
          );
        }
        if (section.startsWith("**Detalles Adicionales:**")) {
          const details = section.split("\n").slice(1);
          return (
            <div key={index} className="details-section">
              <div className="icon-section">📌</div>
              <div className="content-section">
                <h4 className="details-title">Detalles importantes</h4>
                <ul className="details-list">
                  {details.map((detail, i) => (
                    <li key={i} className="detail-item">
                      {detail.replace(/^- /, "").trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
        if (section.startsWith("**Nota:**")) {
          return (
            <div key={index} className="note-section">
              <div className="icon-section">ℹ️</div>
              <div className="content-section">
                <p className="note-text">{section.replace("**Nota:**", "").trim()}</p>
              </div>
            </div>
          );
        }
        return <p key={index} className="regular-text">{section}</p>;
      })}
    </div>
  );
};

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const tempBotMessage = { role: "bot", content: "Consulta enviada..." };
      setMessages((prev) => [...prev, tempBotMessage]);
  const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 95000000); // Abort after 9.5s

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
        signal: controller.signal,
      });

     clearTimeout(timeoutId);
    const data = await res.json();
       if (res.ok) {

      const formattedResponse = formatResponse(data.reply);
      
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: formattedResponse }
      ]);} else {
       throw new Error("Error en la respuesta del servidor");
      } 
    } catch (error) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "name" in error &&
        (error as { name?: string }).name === "AbortError"
          ? "Estamos trabajando en optimizar esta herramienta, por favor intenta nuevamente más tarde."
          : "Estamos trabajando en optimizar esta herramienta, por favor intenta nuevamente más tarde.";
      
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { role: "bot", content: errorMessage }
    ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos en objetos para mantener la coherencia
  const styles = {
    floatingButton: {
      position: 'fixed' as const,
      bottom: 65,
      right: 0,
      zIndex: 99,
      transform: 'scale(0.8)',
      transition: 'transform 0.3s ease',
    },
    chatWindow: {
      position: 'fixed' as const,
      bottom: 130,
      right: 20,
      width: '90%',
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
      background: role === 'user' ? '#74cbc3' : '#e4e6eb',
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
    },
      responseContainer: {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.2em',
    color: '#2c3e50',
    borderBottom: '2px solid #74cbc3',
    paddingBottom: '8px',
    marginBottom: '15px',
  },
  questionSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    display: 'flex',
    gap: '15px',
  },
  answerSection: {
    backgroundColor: '#e8f4f3',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    display: 'flex',
    gap: '15px',
  },
  detailsSection: {
    backgroundColor: '#fff4e5',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    display: 'flex',
    gap: '15px',
  },
  noteSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    display: 'flex',
    gap: '15px',
  },
  iconSection: {
    fontSize: '1.5em',
    marginTop: '3px',
  },
  contentSection: {
    flex: 1,
  },
  detailsList: {
    listStyleType: 'none',
    paddingLeft: '0',
    margin: '0',
  },
  detailItem: {
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};
  

  return (
    <div style={{fontFamily: 'Roboto, sans-serif', fontSize: 'large'}}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...styles.floatingButton,
          backgroundColor: '#74cbc3',
          color: 'black',
          border: '2px solid white',
          borderRadius: '25%',
          padding: '15px 25px',
          cursor: 'pointer',
          fontSize: '1.1em',
        }}
      >
        {isOpen ? " ✕ " : "IA ✨"}
      </button>

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={{
            backgroundColor: '#74cbc3',
            color: 'white',
            padding: '15px',
            textAlign: 'center',
            fontSize: 'large',
            fontFamily: 'Roboto',
            fontWeight: 'bold'
          }}>
            Asistente Virtual | DiBiase IA
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
                  <span style={{ marginLeft: 10 }}>Procesando...</span>
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
                color: 'black',
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: '#74cbc3',
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
          .response-container {
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .section-title {
    font-size: 1.2em;
    color: #2c3e50;
    border-bottom: 2px solid #74cbc3;
    padding-bottom: 8px;
    margin-bottom: 15px;
  }

  .question-section, .answer-section, .details-section, .note-section {
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    display: flex;
    gap: 15px;
  }

  .question-section {
    background: #f8f9fa;
  }

  .answer-section {
    background: #e8f4f3;
  }

  .details-section {
    background: #fff4e5;
  }

  .note-section {
    background: #e3f2fd;
  }

  .icon-section {
    font-size: 1.5em;
    margin-top: 3px;
  }

  .details-list {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }

  .detail-item {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .detail-item:last-child {
    border-bottom: none;
  }

  .details-title {
    color: #e67e22;
    margin-bottom: 10px;
    font-size: 1.1em;
  }

  .note-text {
    color: #0d47a1;
    margin: 0;
  }
      `}</style>
    </div>
  );
}