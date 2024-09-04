"use client"
import { useState } from 'react';
import { Modal, Button, List } from 'antd';

interface Acta {
  title: string;
  link: string;
  id: string;
}

const actas: Acta[] = [
  {
    title: 'Acta 1',
    link: 'https://docs.google.com/document/d/1901XfilC88j6Pfm7dAsBoWYlR2XgKXc4/preview',
    id: '1901XfilC88j6Pfm7dAsBoWYlR2XgKXc4'
  },
  {
    title: 'Acta 2',
    link: 'https://docs.google.com/document/d/195Wh-202W4ipPHuMJkE7NMHDw6wQbbJE/preview',
    id: '195Wh-202W4ipPHuMJkE7NMHDw6wQbbJE'
  },
  {
    title: 'Acta 3',
    link: 'https://docs.google.com/document/d/18iHhCraDIVUF6kKq93MulPVC2kApiMhS/preview',
    id: '18iHhCraDIVUF6kKq93MulPVC2kApiMhS'
  },
  {
    title: 'Acta 4',
    link: 'https://docs.google.com/document/d/1SXPRLudRu5RoBO_-HHpAcRGjpVZJM2bW/preview',
    id: '1SXPRLudRu5RoBO_-HHpAcRGjpVZJM2bW'
  },
  {
    title: 'Acta 5',
    link: 'https://docs.google.com/document/d/1FJaG7Tpe2Jimr4K8SYjKgmJDvom5c2uF/preview',
    id: '1FJaG7Tpe2Jimr4K8SYjKgmJDvom5c2uF'
  },
  {
    title: 'Acta 6',
    link: 'https://drive.google.com/file/d/10RWxrfLXXcM62yoINZtujQYR2RMFnWhR/preview',
    id: '10RWxrfLXXcM62yoINZtujQYR2RMFnWhR'
  },
  {
    title: 'Acta 7',
    link: 'https://drive.google.com/file/d/123psMbiSzvDSvt_9KaLf4lJtgDLt05tb/preview',
    id: '123psMbiSzvDSvt_9KaLf4lJtgDLt05tb'
  },
  {
    title: 'Acta 8',
    link: 'https://drive.google.com/file/d/1q66fwy1okgJi8FXH-TSuEP-eYYPsbOjg/preview',
    id: '1q66fwy1okgJi8FXH-TSuEP-eYYPsbOjg'
  },
  {
    title: 'Acta 9',
    link: 'https://drive.google.com/file/d/1fQ17iPVBkTdLGLGWnb33gxS4Pv1_M3TF/preview',
    id: '1fQ17iPVBkTdLGLGWnb33gxS4Pv1_M3TF'
  },
  {
    title: 'Acta 10',
    link: 'https://drive.google.com/file/d/1TTZyQGx_SDH2_RVsrvegy6VpzCRVxyZJ/preview',
    id: '1TTZyQGx_SDH2_RVsrvegy6VpzCRVxyZJ'
  },
  {
    title: 'Acta 11',
    link: 'https://docs.google.com/document/d/1q4VyCeeqV1YbFJvBxSyF6FpmCzArYubk/preview',
    id: '1q4VyCeeqV1YbFJvBxSyF6FpmCzArYubk'
  },
  {
    title: 'Acta 12',
    link: 'https://docs.google.com/document/d/1RB-lrUVYBZNwCPeV63TJhiwoHFiALobx/preview',
    id: '1RB-lrUVYBZNwCPeV63TJhiwoHFiALobx'
  },
  {
    title: 'Acta 13',
    link: 'https://docs.google.com/document/d/1-oaZJXw6Y5FiDO32u1dJk06nW6-cY7H_/preview',
    id: '1-oaZJXw6Y5FiDO32u1dJk06nW6-cY7H_'
  },
  {
    title: 'Acta 14',
    link: 'https://docs.google.com/document/d/15jU9MbX5RTMAFUgAfT3FLTkpvb5toO9M/preview',
    id: '15jU9MbX5RTMAFUgAfT3FLTkpvb5toO9M'
  },
  {
    title: 'Acta 15',
    link: 'https://docs.google.com/document/d/1xm4TfCA_nqdan7luGsQh4SQNtyFuwenP/preview',
    id: '1xm4TfCA_nqdan7luGsQh4SQNtyFuwenP'
  },
  {
    title: 'Acta 16',
    link: 'https://docs.google.com/document/d/1A81TxmFrhF9om0lLBZkNBCN0lkia3Qxd/preview',
    id: '1A81TxmFrhF9om0lLBZkNBCN0lkia3Qxd'
  },
  {
    title: 'Modelo Orden del plenario',
    link: 'https://docs.google.com/document/d/1U_FYoinrwLlR-UlS7DTzG5CB6luDklKF/preview',
    id: '1U_FYoinrwLlR-UlS7DTzG5CB6luDklKF'
  }
];

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedActa, setSelectedActa] = useState<Acta | null>(null);

  const showModal = (acta: Acta) => {
    setSelectedActa(acta);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedActa(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{
        fontSize: "medium",
        fontWeight: 500,
        padding: "1%",
        backgroundColor: "orangered",
        color: "rgb(255, 255, 255)",
        transition: "0.3s",
        border: "rgb(255, 255, 255) 2px solid",
        fontFamily: "'Roboto', sans-serif",
        borderRadius: "25px",
        textAlign: "center",
        width: "70%",
        margin: "0 auto",
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      }}>Actas de la Convención Constituyente | 2007</h3>
      <List
        bordered
        dataSource={actas}
        style={{backgroundColor: "black"}}
        renderItem={(acta) => (
          <List.Item>
            <Button type="link" onClick={() => showModal(acta)}>
              {acta.title}
            </Button>
          </List.Item>
        )}
      />

      <Modal
        title={selectedActa?.title}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedActa && (
          <iframe
            src={selectedActa.link}
            width="100%"
            height="600px"
            style={{ border: 'none' }}
            allowFullScreen
          />
        )}
      </Modal>
    </div>
  );
}
