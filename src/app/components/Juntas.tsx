"use client";

import React, { useState, useEffect } from "react";
import { Table, Input, message, Tooltip } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { LinkOutlined, SearchOutlined } from "@ant-design/icons";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

type JuntaData = {
  "Junta Vecinal": string;
  Link: string;

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
{
  title: "Estatuto",
  dataIndex: "Link",
  key: "link",
  width: 100,
  align: 'center' as const,
  render: (text) => {
    const hasLink = text && text.trim() !== '';
    return (
      <Tooltip title={hasLink ? "Ver estatuto" : "Estatuto no disponible"} placement="left">
        {hasLink ? (
          <a
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0125b4",
              fontSize: '1.2rem',
              display: 'inline-block'
            }}
          >
            <LinkOutlined style={{ 
              transition: 'transform 0.3s',
              cursor: 'pointer',
              transform: 'rotate(-45deg)'
            }}/>
          </a>
        ) : (
          <span style={{
            color: "#7bdd0b",
            fontSize: '1.2rem',
            cursor: 'not-allowed'
          }}>
            <LinkOutlined style={{ 
              transform: 'rotate(-45deg)',
              opacity: 0.5
            }}/>
          </span>
        )}
      </Tooltip>
    );
  },
},
    ];

    return columns;
  };

  return (
     <div style={{ textAlign: "center", margin: "5%" }}>
      {/* Header */}
      <h2
        style={{
          fontSize: "medium",
          fontWeight: 500,
          cursor: "pointer",
          backgroundColor: "#74cbc3",
          color: "black",
          transition: "0.5s",
          border: "black 2px solid",
          fontFamily: "'Roboto', sans-serif",
          borderRadius: "25px",
          textAlign: "center",
          width: "70%",
          margin: "0 auto 2% auto",
          padding: "1%",
          boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px"
        }}
        onClick={() => setVisible(!visible)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f7f8fa";
          e.currentTarget.style.border = "#74cbc3 2px solid";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#74cbc3";
          e.currentTarget.style.border = "black 2px solid";
        }}
      >
        {visible ? <MdExpandLess /> : <MdExpandMore />} 
        Juntas Vecinales | Estatutos  
        {visible ? <MdExpandLess /> : <MdExpandMore />}
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