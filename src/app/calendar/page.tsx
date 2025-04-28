import NavFoot from "../components/NavFoot";
import NavTop from "../components/NavTop";

export default function CalendarPage() {
  return (
    <>
      <NavTop />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "5% auto",
          width: "100%",
          fontFamily: "Sans-Serif",
          color: "black",
          fontSize: "2vw",
          opacity: 1,
        }}
      >
        <h4>Calendario de Efemérides</h4>
        <p style={{ fontSize: "medium", textAlign: "center" }}>
          CONSOLIDACION NORMATIVA. ESTABLECE CALENDARIO DE CONMEMORACIONES,
          EFEMÉRIDES Y CELEBRACIONES MUNICIPALES.
        </p>
        <p>Ordenanza 2033-CM-12 | Anexo II</p>

        <div
          style={{
            width: "100%",
            height: "150%",
            aspectRatio: "16/12",
            borderRadius: "10px",
            fontSize: "sm",
            overflow: "hidden",
            border: "2px dashed orangered",
            backgroundColor: "orangered",
          }}
        >
          <iframe
            src="https://calendar.google.com/calendar/embed?src=digestoconcejo%40gmail.com&ctz=America%2FBuenosAires"
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              fontSize: "8px",
            }}
            frameBorder="6"
            scrolling="yes"
            allowFullScreen
          ></iframe>
        </div>
      </main>
      <NavFoot />
    </>
  );
}
