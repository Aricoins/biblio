"use client";

import { useEffect, useState } from "react";
import { List, Spin, Select } from "antd";
import Link from "next/link";


const { Option } = Select;

interface DataItem {
  [key: string]: any;
}

const normalizeKeys = (item: any) => {
  const normalized: any = {};
  for (const key in item) {
    const newKey = key.trim();
    normalized[newKey] = item[key];
  }
  return normalized;
};

const DataPage = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<string>("Secciones");
  const [sections, setSections] = useState<string[]>([]);
useEffect(() => {
  const fetchData = async () => {    try {
      const response = await fetch("/api/com");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setSections(Object.keys(jsonData));
      setData((jsonData[selectedSection] || []).map(normalizeKeys));
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setLoading(false);
    }
  };
    fetchData();
    },
    [selectedSection]);


  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
    setLoading(true);
  };

  return (
    <div style={{fontFamily: "'Roboto', sans-serif"}}>

      <div className="container" style={{ padding: "20px" }}>
        <h1>Fondo Documental de la Convención Constituyente 2006-2007</h1>
        <Select
          style={{ width: "100%", marginBottom: 20, }}
          value={selectedSection}
          onChange={handleSectionChange}
        >
          {sections.map((section) => (
            <Option key={section} value={section}>
              {section}
            </Option>
          ))}
        </Select>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" />
            <p>Cargando datos...</p>
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            className="bg-gray-200"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Link  href={item["Vinculo"]?.trim() || "#"}  target="_blank" 
                  rel="noopener noreferrer">{item["titulo"] || "Sin titulo"}</Link>}
                  description={item["descripcion"]?.trim() || "Sin descripcion"}
                />
              </List.Item>
            )}
          />
        )}
      </div>

    </div>
  );
};

export default DataPage;
