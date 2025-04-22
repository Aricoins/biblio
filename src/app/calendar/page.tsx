import NavFoot from "../components/NavFoot";
import NavTop from "../components/NavTop"

export default function CalendarPage() {
    return (
      <><NavTop /><main style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "5%", width: "100%", fontFamily: "Sans-Serif", color: "black", fontSize: "2vw", opacity: 0.6}}>
        <h4>Calendario de Efemérides</h4>
        <p style={{fontSize: "14px"}}>CONSOLIDACION NORMATIVA. ESTABLECE CALENDARIO DE CONMEMORACIONES, EFEMÉRIDES Y CELEBRACIONES MUNICIPALES.</p>
        <p>Anexo II</p>
        <div>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=digestoconcejo%40gmail.com&ctz=America%2FBuenosAires"
            style={{ border: "medium dashed orangered",   margin: "0", padding: "%", borderRadius: "10px", backgroundColor: "orangered" }}
            width="700vh"
            height="400vh"
          
          ></iframe>
        </div>
      </main>
      <NavFoot/> </>
    );
  }
  