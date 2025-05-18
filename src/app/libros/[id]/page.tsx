"use client";
import { fetchDetailLibros } from "../../lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { cp } from "fs";

interface Detail {
  id: number;
  titulo: string;
  autor: string;
  decla: any;
  imagen: string;
  contratapa: string;
  resenia: string;
}

export default function Detail({ params }: { params: { id: number } }) {
  const [librosDetail, setLibrosDetail] = useState<any>();
  const [currentImage, setCurrentImage] = useState<string>("");
  const [video, setVideo] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/detail?id=${params.id}`);
        if (response.ok) {
          const libros = await response.json();
          console.log(libros, "libros detail");
          setLibrosDetail(libros);
        }
      } catch (error) {
        console.error("No se encontró el detalle del libro", error);
      } finally {
        setLoading(false); // ✅ Esto se ejecuta pase lo que pase (éxito o error)
      }
    };

    fetchDetail();
  }, [params.id]);

  const handleImageChange = (newImage: string) => {
    setVideo(false);
    setCurrentImage(newImage);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      {loading ? (
        <Spin
          style={{
            fontSize: "",
            color: "#74cbc3",
            display: "flex",
            justifyContent: "center",
            marginTop: "20%",
          }}
        />
      ) : (
        <div className={styles.container}>
          <div onClick={handleClick}>
            <Image
              src={currentImage || librosDetail?.imagen || "/placeholder.jpg"}
              alt={librosDetail?.titulo || "imagen"}
              width={300}
              height={400}
              className={`${styles.imagen}`}
            />
          </div>

          <div className={styles.texto}>
            <h1 className="p-5 text-4xl font-bold">{librosDetail?.titulo}</h1>
            <h2 className="p-5 text-2xl font-semibold">
              de {librosDetail?.autor}
            </h2>
            <div className={styles.resenia}>
              {librosDetail?.resenia
                ?.split(". ")
                .map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              <p className="m-1 font-light">
                Declaración {librosDetail?.decla} del Concejo Municipal de San
                Carlos de Bariloche
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
