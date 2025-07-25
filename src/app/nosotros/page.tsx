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
          <Typography.Title level={3}>Fundamentos y creación</Typography.Title>
          <Typography.Paragraph>
            La Biblioteca fue creada con el objetivo de preservar, digitalizar y facilitar el acceso público a la documentación legislativa y bibliográfica. Los fundamentos de la resolución destacan la importancia de la memoria institucional, la transparencia, la modernización administrativa y el acceso universal a la información pública.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Fundamentos principales:</strong>
          </Typography.Paragraph>
          <ul className={styles.list}>
            <li className={styles.listItem}>Preservar la memoria institucional y documental del Concejo Municipal.</li>
            <li className={styles.listItem}>Facilitar el acceso público y la consulta digital de expedientes y normas.</li>
            <li className={styles.listItem}>Modernizar la gestión administrativa y documental.</li>
            <li className={styles.listItem}>Promover la transparencia y el derecho ciudadano a la información.</li>
            <li className={styles.listItem}>Fomentar la investigación, el estudio y la participación ciudadana.</li>
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
