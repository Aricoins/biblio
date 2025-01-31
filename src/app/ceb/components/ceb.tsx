"use client"
import { useEffect, useState } from "react";
import { List, Spin, Alert } from "antd";
import Link from "next/link";
import NavFoot from "@/app/components/NavFoot";
import NavTop from "@/app/components/NavTop";
interface ApiResponse {
  "": string;
  _1: string;
  _2: string;
  _3: string;
}

interface CebItem {
  titulo: string;
  descripcion: string;
  vinculo: string;
  fecha?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const transformData = (apiData: ApiResponse[]): CebItem[] => {
  return apiData.map(item => ({
    titulo: item._1 || '',
    descripcion: item._2 || '',
    vinculo: item._3 || '',
  })).filter(item => item.titulo);
};

const Ceb = () => {
  const [data, setData] = useState<CebItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWithRetry = async (retryCount = 0): Promise<CebItem[]> => {
    try {
      const response = await fetch("/api/ceb");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const jsonData = await response.json();
      return transformData(jsonData.data);
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(retryCount + 1);
      }
      throw error;
    }
  };

  useEffect(() => {
    fetchWithRetry()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

return (
  <>
    <NavTop />
    {/* <div className="min-h-screen m-32 bg-gray-50">
                
      <div className="container flex flex-col items-center">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="w-full max-w-4xl mx-auto p-4">
            <Alert type="error" message={error} />
          </div>
        ) : (
          <List
            itemLayout="vertical"
            dataSource={data}
            className="w-full max-w-4xl p-4"
            renderItem={(item: CebItem) => (
              <List.Item className="hover:bg-gray-50 transition-colors duration-200 rounded-lg p-4 mb-4 border border-gray-200 shadow-sm">
                <List.Item.Meta
                  title={
                    item.vinculo ? (
                      <Link
                        href={item.vinculo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        {item.titulo}
                      </Link>
                    ) : (
                      <span className="text-xl font-semibold text-gray-800">
                        {item.titulo}
                      </span>
                    )
                  }
                  description={
                    <p className="mt-2 text-gray-600">
                      {item.descripcion}
                    </p>
                  }
                />
              </List.Item>
           
            )}
          />
        )}
      </div>
      </div> */}
      <NavFoot />
    </>
  );
  
};

export default Ceb;