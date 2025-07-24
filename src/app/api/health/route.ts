// src/app/api/health/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ImprovedAIService } from '../../lib/ai/improved-ai.service';
import { dbService } from '../../lib/db/db.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Verificar estado de la base de datos
    const dbHealth = await dbService.healthCheck();
    
    // Verificar estado de los proveedores de AI
    const aiService = new ImprovedAIService();
    const aiProvidersHealth = await aiService.checkProvidersHealth();
    
    // Verificar variables de entorno críticas
    const envCheck = {
      database: !!process.env.DATABASE_URL,
      openrouter: !!process.env.OPENROUTER_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      clerk: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    };
    
    const responseTime = Date.now() - startTime;
    
    // Determinar estado general
    const isHealthy = dbHealth.status === 'healthy' && 
                     Object.values(aiProvidersHealth).some(status => status);
    
    const healthStatus = {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      services: {
        database: dbHealth,
        ai_providers: aiProvidersHealth,
        environment: envCheck
      },
      version: process.env.npm_package_version || '0.1.0',
      uptime: process.uptime()
    };
    
    return NextResponse.json(healthStatus, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      responseTime: `${Date.now() - startTime}ms`
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}