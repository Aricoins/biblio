import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

interface JuntaNormativa {
  norma: string;
  descripcion: string;
  link: string;
  estado?: string;
  tipo?: string;
}

export default function JuntaNormativas() {
  const [normativas, setNormativas] = useState<JuntaNormativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
      const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/juntasGenerales');
        
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }
        
        const data = await response.json();
        
        // Filtrar y limpiar los datos
        const cleanData = data
          .filter((item: any) => item.norma && item.descripcion) // Solo elementos con norma y descripción
          .map((item: any) => ({
            norma: item.norma || '',
            descripcion: item.descripcion || '',
            link: item['link '] || item.link || '', // Usar 'link ' (con espacio) como clave principal
            estado: item.estado || '',
            tipo: item.tipo || ''
          }));
        
        setNormativas(cleanData);
      } catch (err) {
        setError('Error cargando normativas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "5%" }}>
        <div style={{ 
          padding: "40px", 
          backgroundColor: "white", 
          borderRadius: "15px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb"
        }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            border: "3px solid #74cbc3", 
            borderTop: "3px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px auto"
          }}></div>
          <p style={{ 
            fontSize: "14px", 
            color: "#64748b",
            fontFamily: "'Roboto', sans-serif",
            margin: "0"
          }}>
            Cargando normativas...
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", margin: "5%" }}>
        <div style={{ 
          backgroundColor: "#fef2f2", 
          border: "1px solid #fecaca", 
          borderRadius: "15px", 
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
            <svg style={{ width: "20px", height: "20px", color: "#dc2626", marginRight: "12px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style={{ 
              fontSize: "16px", 
              fontWeight: "500", 
              color: "#991b1b",
              fontFamily: "'Roboto', sans-serif",
              margin: "0"
            }}>
              Error al cargar datos
            </h3>
          </div>
          <p style={{ 
            fontSize: "14px", 
            color: "#7f1d1d", 
            margin: "0",
            fontFamily: "'Roboto', sans-serif"
          }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", margin: "5%" }}>
      {/* Header */}
      <h2
        style={{
          fontSize: "medium",
          fontWeight: 500,
          cursor: "pointer",
          backgroundColor: "#74cbc3",
          color: "black",
          transition: "0.5s",
          border: "black 2px solid",
          fontFamily: "'Roboto', sans-serif",
          borderRadius: "25px",
          textAlign: "center",
          width: "70%",
          margin: "0 auto 2% auto",
          padding: "1%",
          boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px"
        }}
        onClick={() => setVisible(!visible)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f7f8fa";
          e.currentTarget.style.border = "#74cbc3 2px solid";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#74cbc3";
          e.currentTarget.style.border = "black 2px solid";
        }}
      >
        {visible ? <MdExpandLess /> : <MdExpandMore />} 
        Juntas Vecinales | Normativa  
        {visible ? <MdExpandLess /> : <MdExpandMore />}
      </h2>

      {/* Table Section */}
      {visible && (
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          margin: "2% auto",
          width: "95%"
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ 
                    padding: "16px", 
                    textAlign: "left", 
                    fontSize: "12px", 
                    fontWeight: "600", 
                    color: "#374151", 
                    textTransform: "uppercase",
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    Norma
                  </th>
                  <th style={{ 
                    padding: "16px", 
                    textAlign: "left", 
                    fontSize: "12px", 
                    fontWeight: "600", 
                    color: "#374151", 
                    textTransform: "uppercase",
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    Descripción
                  </th>
                  <th style={{ 
                    padding: "16px", 
                    textAlign: "center", 
                    fontSize: "12px", 
                    fontWeight: "600", 
                    color: "#374151", 
                    textTransform: "uppercase",
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    Documento
                  </th>
                </tr>
              </thead>
              <tbody>
                {normativas.map((item, index) => (
                  <tr 
                    key={index} 
                    style={{ 
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    <td style={{ padding: "16px", verticalAlign: "top" }}>
                      <div style={{ marginBottom: "8px" }}>
                        <div style={{ 
                          fontWeight: "500", 
                          color: "#111827", 
                          fontSize: "14px",
                          fontFamily: "'Roboto', sans-serif",
                          lineHeight: "1.4"
                        }}>
                          {item.norma}
                        </div>
                        {(item.estado || item.tipo) && (
                          <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                            {item.estado && (
                              <span style={{
                                backgroundColor: "#d1fae5",
                                color: "#065f46",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "11px",
                                fontWeight: "500",
                                fontFamily: "'Roboto', sans-serif"
                              }}>
                                {item.estado}
                              </span>
                            )}
                            {item.tipo && (
                              <span style={{
                                backgroundColor: "#dbeafe",
                                color: "#1e40af",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "11px",
                                fontWeight: "500",
                                fontFamily: "'Roboto', sans-serif"
                              }}>
                                {item.tipo}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td style={{ padding: "16px", verticalAlign: "top" }}>
                      <p style={{ 
                        fontSize: "14px", 
                        color: "#374151", 
                        lineHeight: "1.5",
                        fontFamily: "'Roboto', sans-serif",
                        margin: "0"
                      }}>
                        {item.descripcion}
                      </p>
                    </td>
                    
                    <td style={{ padding: "16px", textAlign: "center", verticalAlign: "middle" }}>
                      {item.link && item.link.trim() !== '' ? (
                        <Link 
                          href={item.link.trim()} 
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px 16px",
                            backgroundColor: "#74cbc3",
                            color: "black",
                            fontSize: "13px",
                            fontWeight: "500",
                            borderRadius: "8px",
                            textDecoration: "none",
                            transition: "all 0.2s",
                            fontFamily: "'Roboto', sans-serif",
                            border: "1px solid transparent"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#5fb3ab";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.12)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#74cbc3";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <svg style={{ width: "16px", height: "16px", marginRight: "6px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Ver documento
                        </Link>
                      ) : (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "500",
                          backgroundColor: "#f1f5f9",
                          color: "#64748b",
                          fontFamily: "'Roboto', sans-serif"
                        }}>
                          No disponible
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footer with count */}
          <div style={{ 
            backgroundColor: "#f8fafc", 
            padding: "12px 24px", 
            borderTop: "1px solid #e2e8f0",
            textAlign: "center"
          }}>
            <p style={{ 
              fontSize: "12px", 
              color: "#64748b", 
              margin: "0",
              fontFamily: "'Roboto', sans-serif"
            }}>
              {normativas.length} normativa{normativas.length !== 1 ? 's' : ''} encontrada{normativas.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}