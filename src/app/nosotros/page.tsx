"use client"
import React from "react";
import { Card, Typography } from "antd";
import styles from "./nosotros.module.css";
import NavTop from "../components/NavTop";
import NavFoot from "../components/NavFoot";

export default function NosotrosPage() {
  return (
    <main className={styles.main}>
        <NavTop />
      <section className={styles.hero}>
        <Typography.Title level={1} className={styles.title}>
          Sobre Nosotros
        </Typography.Title>
        <Typography.Paragraph className={styles.subtitle}>
          Biblioteca y Archivo Graciela Di Biase
        </Typography.Paragraph>
      </section>
      <section className={styles.section}>
        <Card className={styles.card}>
          <Typography.Title level={2}>¿Qué es DiBiaseNet?</Typography.Title>
          <Typography.Paragraph>
            DiBiaseNet es una plataforma digital que moderniza el acceso, consulta y gestión de la documentación legislativa y bibliográfica del Concejo Municipal de San Carlos de Bariloche. Permite a los usuarios consultar expedientes, libros y material de archivo de forma rápida, segura y eficiente.
          </Typography.Paragraph>
          <Typography.Title level={3}>Historia y creación de la Biblioteca Legislativa</Typography.Title>
          <Typography.Paragraph>
            La Biblioteca Legislativa fue creada por la <strong>Resolución Nº 34-CM-92</strong> en 1992, como respuesta a la necesidad de organizar y preservar la creciente cantidad de libros, documentos y legislación propia y de otros cuerpos en el Concejo Municipal. Esta resolución integró la Video-filmoteca y la Hemeroteca Pública Municipal, y sentó las bases para un sistema moderno de documentación legislativa y bibliográfica.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Antecedentes:</strong> El Concejo Municipal ya contaba con la Video-filmoteca (Resolución Nº 015-CM-88) y la Hemeroteca Pública Municipal (Resolución Nº 023-CM-89), lo que evidenciaba la necesidad de una Biblioteca Legislativa capaz de incorporar libros, mapas, periódicos, grabaciones de audio y video, discos magnéticos y cualquier documentación relevante para la actividad legislativa.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Fundamentos:</strong> La Biblioteca Legislativa es un aporte fundamental para el análisis de los problemas de la ciudad y la región, y está diseñada para conectarse a la Red Nacional de Documentación e Información Municipal, dotando al Concejo de un sistema informático legislativo y bibliográfico moderno.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Autores:</strong> Carlos Soliverez (Presidente), Roberto Mariani, Osvaldo Marsella y Hugo Castañon (Concejales).
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Artículos principales de la Resolución Nº 34-CM-92:</strong>
          </Typography.Paragraph>
          <ul className={styles.list}>
            <li className={styles.listItem}><strong>Art. 1º:</strong> Se crea la Biblioteca Legislativa, incluyendo la Video-filmoteca y la Hemeroteca Pública Municipal.</li>
            <li className={styles.listItem}><strong>Art. 2º:</strong> La Biblioteca incorporará libros, mapas, periódicos, grabaciones, discos magnéticos y cualquier documentación relevante para la actividad legislativa y la planificación municipal.</li>
            <li className={styles.listItem}><strong>Art. 3º:</strong> La Biblioteca tendrá categoría de Departamento dentro del área Legislativa.</li>
            <li className={styles.listItem}><strong>Art. 4º:</strong> Se asigna un responsable con categoría 21 y se modifica el organigrama.</li>
            <li className={styles.listItem}><strong>Art. 5º:</strong> Toda documentación ingresada o generada por el Concejo será catalogada e inventariada por la Biblioteca Legislativa.</li>
            <li className={styles.listItem}><strong>Art. 6º:</strong> La Secretaría elaborará el proyecto de funcionamiento de la Biblioteca, a considerar en seis meses.</li>
            <li className={styles.listItem}><strong>Art. 7º:</strong> Comuníquese, archívese.</li>
          </ul>
        </Card>
      </section>
      <section className={styles.section}>
        <Card className={styles.card}>
          <Typography.Title level={3}>Funcionalidades para usuarios</Typography.Title>
          <ul className={styles.list}>
            <li className={styles.listItem}>Consulta y búsqueda avanzada de expedientes, editables y libros.</li>
            <li className={styles.listItem}>Acceso a documentos originales escaneados y versiones firmadas.</li>
            <li className={styles.listItem}>Índices por número, tipo, autor, año y palabras clave.</li>
            <li className={styles.listItem}>ChatBot asistente virtual en desarrollo para consultas legislativas.</li>
            <li className={styles.listItem}>Gestión de permisos y auditoría de accesos.</li>
            <li className={styles.listItem}>Analíticas y reportes de uso.</li>
            <li className={styles.listItem}>Interfaz moderna, accesible y responsiva.</li>
          </ul>
        </Card>
      </section>
      <section className={styles.section}>
        <Card className={styles.card}>
          <Typography.Title level={3}>Nuestro compromiso</Typography.Title>
          <Typography.Paragraph>
            DiBiaseNet promueve la modernización, la transparencia y la accesibilidad, garantizando la preservación documental y el acceso universal a la información legislativa y bibliográfica.
          </Typography.Paragraph>
        </Card>
      </section>
      <NavFoot/>
    </main>
  );
}
