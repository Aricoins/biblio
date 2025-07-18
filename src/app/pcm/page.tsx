"use client";
import React, { useState, useEffect } from 'react';
import { Table, Input, Pagination, Modal } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import dataSource from '../api/upload/datos_pcm_2.json';
import PCM from '../components/PCM';
import ProtectedRoute from '../components/ProtectedRoute';

const { Search } = Input;

interface PCMRecord {
    numero_pcm: string;
    descripcion: string;
    autor: string;
    numero_norma: string;
    enlace?: string;
}

function PCMTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filteredData, setFilteredData] = useState<PCMRecord[]>(dataSource);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<PCMRecord | null>(null);

    const searchParams = useSearchParams();
    const searchFromParams = searchParams.get('search') || '';

    useEffect(() => {
        AOS.init({ duration: 200 });
        handleSearch(searchFromParams);
    }, [searchFromParams]);

    const handleSearch = (value: string) => {
        const filtered = dataSource.filter(item =>
            item.numero_pcm.toLowerCase().includes(value.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(value.toLowerCase())
        );
        // Ordenar por año, de la más nueva a la más antigua
        const sorted = filtered.sort((a, b) => {
            const yearA = parseInt(a.numero_norma.split('-').pop() || '0', 10);
            const yearB = parseInt(b.numero_norma.split('-').pop() || '0', 10);
            return yearB - yearA;
        });
        setFilteredData(sorted);
        setSearchText(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const showModal = (record: PCMRecord) => {
        setModalContent(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setModalContent(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalContent(null);
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
            render: (text: string, record: PCMRecord) => {
                return record.enlace ? (
                    <a href={record.enlace} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', color: '#1890ff' }}>
                        {text}
                    </a>
                ) : (
                    text
                );
            },
        },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <ProtectedRoute>
            <div> 
            <h2 className={styles.hdos} data-aos="fade-up">Normas por PCM</h2>
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

            <Modal 
                title={`Documento de Norma: ${modalContent?.numero_norma}`} 
                open={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                width={800}
            >
                {modalContent?.enlace ? (
                    <iframe 
                        src={modalContent.enlace} 
                        title={modalContent.numero_norma} 
                        width="100%" 
                        height="500px" 
                        style={{ border: 'none' }}
                    />
                ) : (
                    <p>No hay documento disponible.</p>
                )}
            </Modal>
            <PCM/>
            </div>
        </ProtectedRoute>
    );
}

export default PCMTable;
