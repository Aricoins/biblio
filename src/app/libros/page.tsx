"use client";
import { FC, useEffect, useState } from "react";
import Libro from '../components/Libro';
import axios from 'axios';
import styles from './style.module.css';
import OtrosTitulos from "../components/OtrosTitulos";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Pagination } from 'antd';

interface Libro {
    titulo: string;
    autor: string;
    decla: string;
    imagen: string;
    resenia: string;
    id: string;
}

const Libros: FC = () => {
    const [data, setData] = useState<Libro[] | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [paginatedData, setPaginatedData] = useState<Libro[] | null>(null);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        Aos.init({ duration: 3000 });
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/verLibros');
                setData(response.data.libros);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            // Filtra los libros basándose en la búsqueda
            const filteredData = data.filter(libro =>
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
                <section className={styles.container}>
                    <input
                        className={styles.inputSearch}
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por título..."
                    />

                    <div className={styles.gridContainer}>
                        {paginatedData?.map((libro: Libro, index) => (
                            <Libro data-aos="fade-up" key={index} libro={libro} />
                        ))}
                    </div>

                    {/* Paginación */}
                    {totalItems > 0 && ( 
                      <div style={{justifyContent:"center"}}>
                      <Pagination
                      current={currentPage}
                      
                            total={totalItems}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                         /></div>
                    )}

                    <OtrosTitulos data-aos="fade-right" />
                </section>
            </div>
        </>
    );
}

export default Libros;
