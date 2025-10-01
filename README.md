# Front Falabella

Este proyecto es una aplicación web construida con Vite, TypeScript y Web Components.  
El objetivo es consumir una API REST pública y enfocandonos en la reutilización de 
componentes, manejo de estados, consumo de datos y buenas prácticas de desarrollo frontend.

Nota: probar el search con el usuario "octocat" o algun otro que tenga foto de perfil 

## Requisitos instalacion
Node.js: v22.12.0
npm: v10.9.0
Vite: v7.1.7  
TypeScript: v5.6.2  
Jest: 30.2.0

## bash
git clone https://github.com/sebasxx85/front-falabella.git
cd front-falabella
npm install
npm run dev

## Componentes
<app-header> → cabecera principal con branding Falabella.
<search-input> → input + botón de búsqueda de usuario de GitHub.
<user-card> → tarjeta que muestra avatar, nombre, bio, repos públicos y link al perfil.
<app-footer> → pie de página con texto personalizable.

## Variables de entorno
El proyecto utiliza los siguientes archivos .env:

.env.development → configuración en desarrollo
.env.production → configuración en producción
.env → valores comunes

## Scripts
npm run dev       # servidor de desarrollo
npm run build     # compilar para producción
npm run preview   # previsualizar la build
npm test          # con Jest

## Test dentro de carpeta _test_
smoke.test.js → test mínimo para verificar que Jest y jsdom funcionan.
app-header.test.js → pruebas de renderizado del <app-header>.
app-footer.test.js → pruebas de renderizado del <app-footer>.
search-input.test.js → pruebas de evento search en <search-input>.
user-card.test.js → pruebas de los estados (loading, ready, error) en <user-card>.