"use client"; // Indica que este es un componente del lado del cliente en Next.js.
import { useState } from "react"; // Importa useState para manejar el estado.
import { Modal, Button, List } from "antd"; // Importa componentes de Ant Design.
import Link from "next/link"; // Importa Link para navegación entre páginas.
import NavTop from "../components/NavTop"; // Importa el componente NavTop.
import NavFoot from "../components/NavFoot"; // Importa el componente NavFoot.
import DataPage from "./component/com"; // Importa DataPage.
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import styles from "../../app/proyectos/styles.module.css"; // Importa los estilos.
interface Acta {
  // Define la interfaz para los datos de las actas.
  title: string;
  link: string;
  id: string;
}
const actas: Acta[] = [
  {
    title: "Acta 1 del 6 de octubre de 2006",
    link: "https://docs.google.com/document/d/1901XfilC88j6Pfm7dAsBoWYlR2XgKXc4/preview",
    id: "1901XfilC88j6Pfm7dAsBoWYlR2XgKXc4",
  },
  {
    title: "Acta 2 del 18 de octubre de 2006",
    link: "https://docs.google.com/document/d/195Wh-202W4ipPHuMJkE7NMHDw6wQbbJE/preview",
    id: "195Wh-202W4ipPHuMJkE7NMHDw6wQbbJE",
  },
  {
    title: "Acta 3 del 26 de octubre de 2006",
    link: "https://docs.google.com/document/d/18iHhCraDIVUF6kKq93MulPVC2kApiMhS/preview",
    id: "18iHhCraDIVUF6kKq93MulPVC2kApiMhS",
  },
  {
    title: "Acta 4 del 27 de octubre de 2006",
    link: "https://docs.google.com/document/d/1SXPRLudRu5RoBO_-HHpAcRGjpVZJM2bW/preview",
    id: "1SXPRLudRu5RoBO_-HHpAcRGjpVZJM2bW",
  },
  {
    title: "Acta 5 del 30 de octubre de 2006",
    link: "https://docs.google.com/document/d/1FJaG7Tpe2Jimr4K8SYjKgmJDvom5c2uF/preview",
    id: "1FJaG7Tpe2Jimr4K8SYjKgmJDvom5c2uF",
  },
  {
    title: "Acta 6 del 13 de noviembre de 2006",
    link: "https://drive.google.com/file/d/10RWxrfLXXcM62yoINZtujQYR2RMFnWhR/preview",
    id: "10RWxrfLXXcM62yoINZtujQYR2RMFnWhR",
  },
  {
    title: "Acta 7 del 28 de noviembre de 2006",
    link: "https://drive.google.com/file/d/123psMbiSzvDSvt_9KaLf4lJtgDLt05tb/preview",
    id: "123psMbiSzvDSvt_9KaLf4lJtgDLt05tb",
  },
  {
    title: "Acta 8 del 30 de octubre de 2006",
    link: "https://drive.google.com/file/d/1q66fwy1okgJi8FXH-TSuEP-eYYPsbOjg/preview",
    id: "1q66fwy1okgJi8FXH-TSuEP-eYYPsbOjg",
  },
  {
    title: "Acta 9 del 8 de diciembre de 2006",
    link: "https://drive.google.com/file/d/1fQ17iPVBkTdLGLGWnb33gxS4Pv1_M3TF/preview",
    id: "1fQ17iPVBkTdLGLGWnb33gxS4Pv1_M3TF",
  },
  {
    title: "Acta 10 del 19 de diciembre de 2006",
    link: "https://drive.google.com/file/d/1TTZyQGx_SDH2_RVsrvegy6VpzCRVxyZJ/preview",
    id: "1TTZyQGx_SDH2_RVsrvegy6VpzCRVxyZJ",
  },
  {
    title: "Acta 11 del 20 de diciembre de 2006",
    link: "https://docs.google.com/document/d/1q4VyCeeqV1YbFJvBxSyF6FpmCzArYubk/preview",
    id: "1q4VyCeeqV1YbFJvBxSyF6FpmCzArYubk",
  },
  {
    title: "Acta 12 del 22 de diciembre de 2006",
    link: "https://docs.google.com/document/d/1RB-lrUVYBZNwCPeV63TJhiwoHFiALobx/preview",
    id: "1RB-lrUVYBZNwCPeV63TJhiwoHFiALobx",
  },
  {
    title: "Acta 13 del 26 de diciembre de 2006",
    link: "https://docs.google.com/document/d/1-oaZJXw6Y5FiDO32u1dJk06nW6-cY7H_/preview",
    id: "1-oaZJXw6Y5FiDO32u1dJk06nW6-cY7H_",
  },
  {
    title: "Acta 14 del 3 de enero de 2007",
    link: "https://docs.google.com/document/d/15jU9MbX5RTMAFUgAfT3FLTkpvb5toO9M/preview",
    id: "15jU9MbX5RTMAFUgAfT3FLTkpvb5toO9M",
  },
  {
    title: "Acta 15 del 3 de enero de 2007",
    link: "https://docs.google.com/document/d/1xm4TfCA_nqdan7luGsQh4SQNtyFuwenP/preview",
    id: "1xm4TfCA_nqdan7luGsQh4SQNtyFuwenP",
  },
  {
    title: "Acta 16 del 4 de enero de 2007",
    link: "https://docs.google.com/document/d/1A81TxmFrhF9om0lLBZkNBCN0lkia3Qxd/preview",
    id: "1A81TxmFrhF9om0lLBZkNBCN0lkia3Qxd",
  },
  {
    title: "Modelo Orden del plenario",
    link: "https://docs.google.com/document/d/1U_FYoinrwLlR-UlS7DTzG5CB6luDklKF/preview",
    id: "1U_FYoinrwLlR-UlS7DTzG5CB6luDklKF",
  },
];
const actas2: Acta[] = [
  {
    title: "Convención Constituyente 1986",
    link: "https://drive.google.com/file/d/1V-BIiVd6ccl2R5lxIVbhqprZlx4zav0h/preview",
    id: "1V-BIiVd6ccl2R5lxIVbhqprZlx4zav0h ",
  },
];

export default function Home() {
  // Componente principal.
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar el modal.
  const [selectedActa, setSelectedActa] = useState<Acta | null>(null); // Estado para la acta seleccionada.
  const [expandedSection, setExpandedSection] = useState<string | null>(null); // Estado para la sección expandida.

  const showModal = (acta: Acta) => {
    // Función para abrir el modal.
    setSelectedActa(acta);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // Función para cerrar el modal.
    setIsModalVisible(false);
    setSelectedActa(null);
  };

  const toggleSection = (section: string) => {
    // Función para alternar la sección.
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <NavTop />
      <div
        style={{
          padding: "20px",
          marginTop: "8%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3
          data-aos="fade-right"
          data-aos-duration="300"
          style={{
            display: "flex",
            justifyContent: "right",
            marginTop: "10%",
            color: "black",
            fontSize: "4vw",
            fontFamily: "Roboto, sans-serif ",
            opacity: 0.2,
            marginRight: "8%",
          }}
        >
          Carta Orgánica Municipal
        </h3>

        <Button
          type="link"
          style={{
            fontSize: "medium",
            fontWeight: 500,
            padding: "1%",
            backgroundColor: "#74cbc3",
            color: "rgb(255, 255, 255)",
            border: "rgb(255, 255, 255) 2px solid",
            fontFamily: "'Roboto', sans-serif",
            borderRadius: "25px",
            textAlign: "center",
            width: "100%",
            margin: "auto",
            marginBottom: "2%",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          }}
          className={styles.hdos}
          onClick={() => toggleSection("2007")}
        >
          {expandedSection ? <MdExpandLess /> : <MdExpandMore />}
          Actas de la Convención Constituyente | 2007{" "}
          {expandedSection ? <MdExpandLess /> : <MdExpandMore />}
        </Button>

        {expandedSection === "2007" && ( // Renderiza la lista si la sección está expandida.
          <List
            bordered
            dataSource={actas}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
            }}
            renderItem={(acta) => (
              <List.Item
                style={{ justifyContent: "center", color: '#74cbc3' }}
              >
                <Button type="link" onClick={() => showModal(acta)}>
                  {acta.title}
                </Button>
              </List.Item>
            )}
          />
        )}
        <DataPage />

        <Button
          type="link"
          style={{
            fontSize: "medium",
            fontWeight: 500,
            padding: "1%",
            backgroundColor: "#74cbc3",
            color: "rgb(255, 255, 255)",
            border: "rgb(255, 255, 255) 2px solid",
            fontFamily: "'Roboto', sans-serif",
            borderRadius: "25px",
            textAlign: "center",
            width: "100%",
            margin: "auto",
            marginBottom: "2%",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => toggleSection("1986")}
        >
          Actas de la Convención Constituyente | 1986
        </Button>

        {expandedSection === "1986" && ( // Ren
          <>
            <List
              bordered
              dataSource={actas2}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
              }}
              renderItem={(acta) => (
                <List.Item
                  style={{ justifyContent: "center", color: "#74cbc3" }}
                >
                  <Button type="link" onClick={() => showModal(acta)}>
                    {acta.title}
                  </Button>
                </List.Item>
              )}
            />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button
                type="link"
                style={{
                  color: "#74cbc3",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                href="https://drive.google.com/file/d/1iAd8OvXeIzYP-kJx1kBA2QUFXGvIijDz/view?usp=sharing"
                target="_blank"
              >
                Intervención Lic. Ernesto Reyes
              </Button>
            </div>
          </>
        )}

        <Modal
          title={selectedActa?.title}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
          style={{
            backgroundColor: "#74cbc3",
            color: "green",
            padding: "1%",
            width: "100%",
          }}
        >
          {selectedActa && (
            <iframe
              src={selectedActa.link}
              width="100%"
              height="600px"
              style={{ border: "none" }}
              allowFullScreen
            />
          )}
        </Modal>
      </div>
      <NavFoot />
    </>
  );
}
