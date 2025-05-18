import React, { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from "@ant-design/icons";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

type JuntaData = {
  "Junta Vecinal": string;
  Ordenanza1: string;
  Ordenanza2: string;
  Ordenanza3: string;
  Ordenanza4: string;
  Ordenanza5: string;
  Link1: string;
  Link2: string;

};

const JuntasVecinales = () => {
  const [data, setData] = useState<JuntaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/juntas");
        if (!response.ok) throw new Error("Error en la respuesta");
        const result = await response.json();
        setData(result);
      } catch (error) {
        message.error("Error cargando datos");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) =>
    item["Junta Vecinal"].toLowerCase().includes(searchText)
  );
  const generateColumns = (): ColumnsType<JuntaData> => {
    const columns: ColumnsType<JuntaData> = [
         {
        title: "Junta Vecinal",
        dataIndex: "Junta Vecinal",
        key: "junta",
        width: 300,
        fixed: 'left' as const,
      },
    ];

    // Generar columnas dinámicas
    for (let i = 1; i <= 5; i++) {
      columns.push({
        title: `Ordenanza ${i}`,
        key: `ordenanza-${i}`,
        render: (_: any, record: JuntaData) => {
          const ordenanza = record[`Ordenanza${i}` as keyof JuntaData];
          const link = record[`Link${i}` as keyof JuntaData];
          
          if (!ordenanza) return null;
          
          return link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {ordenanza}
            </a>
          ) : (
            <span>{ordenanza}</span>
          );
        },
      });
    }

    return columns;
  };

  return (
    <div style={{ textAlign: "center", margin: "5%" }}>
    <h2
      style={{
        fontSize: "medium",
        fontWeight: 500,
        padding: "1%",
        cursor: "pointer",
        backgroundColor: "rgb(81, 81, 81)",
        color: "rgb(255, 255, 255)",
        transition: "0.3s",
        border: "rgb(255, 255, 255) 2px solid",
        fontFamily: "'Roboto', sans-serif",
        borderRadius: "25px",
        textAlign: "center",
        width: "70%",
        margin: "0 auto",
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
        flexDirection: "column",
      }}
      onClick={() => setVisible(!visible)}
    >
 {visible ? <MdExpandLess/>: <MdExpandMore/>} Juntas Vecinales | Estatutos  {visible ? <MdExpandLess/>: <MdExpandMore/>}   

 </h2>
     {visible && (
      <div style={{ marginTop: "2%" }}>
      <Input
        placeholder="Buscar junta vecinal"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />

      <Table
        columns={generateColumns()}
        dataSource={filteredData}
        loading={loading}
        rowKey={(record) => record["Junta Vecinal"]}
        bordered
        scroll={{ x: true }}
        pagination={{ pageSize: 20 }}
      /></div>
    )}
    </div>
  );
}
export default JuntasVecinales;