# 🎨 Scénico - Frontend Angular

Este repositorio contiene el **frontend de Scénico**, una plataforma web enfocada en la visibilización de artistas emergentes y la conexión con agentes del sector cultural. La aplicación está desarrollada como parte de un Trabajo de Fin de Grado (TFG) del ciclo de Desarrollo de Aplicaciones Multiplataforma (DAM).

El frontend está construido como una **SPA (Single Page Application)** utilizando **Angular**, e interactúa con un backend REST para gestionar usuarios, portafolios, oportunidades y postulaciones.

---

## 🚀 Funcionalidades principales

- Registro e inicio de sesión con control de roles (artista, empresa, espectador, admin)
- Creación y edición de portafolios digitales
- Publicación y visualización de oportunidades laborales o colaborativas
- Postulación directa desde perfiles de artistas
- Filtros dinámicos por categoría, ubicación y estado
- Visualización pública de oportunidades sin iniciar sesión
- Autenticación y protección de rutas mediante JWT

---

## 🧰 Tecnologías utilizadas

- **Angular 17**
- **TypeScript**
- **Angular Material / Bootstrap**
- **RxJS**
- **HTML5 / CSS**
- Comunicación con API REST vía `HttpClientModule`


---

## 🔐 Seguridad

- Autenticación basada en **JWT**
- Token almacenado en el navegador tras login
- Rutas protegidas
- Roles definidos desde el backend (ARTIST, ENTERPRISE, ADMIN, USER)

---

## ⚙️ Configuración del entorno

Edita `src/environments/environment.ts` para apuntar a tu backend:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1/users/'
};

# Clonar el repositorio
git clone https://github.com/a-johannna/frontend.git
cd frontend

# Instalar dependencias
npm install

# Ejecutar el servidor en modo desarrollo
ng serve

# Accede desde:
http://localhost:4200/

