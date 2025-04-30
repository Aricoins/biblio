import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import NextResponse from 'next/server';



const prisma = new PrismaClient();
interface Knowledge {
  [key: string]: any; 
}

async function loadJsonKnowledge() {
  const files = ['datos.json', 'proyectos.json', '../proyectos/datos.json']; 
  let data = [];

  for (const file of files) {
    const possiblePaths = [
      path.join(process.cwd(), 'pages', file),
      path.join(process.cwd(), 'src', 'app', 'api', 'chat', file),
      path.join(process.cwd(), 'src', 'app', 'proyectos', file),
      path.join(process.cwd(), file),
    ];

    let found = false;
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.push(...(Array.isArray(content) ? content : [content]));
        found = true;
        break;
      }
    }
    if (!found) {
      console.error('No se encontró el archivo:', file);
    }
  }

  return data;
}


async function getAIResponse(message: string, knowledge: Array<Knowledge>): Promise<string> {  const hfApiKey = process.env.OPENROUTER_API_KEY;
  if (!hfApiKey) {
    return "Error: Falta HUGGING_FACE_API_KEY en tu archivo .env";
  }

  const knowledgeString = knowledge
    .slice(0, 3)
    .map(k => JSON.stringify(k))
    .join("\n");
    const systemMessage = {
      role: "system",
      content: `Eres un asistente experto en la normativa y proyectos del Concejo Deliberante de Bariloche. Usa estos datos:\n${knowledgeString} y estas webs www.dibiase.net  www.concejobailoche.gob.ar " `
    };
    
    const userMessage = {
      role: "user",
      content: message
    };
    
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        max_tokens: 3000,
        messages: [systemMessage, userMessage],
      }),
     });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error de OpenRouter:", errorText);
      return "Error al comunicar con la API de OpenRouter.";
    }

    const data = await res.json();
    console.log("Respuesta de OpenRouter:", data);

    return data?.choices?.[0]?.message?.content || "No encontré respuesta adecuada a tu consulta.";
  } catch (error) {
    console.error("Error en la llamada a OpenRouter:", error);
    return "Error al procesar tu consulta con OpenRouter.";
  }
}

export async function POST(req: Request): Promise<Response> {
  console.log('📩 POST recibido en /api/chat');
  let message;
  
  try {
    const body = await req.json();
    console.log('📩 Cuerpo de la solicitud:', body);
    message = body.message;
    
    if (!message) {
      console.error('❌ No se proporcionó mensaje');
      return new Response(JSON.stringify({ error: 'No se proporcionó mensaje' }), { status: 400 });
    }
    
    console.log('🔄 Cargando conocimiento...');
    const knowledge = await loadJsonKnowledge();
    
    console.log('🔄 Obteniendo respuesta de IA...');
    const reply = await getAIResponse(message, knowledge);
    console.log('✅ Respuesta generada:', reply);
    
    try {
      console.log('🔄 Guardando mensaje en la base de datos...');
      await prisma.message.create({
        data: {
          userInput: message,
          botReply: reply,
        },
      });
      console.log('✅ Mensaje guardado en la base de datos');
    } catch (dbError) {
      console.error('❌ Error guardando en base de datos:', dbError);
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
    });
  } catch (error) {
    console.error('❌ Error general:', error);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), {
      status: 500,
    });
  }
}