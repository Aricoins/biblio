"use client";
import { FC, useEffect, useState } from "react";
import Libro from "../components/Libro";
import axios from "axios";
import styles from "./style.module.css";
import OtrosTitulos from "../components/OtrosTitulos";
import Aos from "aos";
import "aos/dist/aos.css";
import diacritics from 'diacritics';
import { Pagination } from "antd";
import Exco from "../components/Exco";
import Exco2 from "../components/Exco2";
import ONGs from "../components/ONGs";


interface Libro {
  titulo: string;
  autor: string;
  decla: string;
  imagen: string;
  resenia: string;
  id: string;
}

const Libros: FC = ({}) => {
  const [data, setData] = useState<Libro[] | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [paginatedData, setPaginatedData] = useState<Libro[] | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [showExco, setShowExco] = useState(false);

  const handleShowExco = () => {
    setShowExco(!showExco);
  };

  useEffect(() => {
    Aos.init({ duration: 3000 });
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/verLibros");
        
        // Eliminar acentos de los datos
        const librosConAcento: Libro[] = response.data.libros.map((libro: Libro) => ({
          ...libro,
          titulo: diacritics.remove(libro.titulo.toLowerCase())
        }));
        setData(librosConAcento);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data, "libros front");
    if (data && Array.isArray(data)) {
      // Filtra los libros basándose en la búsqueda
      const filteredData = data.filter((libro) =>
        libro.titulo.toLowerCase().includes(search.toLowerCase())
      );

      // Actualiza el total de elementos filtrados
      setTotalItems(filteredData.length);

      // Pagina los datos filtrados
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      const paginated = filteredData.slice(start, end);

      setPaginatedData(paginated);
    }
  }, [search, data, currentPage, pageSize]);

  const handlePageChange = (page: number, size: number) => {
    
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <>
      <div className={styles.body}>
        <div
          data-aos="fade-right"
          data-aos-duration="300"
          style={{
            display: "flex",
            justifyContent: "right",
            marginTop: "10%",
            fontFamily: "Sans-Serif",
            color: "black",
            fontSize: "4vw",
            opacity: 0.2,
          }}
        >
          Biblioteca
        </div>
        <div style={{ marginBottom: "2%" }}>
          {/* Botón para mostrar u ocultar Exco */}
          <button
            onClick={handleShowExco}
            data-aos="fade-right"
            data-aos-duration="300"
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "10%",
              fontFamily: "Sans-Serif",
              color: "black",
              fontSize: "2vw",
              opacity: 0.6,
            }}
          >
            {showExco ? "Registros ⬆️" : " Registros ⬇️"}
          </button>

          {/* Mostrar el componente Exco solo si showExco es true */}
          {showExco && (
            <>
              <Exco2 />
              <Exco />
              <ONGs />
            </>
          )}
        </div>

        <section className={styles.container}>
          <input
            className={styles.inputSearch}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder=" 🔍 Buscar un libro declarado de interés... "
          />

          <div className={styles.gridContainer}>
            {paginatedData?.map((libro: Libro, index) => (
              <Libro data-aos="fade-up" key={index} libro={libro} />
            ))}
          </div>

          {totalItems > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          )}

          <OtrosTitulos data-aos="fade-right" data-aos-duraton="500" />
        </section>
      </div>
    </>
  );
};

export default Libros;
