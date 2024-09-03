import React, { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./style.module.css";

const Exco2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/exco2");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        message.error("Failed to load data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle search
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  // Filter data based on search text
  const filteredData = data.filter((item) => {
    const fullName = `${item["Apellido"]} ${item["Nombre"]}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  const columns = [
    {
        title: "Nombre",
        dataIndex: "Nombre",
        key: "nombre",
  
      },
    {
      title: "Apellido",
      dataIndex: "Apellido",
      key: "apellido",

    },
   
  ];

  return (
    <div style={{ textAlign: "center", margin: "5%" }}>
      <h2
        style={{
          fontSize: "medium",
          fontWeight: 500,
          padding: "1%",
          cursor: "pointer",
          backgroundColor: "rgb(0, 141, 154)",
          color: "rgb(255, 255, 255)",
          transition: "0.3s",
          border: "rgb(255, 255, 255) 2px solid",
          fontFamily: "'Roboto', sans-serif",
          borderRadius: "25px",
          textAlign: "center",
          width: "70%",
          margin: "0 auto",
          boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
        }}
        onClick={() => setVisible(!visible)}
      >
     Ex Combatientes Malvinas | Ordenanza 2017-CM-10
      </h2>
      {visible && (
       <div data-aos="fade-left" data-aos-duration="300" style={{ display: "flex", justifyContent: "center", marginTop: "1rem", backgroundColor: "rgb(0, 141, 154)", padding: "2%", borderRadius: "5%" }}>
          <div style={{ width: "80%", maxWidth: "1200px" }}>
            <Input
              placeholder="Buscar por nombre o apellido"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
            <Table
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              rowKey="Número"
              style={{ width: "100%", textAlign: "center" }}
              bordered
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Exco2;