#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando DiBiase.Net...\n');

// 1. Verificar y copiar .env.example a .env si no existe
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Archivo .env creado desde .env.example');
  console.log('⚠️  IMPORTANTE: Configura las variables de entorno en .env antes de continuar\n');
} else if (fs.existsSync(envPath)) {
  console.log('✅ Archivo .env ya existe\n');
} else {
  console.log('❌ No se encontró .env.example. Crea manualmente el archivo .env\n');
}

// 2. Instalar dependencias si no existen
if (!fs.existsSync('node_modules')) {
  console.log('📦 Instalando dependencias...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente\n');
  } catch (error) {
    console.error('❌ Error al instalar dependencias:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencias ya instaladas\n');
}

// 3. Generar cliente de Prisma
console.log('🗄️  Generando cliente de Prisma...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente de Prisma generado\n');
} catch (error) {
  console.error('❌ Error al generar cliente de Prisma:', error.message);
  console.log('⚠️  Asegúrate de que DATABASE_URL esté configurado en .env\n');
}

// 4. Verificar configuración mínima
console.log('🔍 Verificando configuración...');

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY'
];

const optionalEnvVars = [
  'OPENROUTER_API_KEY',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY'
];

let hasRequiredVars = true;
let hasAIProvider = false;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Verificar variables requeridas
  requiredEnvVars.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`) && 
                   !envContent.includes(`${varName}=""`);
    if (hasVar) {
      console.log(`✅ ${varName} configurado`);
    } else {
      console.log(`❌ ${varName} no configurado`);
      hasRequiredVars = false;
    }
  });
  
  // Verificar proveedores de AI
  optionalEnvVars.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`) && 
                   !envContent.includes(`${varName}=""`);
    if (hasVar) {
      console.log(`✅ ${varName} configurado`);
      hasAIProvider = true;
    }
  });
  
  if (!hasAIProvider) {
    console.log('⚠️  No hay proveedores de AI configurados. El chatbot no funcionará.');
    console.log('   Configura al menos uno: OPENROUTER_API_KEY (recomendado), OPENAI_API_KEY, o ANTHROPIC_API_KEY\n');
  }
}

// 5. Instrucciones finales
console.log('\n📋 Próximos pasos:');

if (!hasRequiredVars) {
  console.log('1. ⚠️  Configura las variables requeridas en .env');
}

if (!hasAIProvider) {
  console.log('2. ⚠️  Configura al menos un proveedor de AI en .env');
}

console.log('3. 🗄️  Ejecuta las migraciones de base de datos:');
console.log('   npx prisma migrate dev');

console.log('4. 🚀 Inicia el servidor de desarrollo:');
console.log('   npm run dev');

console.log('\n📚 Documentación adicional:');
console.log('- Clerk Auth: https://clerk.com/docs');
console.log('- OpenRouter API: https://openrouter.ai/docs');
console.log('- Prisma: https://www.prisma.io/docs');

console.log('\n✨ ¡Configuración completada!');

// 6. Verificar estado de salud si todo está configurado
if (hasRequiredVars && hasAIProvider) {
  console.log('\n🔍 Verificando estado del sistema...');
  console.log('💡 Después de iniciar el servidor, visita /api/health para verificar el estado');
}