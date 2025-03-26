# ITA Wiki Frontend

Este proyecto es una aplicación web construida con React y TypeScript. Su objetivo principal es ofrecer una plataforma tipo "wiki" para la comunidad de IT Academy, permitiendo visualizar, filtrar y gestionar recursos de aprendizaje categorizados por temas y tecnologías. También integra funcionalidades de autenticación, control de acceso según roles, y gestión de recursos personalizados.

## Características Principales

- **Autenticación y roles:**

  - Inicio de sesión mediante GitHub OAuth con Firebase Auth.
  - Gestión de usuarios por roles: estudiante, mentor, administrador, superadmin.

- **Gestión de recursos:**

  - Creación, edición y visualización dinámica de recursos educativos (vídeos, cursos, blogs).
  - Filtrado por categoría, tema y tipo de recurso.
  - Panel de "Lista de Lectura" personalizada.

- **Interfaz dinámica:**

  - Diseño adaptable (responsive) con Tailwind CSS.
  - Componentes reutilizables y hooks personalizados para una arquitectura limpia.
  - Validaciones robustas con Zod y manejo de formularios con react-hook-form.

- **Rendimiento y accesibilidad:**
  - Carga asíncrona y optimizada de componentes (lazy loading).
  - Diseño accesible con semántica HTML y etiquetas ARIA.

## 🧱 Estructura del Proyecto

```text
src/
├── api/              # Abstracción de llamadas a Firebase y backend
├── assets/           # Imágenes y recursos estáticos
├── components/       # Componentes reutilizables y de dominio
├── context/          # React Context Providers y hooks relacionados
├── data/             # Datos estáticos (categorías, temas...)
├── hooks/            # Hooks personalizados (estado, auth, UI...)
├── layouts/          # Componentes de estructura visual (Header, Sidebars...)
├── moock/            # Datos simulados para desarrollo
├── pages/            # Páginas asociadas a rutas de la app
├── types.ts          # Tipos e interfaces TypeScript globales
├── validations/      # Validaciones con Zod para formularios
├── App.tsx           # Configuración principal y rutas
└── main.tsx          # Punto de entrada de React
```

## 🧠 Arquitectura y Buenas Prácticas

- Tipado estático completo con TypeScript.
- Separación clara entre lógica (hooks, API) y presentación (componentes).
- Uso de Context API para estados globales (usuario, recursos, UI).
- Componentización reutilizable y desacoplada.
- Formularios con react-hook-form y validación con Zod.
- Manejo de roles y permisos condicionales en UI.
- Código modular y fácilmente escalable.
- Rutas con React Router v6 y carga perezosa (React.lazy + Suspense).

## 🧪 Testing

- Tests unitarios con Vitest y React Testing Library.
- Mocks y contextos simulados para pruebas.
- Buen comienzo en cobertura de componentes clave.

## 🧱 Principios SOLID

- ✅ SRP: Hooks, componentes y archivos mantienen responsabilidades claras.
- ✅ DIP: Componentes consumen abstracciones como contextos o funciones API.
- ✅ OCP: Nueva funcionalidad puede añadirse sin modificar lógica existente.
- ✅ ISP & LSP: No aplican directamente en React, pero se promueven contextos y hooks especializados.

## ⚠️ Cosas a Mejorar o Evitar

- Inconsistencias en nombres (ej. "Acces" vs "Access", "addRessource" vs "addResource").
- Código duplicado o sin uso (estados de modales no conectados).
- Clonado innecesario de arrays (`structuredClone`).
- Accesibilidad: falta de aria-labels en botones de icono.
- Potenciales duplicaciones en fetch de recursos.
- Mocks y pruebas pueden mejorarse para cubrir lógica compleja (filtros, login, etc.).

## 🚀 Rendimiento

- React.lazy + Suspense para rutas.
- useMemo para filtros eficientes.
- No hay cálculos costosos ni manipulación directa del DOM.
- Tailwind + purgado = CSS ligero.
- Evitar `structuredClone` innecesario para listas filtradas.

## 🔐 Seguridad

- Firebase Auth con OAuth GitHub.
- Roles gestionados desde backend (no confiados en el frontend).
- Uso seguro de localStorage (no guarda credenciales).
- Validaciones robustas con Zod en formularios.
- Variables de entorno para datos sensibles.

## ♿ Accesibilidad

- HTML semántico correcto.
- Inputs con etiquetas/placeholder.
- Faltan `aria-label` en botones de icono.
- Mejorable manejo de foco en modales y navegación con teclado.

## 📦 Dependencias Destacadas

- React + TypeScript + Vite
- react-router-dom
- react-hook-form + zod
- Firebase Auth
- Tailwind CSS
- sonner (notificaciones)
- Vitest + React Testing Library

---

Este README resume la arquitectura, buenas prácticas y áreas de mejora del proyecto ITA Wiki Frontend. Próximo paso: comparar con la versión antigua del mismo proyecto.

¿Listo para la siguiente comparación? 💻

---

## Documentación técnica completa

(Resumen de los puntos del análisis anterior incluidos en formato extendido. Aquí puedes copiar/pegar todo el texto detallado del análisis completo si lo necesitas, o vincularlo desde otro documento compartido.)

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura variables de entorno:
   Copia `.env.example` a `.env` y rellena con tus credenciales:

```bash
VITE_API_URL=<url-backend>
VITE_FIREBASE_API_KEY=<api-key>
...
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Pruebas

Ejecuta las pruebas unitarias con:

```bash
npm run test
```

## Tecnologías Utilizadas

- React (Hooks, Context API)
- TypeScript
- Firebase Auth (GitHub OAuth)
- Tailwind CSS
- Zod y react-hook-form
- Vite (Bundler)
- Vitest & Testing Library

## Contribuciones

Las contribuciones son bienvenidas. Realiza un fork, crea tu rama con los cambios y envía un pull request.
