export async function POST(req) {
    try {
        const { message } = await req.json();
        if (!message) {
            return new Response(JSON.stringify({ error: "Mensaje del usuario es requerido" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Devuelve una respuesta simulada
        return new Response(JSON.stringify({ response: "Procesando tu solicitud..." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error al procesar solicitud:", error);
        return new Response(JSON.stringify({ error: "Error al procesar solicitud" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
