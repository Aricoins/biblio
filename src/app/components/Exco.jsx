import React, { useState, useEffect } from 'react';
import { Table, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './style.module.css'

const ExcoTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/exco');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        message.error('Failed to load data.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Filtrar datos según el texto de búsqueda en nombre y apellido
  const filteredData = data.filter(item => {
    const fullName = `${item['Apellido']} ${item['Nombre']}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  const columns = [
    {
      title: 'Número',
      dataIndex: 'Número', 
      key: 'numero',
    },
    {
      title: 'Apellido',
      dataIndex: 'Apellido y Nombre', 
      key: 'apellido',
    },
    {
      title: 'Nombre',
      dataIndex: 'Nombre',
      key: 'nombre',
    },
  ];

  return (
    <div style={{ justifyContent: "center", margin: "5%"}}>
      <h2 
        style={{
        fontSize: 'large',
         fontWeight: 500,
         display: 'flex',
         justifyContent: 'left',
         padding: '1%',
         cursor: 'pointer',
         backgroundColor: 'rgb(0, 0, 0)',
         color: 'white',
         transition: '0.3s',
         border: 'rgb(255, 87, 51) 2px solid',
         fontFamily: "'Roboto', sans-serif",
         borderRadius: '25px',
         width: '60%',
       }}
       onClick={() => setVisible(!visible)}
     >
  
        Soldados Convocados Malvinas |  Ordenanza 3102-CM-19
      </h2>
      {visible && (
        <div className="mt-4">
          <Input
            placeholder="Buscar por nombre o apellido"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            style={{ width: '40%' }}
          />
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            rowKey="Número"
            style={{ width: '40%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ExcoTable;
