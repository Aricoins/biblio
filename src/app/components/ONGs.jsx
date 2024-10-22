import Link from 'next/link';



function ONGs() {

 
  return (
    <Link href = "https://concejobariloche.gov.ar/index.php?option=com_content&view=article&id=16535" 
    target= "_blank" rel="noopener noreferrer"
    
    >
      <div style={{ textAlign: "center", margin: "5%" }}>
      <h2
   
        style={{
          fontSize: "medium",
          fontWeight: 500,
          padding: "1%",
          cursor: "pointer",
          backgroundColor: "orangered",
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
           className='hover:bg-slate-200 hover:text-black'
        onClick={() => setVisible(!visible)}
      >
       Registro de ONG
      </h2>
    </div>
    </Link>
  );
}

export default ONGs;