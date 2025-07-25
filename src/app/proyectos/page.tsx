"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Input, Checkbox, Typography, Table, Spin, Pagination } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "./styles.module.css";
import Link from "next/link";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsDatabaseFillCheck } from "react-icons/bs";
import ProtectedRoute from "../components/ProtectedRoute";

const { Title } = Typography;

interface Proyecto {
  id: number;
  numero_proyecto: string;
  anio_proyecto: string;
  titulo_proyecto: string;
  tipo_proyecto: string;
  autor: string[];
  colaboradores: string | null;
  girado_a: string;
  acta_fecha: string | null;
  aprobado: boolean;
  tipo_norma: string;
  numero_norma: string;
  observaciones: string;
}

function Proyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [busquedaNumero, setBusquedaNumero] = useState("");
  const [busquedaPalabra, setBusquedaPalabra] = useState("");
  const [busquedaAutor, setBusquedaAutor] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroAprobado, setFiltroAprobado] = useState(false);
  const [filtroRechazado, setFiltroRechazado] = useState(false);
  const [resultados, setResultados] = useState<Proyecto[]>([]);
  const [ver, setVer] = useState(false);
  const [haRealizadoBusqueda, setHaRealizadoBusqueda] = useState(false);
  const [datosCargados, setDatosCargados] = useState(false);
  const [busquedaNumeroNorma, setBusquedaNumeroNorma] = useState("");

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Estado para los mapas de links de Drive por tipo de norma
  type NormasDriveMap = { [numero: string]: string };
  type NormasDriveByTipo = {
    [tipo: string]: NormasDriveMap;
    ordenanza: NormasDriveMap;
    resolucion: NormasDriveMap;
    declaracion: NormasDriveMap;
    comunicacion: NormasDriveMap;
    proyectosNoSancionados: NormasDriveMap;
  };
  const [normasDrive, setNormasDrive] = useState<NormasDriveByTipo>({
    ordenanza: {},
    resolucion: {},
    declaracion: {},
    comunicacion: {},
    proyectosNoSancionados: {},
  });
  const [csvsCargados, setCsvsCargados] = useState(false);

  // URLs de los CSVs por tipo
  const csvUrls = {
    ordenanza:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRG6dLsp3OS5Yh7KafIfj989OB-kQXxXJdlZ_loCJ1aKk8cBdXddrwCMpnHdtIqtnQidWIjyPsoLynv/pub?output=csv",
    resolucion:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYYsJNNXkfrt90nDsIaR3ceaDZqBo6Vwd0fxecHNC4zfgUrwLFl8E9_a-i5HCQ7el0CxlKYugzXAkM/pub?output=csv",
    declaracion:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOPvyh0NxFC-EyV28tFWZlX3f_OFPrY2w4JFVnqF3CDyPJ4pNbORFaq5yI1uNw4aeoP27jXWp82GTU/pub?output=csv",
    comunicacion:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQehN_KoR_FWj8pHcksQjGXLoi_kZeOxQWldM9a-vIGafQiirhDNH8nhdn5qGjEaGrDxSIfcAWVDprP/pub?output=csv",
    // proyectosNoSancionados: 'URL_DEL_CSV_SI_APLICA'
  };

  // Cargar los CSVs al expandir el buscador (ver)
  useEffect(() => {
    if (ver && !csvsCargados) {
      const tipos = Object.keys(csvUrls);
      Promise.all(
        tipos.map((tipo) =>
          fetch(csvUrls[tipo as keyof typeof csvUrls])
            .then((res) => res.text())
            .then((csv) => {
              const parsed = Papa.parse(csv, {
                header: true,
              }) as Papa.ParseResult<{ [key: string]: string }>;
              // Construir el mapa: { Numero: Link }
              const map: NormasDriveMap = {};
              parsed.data.forEach((row) => {
                if (row && row["Numero"] && row["Link"]) {
                  map[row["Numero"]] = row["Link"];
                }
              });
              return { tipo, map };
            })
        )
      )
        .then((results) => {
          const newNormasDrive: NormasDriveByTipo = { ...normasDrive };
          results.forEach(({ tipo, map }) => {
            newNormasDrive[tipo] = map;
          });
          setNormasDrive(newNormasDrive);
          setCsvsCargados(true);
        })
        .catch((err) => {
          console.error("Error cargando CSVs de normas:", err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ver, csvsCargados]);

  useEffect(() => {
    if (ver && !datosCargados) {
      fetchProyectos();
    }
  }, [ver, datosCargados]);

  const fetchProyectos = async () => {
    try {
      const response = await fetch("/api/verProyectos");
      const data = await response.json();
      setProyectos(data.proyectos);
      setResultados(data.proyectos);
      setDatosCargados(true);
      Aos.init({ duration: 300 });
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  };
  // Función para manejar los cambios de página
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleBusquedaNumeroChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusquedaNumero(event.target.value);
    filtrarProyectos(
      event.target.value,
      busquedaPalabra,
      busquedaAutor,
      busquedaNumeroNorma,
      filtroTipo,
      filtroAprobado,
      filtroRechazado
    );
    setHaRealizadoBusqueda(true);
  };

  const handleBusquedaNumeroNormaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusquedaNumeroNorma(event.target.value);
    filtrarProyectos(
      busquedaNumero,
      busquedaPalabra,
      busquedaAutor,
      event.target.value,
      filtroTipo,
      filtroAprobado,
      filtroRechazado
    );
    setHaRealizadoBusqueda(true);
  };

  const handleBusquedaPalabraChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusquedaPalabra(event.target.value);
    filtrarProyectos(
      busquedaNumero,
      event.target.value,
      busquedaAutor,
      busquedaNumeroNorma,
      filtroTipo,
      filtroAprobado,
      filtroRechazado
    );
    setHaRealizadoBusqueda(true);
  };

  const handleBusquedaAutorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusquedaAutor(event.target.value);
    filtrarProyectos(
      busquedaNumero,
      busquedaPalabra,
      event.target.value,
      busquedaNumeroNorma,
      filtroTipo,
      filtroAprobado,
      filtroRechazado
    );
    setHaRealizadoBusqueda(true);
  };

  const handleFiltroTipoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setFiltroTipo(value);
    filtrarProyectos(
      busquedaNumero,
      busquedaPalabra,
      busquedaAutor,
      busquedaNumeroNorma,
      value,
      filtroAprobado,
      filtroRechazado
    );
    setHaRealizadoBusqueda(true);
  };

  const handleFiltroAprobadoChange = (checked: boolean) => {
    setFiltroAprobado(checked);
    filtrarProyectos(
      busquedaNumero,
      busquedaPalabra,
      busquedaAutor,
      busquedaNumeroNorma,
      filtroTipo,
      checked,
      filtroRechazado
    );
    setHaRealizadoBusqueda(true);
  };

  const handleFiltroRechazadoChange = (checked: boolean) => {
    setFiltroRechazado(checked);
    filtrarProyectos(
      busquedaNumero,
      busquedaPalabra,
      busquedaAutor,
      busquedaNumeroNorma,
      filtroTipo,
      filtroAprobado,
      checked
    );
    setHaRealizadoBusqueda(true);
  };

  const filtrarProyectos = (
    numero: string,
    palabra: string,
    autor: string,
    numeroNorma: string,
    tipo: string,
    aprobado: boolean,
    rechazado: boolean
  ) => {
    let filteredProyectos = proyectos.filter((proyecto) => {
      const titulo = proyecto.titulo_proyecto.toLowerCase();
      const numeroStr = proyecto.numero_proyecto.toString().replace(/^0+/, ""); // Eliminar ceros a la izquierda
      const tipoLower = proyecto.tipo_proyecto.toLowerCase();
      const autorStr = proyecto.autor.join(" ").toLowerCase();
      const numeroNormaStr = proyecto.numero_norma?.toLowerCase() || ""; // Nuevo filtro

      const numeroExacto =
        numero !== "" && numeroStr === numero.replace(/^0+/, ""); // Eliminar ceros a la izquierda de la búsqueda
      const palabraMatch =
        palabra !== "" &&
        titulo
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            palabra
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          );
      const autorMatch = autor !== "" && autorStr.includes(autor.toLowerCase());
      const numeroNormaMatch =
        numeroNorma !== "" &&
        numeroNormaStr.includes(numeroNorma.toLowerCase()); // Coincidencia exacta con número de norma
      const tipoMatch = tipo !== "" && tipoLower === tipo.toLowerCase();

      let aprobadoMatch = true;
      if (aprobado) {
        aprobadoMatch = proyecto.aprobado === true;
      } else if (rechazado) {
        aprobadoMatch = proyecto.aprobado === false;
      }

      return (
        (!numero || numeroExacto) &&
        (!palabra || palabraMatch) &&
        (!autor || autorMatch) &&
        (!numeroNorma || numeroNormaMatch) &&
        (!tipo || tipoMatch) &&
        aprobadoMatch
      );
    });

    filteredProyectos = filteredProyectos.sort((a, b) => {
      const yearA = parseInt(a.anio_proyecto, 10);
      const yearB = parseInt(b.anio_proyecto, 10);
      return yearB - yearA;
    });

    setResultados(filteredProyectos);
    setCurrentPage(1);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({
      top: 2000,
      behavior: "smooth",
    });
  };

  const downloadFile = async (filePath: string) => {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        window.open(filePath, "_blank");
      } else if (response.status === 404) {
        alert("El archivo no se encuentra disponible");
      } else {
        alert("Error al descargar el archivo.");
      }
    } catch (error) {
      console.error("Error en la descarga:", error);
      alert("Error al descargar el archivo.");
    }
  };

  const columns = [
    {
      title: "Proyecto",
      dataIndex: "numero_proyecto",
      key: "numero_proyecto",
      className: styles.numero,
    },
    {
      title: "Año",
      dataIndex: "anio_proyecto",
      key: "anio_proyecto",
      className: styles.año,
    },
    {
      title: "Descripción",
      dataIndex: "titulo_proyecto",
      key: "titulo_proyecto",
      className: styles.descripcion,
    },
    {
      title: "Autores",
      dataIndex: "autor",
      key: "autor",
      render: (autores: string[]) => (
        <>
          {autores.map((autor, index) => (
            <span key={index}>
              {autor}
              {index < autores.length - 1 && ", "}
            </span>
          ))}
        </>
      ),
      className: styles.autores,
    },
    {
      title: "Norma",
      dataIndex: "numero_norma",
      key: "numero_norma",
      render: (numeroNorma: string, record: Proyecto) => {
        if (!numeroNorma) return "";
        // Normalizar tipo para el mapa y la ruta local (sin tildes, minúsculas)
        const quitarTildes = (str: string) =>
          str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let tipoNorma = quitarTildes(record.tipo_norma || "").toLowerCase();
        // Mapear a las claves correctas del objeto normasDrive
        let tipoMapa: keyof typeof normasDrive = "ordenanza";
        if (tipoNorma.includes("comunicacion")) tipoMapa = "comunicacion";
        else if (tipoNorma.includes("resolucion")) tipoMapa = "resolucion";
        else if (tipoNorma.includes("declaracion")) tipoMapa = "declaracion";
        else if (tipoNorma.includes("ordenanza")) tipoMapa = "ordenanza";

        const mapa = normasDrive[tipoMapa] || {};

        // Para la ruta local, plural
        let tipoRuta = tipoMapa;
        if (tipoMapa === "comunicacion") tipoRuta = "comunicaciones";
        else if (tipoMapa === "resolucion") tipoRuta = "resoluciones";
        else if (tipoMapa === "declaracion") tipoRuta = "declaraciones";
        else if (tipoMapa === "ordenanza") tipoRuta = "ordenanzas";

        // Calcular año de la norma
        const partesNorma = numeroNorma.split("-");
        let añoNorma = null;
        if (partesNorma.length > 1) {
          const digitos = partesNorma[1];
          añoNorma = `20${digitos}`;
        }
        const filePath = `normas/${tipoRuta}/${añoNorma}/${numeroNorma}.doc`;
        // ...existing code...

        // --- Búsqueda tipo ExpedientesOrdenanzas para ordenanzas ---
        // (la variable 'mapa' ya está declarada arriba, no volver a declararla)
        let driveUrl: string | undefined = undefined;
        if (tipoMapa === "ordenanza") {
          // Extraer correlativo y año de numeroNorma (ej: O-04-1358)
          const match = numeroNorma.match(/O-(\d{2})-(\d{3,4})/i);
          if (match) {
            const anio = `20${match[1]}`;
            const correlativo = match[2];
            // Buscar clave que contenga ambos
            const clave = Object.keys(mapa).find(k => k.includes(correlativo) && k.includes(anio));
            if (clave) {
              driveUrl = mapa[clave];
            }
          }
        } else if (tipoMapa === "resolucion") {
          // Para resoluciones, buscar solo por correlativo puro
          const match = numeroNorma.match(/R-\d{2}-(\d{3,4})/i);
          if (match) {
            const correlativo = match[1];
            if (mapa[correlativo]) {
              driveUrl = mapa[correlativo];
            }
          }
        } else {
          // Para otros tipos, mantener lógica robusta
          const normalizarClave = (clave: string) => {
            if (!clave) return "";
            let c = clave.toUpperCase();
            c = c.replace(/^(O-|ORD-|ORDENANZA-|N-|D-|R-|DEC-|COM-|C-)/, "");
            c = c.replace(/[^0-9]/g, "");
            c = c.replace(/^0+/, "");
            return c;
          };
          const mapaNormalizado: { [k: string]: string } = {};
          Object.keys(mapa).forEach((k) => {
            mapaNormalizado[normalizarClave(k)] = mapa[k];
          });
          const claveBuscada = normalizarClave(numeroNorma);
          if (mapaNormalizado[claveBuscada]) {
            driveUrl = mapaNormalizado[claveBuscada];
          } else {
            const match = claveBuscada.match(/(\d{3,4})$/);
            if (match && mapaNormalizado[match[1]]) {
              driveUrl = mapaNormalizado[match[1]];
            }
          }
        }

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
            }}
          >
            <span
              style={{ fontWeight: 600, fontSize: "20px", justifyContent: "center" }}
            >
              {numeroNorma}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                disabled={!driveUrl}
                style={{
                  backgroundColor: driveUrl ? "#07db91" : "#cfeec7",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  padding: "2px 10px",
                  cursor: driveUrl ? "pointer" : "not-allowed",
                  fontWeight: 500,
                }}
                onClick={() => {
                  if (driveUrl) window.open(driveUrl, "_blank");
                }}
              >
                Expediente
              </button>
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  padding: "2px 10px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={() => downloadFile(filePath)}
              >
                Editable
              </button>
            </div>
            {!driveUrl && (
              <span style={{ color: "#888", fontSize: "0.9em", marginTop: 2 }}>
                Expediente no disponible
              </span>
            )}
          </div>
        );
      },
      className: styles.norma,
    },
    {
      title: "Observaciones",
      dataIndex: "observaciones",
      key: "observaciones",
      render: (observaciones: string) => {
        // Verifica si el campo es una URL de Google Drive
        const isGoogleDriveLink = (url: string) => {
          return /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view/.test(
            url
          );
        };

        if (isGoogleDriveLink(observaciones)) {
          return (
            <a
              style={{
                backgroundColor: "yellow",
                color: "black",
                padding: "2%",
              }}
              href={observaciones}
              target="_blank"
              rel="noopener noreferrer"
            >
              PCM Ver Expediente
            </a>
          );
        }

        // Maneja otros casos, como "sin sanción" o valores normales
        if (observaciones === "sin sanción") {
          return (
            <button onClick={handleClick}>
              Buscar entre los expedientes no sancionados
            </button>
          );
        }

        return observaciones;
      },
      className: styles.observaciones,
    },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const datosPaginaActual = resultados.slice(startIndex, endIndex);

  return (
    <ProtectedRoute>
      <div onClick={() => setVer(!ver)}>
        <h2 className={styles.hdos}>
          {ver ? (
            <MdExpandLess style={{ fontSize: "x-large" }} />
          ) : (
            <MdExpandMore style={{ fontSize: "x-large" }} />
          )}
          Buscador general de expedientes | 2004-2024
          {ver ? (
            <MdExpandLess style={{ fontSize: "x-large" }} />
          ) : (
            <MdExpandMore style={{ fontSize: "x-large" }} />
          )}
        </h2>
      </div>

      {ver && (
        <div style={{ margin: "auto", width: "100%", marginBottom: "5%" }}>
          <p className={styles.spinText}>
            {" "}
            Busque entre los expedientes sancionados y no sancionados{" "}
          </p>
          <div className={styles.inputs}>
            <Input.Search
              placeholder="Por n° de proyecto..."
              value={busquedaNumero}
              onChange={handleBusquedaNumeroChange}
              style={{ width: 200, marginRight: "16px", marginBottom: "8px" }}
            />
            <Input.Search
              placeholder="Por palabra..."
              value={busquedaPalabra}
              onChange={handleBusquedaPalabraChange}
              style={{ width: 200, marginRight: "16px", marginBottom: "8px" }}
            />
            <Input.Search
              placeholder="Por autor..."
              value={busquedaAutor}
              onChange={handleBusquedaAutorChange}
              style={{ width: 200, marginRight: "16px", marginBottom: "8px" }}
            />
            <Input.Search
              placeholder="Por n° de norma..."
              value={busquedaNumeroNorma}
              onChange={handleBusquedaNumeroNormaChange}
              style={{
                width: 200,
                marginRight: "16px",
                border: "solid rgb(255, 87, 51) 2px",
                marginBottom: "8px",
              }}
            />
            <select
              value={filtroTipo}
              onChange={handleFiltroTipoChange}
              style={{ width: 200, marginRight: "16px", marginBottom: "8px" }}
            >
              <option value="">Todos los tipos</option>
              <option value="comunicacion">Comunicación</option>
              <option value="resolución">Resolución</option>
              <option value="declaración">Declaración</option>
              <option value="ordenanza">Ordenanza</option>
            </select>
          </div>
          {haRealizadoBusqueda ? (
            <div className={styles.table}>
              <Table
                dataSource={datosPaginaActual}
                columns={columns}
                pagination={false}
                rowKey="id"
              />
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={resultados.length}
                onChange={handlePageChange}
                style={{ marginTop: 16 }}
              />
            </div>
          ) : (
            <div className={styles.spinContainer}>
              <BsDatabaseFillCheck />| Conectado a la Base de Datos.
            </div>
          )}
        </div>
      )}
    </ProtectedRoute>
  );
}

export default Proyectos;
