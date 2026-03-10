# Plan: Clase 12 - Deploy de la API de Agenda ADSO en Render

## Información Recopilada:

- **Usuario GitHub:** samuelsalazar2356
- **Repositorio Frontend existente:** https://github.com/samuelsalazar2356/React.js
- **Repositorio Backend a crear:** agenda-adso-api (nuevo)
- **Cuenta Render:** No creada (necesita crearse)
- **Puerto actual del server local:** 3003 (según api.js)

## Archivos Existentes Analizados:

1. **server.js** - Está vacío/necesita crearse para el backend
2. **db.json** - Contiene datos de contactos (existente)
3. **api.js** - Define API en http://localhost:3003/contactos
4. **reactjs/src/config.js** - Configuración del frontend

## Plan de Ejecución:

### FASE 1: Crear estructura del Backend
- [ ] 1.1 Crear carpeta agenda-adso-api/ en el raíz
- [ ] 1.2 Crear package.json del backend
- [ ] 1.3 Crear server.js del backend
- [ ] 1.4 Copiar db.json a agenda-adso-api/

### FASE 2: Actualizar código del Frontend
- [ ] 2.1 Actualizar api.js para usar variable de entorno o URL configurable
- [ ] 2.1 Mantener compatibilidad con localhost para desarrollo local

### FASE 3: Git - Repositorio Backend
- [ ] 3.1 Inicializar git en agenda-adso-api/
- [ ] 3.2 Crear repositorio en GitHub: agenda-adso-api
- [ ] 3.3 Subir código al repositorio

### FASE 4: Render - Despliegue Backend
- [ ] 4.1 Crear cuenta en Render.com
- [ ] 4.2 Conectar GitHub a Render
- [ ] 4.3 Crear Web Service en Render
- [ ] 4.4 Obtener URL pública del backend

### FASE 5: Integración Final
- [ ] 5.1 Actualizar api.js con URL de Render
- [ ] 5.2 Actualizar commit del frontend
- [ ] 5.3 Probar la aplicación completa

---

## Notas Importantes:
- NO se modifica el package.json del frontend
- El backend usa json-server ^0.17.4
- Puerto para desarrollo local: 3003 (ya configurado)
- Puerto para Render: process.env.PORT || 3000

