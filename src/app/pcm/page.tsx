"use client";
import React, { useState, useEffect } from 'react';
import { Table, Input, Pagination } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import dataSource from '../api/upload/datos_pcm2.json';

const { Search } = Input;

function PCMTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filteredData, setFilteredData] = useState(dataSource);
    const [searchText, setSearchText] = useState('');
    
    const searchParams = useSearchParams();
    const searchFromParams = searchParams.get('search') || '';

    useEffect(() => {
        AOS.init({ duration: 1000 });
        handleSearch(searchFromParams);
    }, [searchFromParams]);

    const handleSearch = (value: string) => {
        const filtered = dataSource.filter(item =>
            item.numero_pcm.toLowerCase().includes(value.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
        setSearchText(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const columns = [
        {
            title: 'Número PCM',
            dataIndex: 'numero_pcm',
            key: 'numero_pcm',
            className: styles.numero,
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
            className: styles.descripcion,
        },
        {
            title: 'Autor',
            dataIndex: 'autor',
            key: 'autor',
            className: styles.autores,
        },
        {
            title: 'Número de Norma',
            dataIndex: 'numero_norma',
            key: 'numero_norma',
            className: styles.norma,
        },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (

        <div> <h2 className={styles.hdos} >
       Normas por PCM 
    </h2>
    <h3 
    data-aos="fade-left" 
    style={{ 
        fontSize: "small",
        fontWeight: "400",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        marginBottom: "3%",
        padding: "1%",
        cursor: "pointer",
        backgroundColor: "rgb(236, 233, 232)",
        color: "black",
        fontFamily: "Times New Roman",
        borderRadius: "5px",
        border: ".5px solid black",
        transition: "1s",
      
    }}
>
    Buscador de expedientes de normas originadas en Resoluciones de la Presidencia
<p></p>
</h3>


        <div className={styles.container} data-aos="fade-up">
            <div className={styles.search}>
                <Search
                    placeholder="Buscar PCM o Descripción"
                    onSearch={handleSearch}
                    style={{ 
                        width: 300, 
                        marginBottom: 16, 
                        border: "2px solid #ff6f00", // Color naranja más suave
                        borderRadius: 5, // Bordes redondeados
                        padding: "0 12px", // Espaciado interno horizontal
                        fontSize: "16px", // Tamaño de fuente más grande
                        fontFamily: "'Roboto', sans-serif", // Familia tipográfica consistente
                        transition: "border-color 0.3s", // Transición suave para el borde
                    }}
                    value={searchText}
                     onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <Table
                dataSource={paginatedData}
                columns={columns}
                pagination={false}
                rowKey="id"
                className={styles.table}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={handlePageChange}
                className={styles.pagination}
            />
        </div>
        </div>
    );
}

export default PCMTable;
