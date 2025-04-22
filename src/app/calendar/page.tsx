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
          width: "80%",
          fontFamily: "Sans-Serif",
          color: "black",
          fontSize: "2vw",
          opacity: 0.6,
           }}
      >
        <h4>Calendario de Efemérides</h4>
        <p style={{ fontSize: "14px", textAlign: "center" }}>
          CONSOLIDACION NORMATIVA. ESTABLECE CALENDARIO DE CONMEMORACIONES, EFEMÉRIDES Y CELEBRACIONES MUNICIPALES.
        </p>
        <p>Anexo II</p>

        <div style={{ width: "100%",  aspectRatio: "16/10", borderRadius: "10px", overflow: "hidden", border: "2px dashed orangered", backgroundColor: "orangered" }}>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=digestoconcejo%40gmail.com&ctz=America%2FBuenosAires"
            style={{ width: "100%", height: "100%", border: 0, fontSize: "xx-small" }}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          ></iframe>
        </div>
      </main>
      <NavFoot />
    </>
  );
}
