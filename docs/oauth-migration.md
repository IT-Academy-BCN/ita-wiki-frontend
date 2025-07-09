# Migración de Firebase a OAuth con Laravel

## 🎯 Objetivo
Migrar el sistema de autenticación del frontend de Firebase a OAuth con GitHub usando Laravel como backend.

## ✅ Cambios realizados en el frontend

### 1. Nuevo archivo: `src/api/authApi.ts`
- **`initiateGitHubOAuth()`**: Inicia el flujo OAuth redirigiendo al backend
- **`getCurrentUser()`**: Obtiene información del usuario autenticado
- **`signOut()`**: Cierra la sesión del usuario
- **`checkAuthStatus()`**: Verifica si el usuario está autenticado
- **`handleOAuthCallback()`**: Maneja el callback de OAuth

### 2. Actualización: `src/config.ts`
- Agregados endpoints de autenticación:
  - `auth.user`: `"user"`
  - `auth.logout`: `"auth/logout"`

### 3. Refactorización: `src/context/UserContext.tsx`
- Eliminada dependencia de Firebase
- Integrado con nueva API de OAuth
- Manejo automático de callback de OAuth
- Verificación de estado de autenticación al cargar

### 4. Simplificación: `src/hooks/useUser.tsx`
- Eliminada lógica duplicada
- Ahora usa directamente el UserContext

### 5. Actualización: `src/components/Layout/HeaderComponent.tsx`
- `signOut()` ahora es async para manejar la llamada al backend

---

## 🔗 Endpoints requeridos del backend

### 1. Endpoint de redirección OAuth
```
GET /auth/github/redirect
```
**Propósito:** Inicia el flujo de OAuth con GitHub  
**Acción:** Redirige al usuario a la página de autorización de GitHub  
**Respuesta:** Redirección HTTP a GitHub

### 2. Endpoint de callback OAuth
```
GET /auth/github/callback
```
**Propósito:** GitHub redirige aquí después de la autorización  
**Acción:** 
- Procesa el código de autorización de GitHub
- Crea/actualiza el usuario en la base de datos
- Establece la sesión con cookies
- Redirige de vuelta al frontend

### 3. Endpoint para obtener usuario actual
```
GET /api/user
```
**Propósito:** Obtener información del usuario autenticado  
**Headers:** Incluir cookies de sesión automáticamente  
**Respuesta esperada:**
```json
{
  "id": 123,
  "displayName": "Nombre del Usuario",
  "photoURL": "https://avatars.githubusercontent.com/u/123?v=4",
  "role": "student"
}
```

### 4. Endpoint de logout
```
POST /api/auth/logout
```
**Propósito:** Cerrar sesión del usuario  
**Headers:** Incluir cookies de sesión  
**Respuesta:** 200 OK

---

## 🔄 Flujo de autenticación

1. **Usuario hace clic en "Sign in with GitHub"**
2. **Frontend redirige a:** `GET /auth/github/redirect`
3. **Backend redirige a:** GitHub OAuth
4. **Usuario autoriza en GitHub**
5. **GitHub redirige a:** `GET /auth/github/callback`
6. **Backend procesa y establece sesión**
7. **Backend redirige de vuelta al frontend**
8. **Frontend verifica estado con:** `GET /api/user`
9. **Usuario queda autenticado**

---

## 🔧 Configuración requerida

### Variables de entorno del frontend:
```env
VITE_API_URL=http://localhost:8000/api/
```

### Configuración del backend:
- CORS configurado para aceptar requests del frontend
- Session cookies habilitadas
- GitHub OAuth app configurada

---

## 📝 Notas importantes

- **Session cookies:** El frontend está configurado para usar `credentials: 'include'`
- **Manejo de errores:** Incluido en todas las funciones de la API
- **Limpieza de URL:** El callback de OAuth limpia automáticamente los parámetros de la URL
- **Estado persistente:** El usuario permanece autenticado entre recargas de página

---

## 🚀 Próximos pasos

1. **Backend:** Implementar los 4 endpoints requeridos
2. **Testing:** Probar el flujo completo de autenticación
3. **Documentación:** Actualizar documentación de la API
4. **Tests:** Actualizar tests del frontend (cuando todo funcione)

---

## 📋 Commits realizados

1. **`feat: create OAuth authentication API`** - Nuevo archivo `src/api/authApi.ts`
2. **`feat: add auth endpoints to config`** - Actualización de `src/config.ts`
3. **`refactor: update UserContext for OAuth flow`** - Refactorización de `src/context/UserContext.tsx`
4. **`refactor: simplify useUser hook`** - Simplificación de `src/hooks/useUser.tsx`
5. **`fix: update HeaderComponent for async signOut`** - Actualización de `src/components/Layout/HeaderComponent.tsx`

---

## 🔍 Archivos modificados

- `src/api/authApi.ts` (nuevo)
- `src/config.ts`
- `src/context/UserContext.tsx`
- `src/hooks/useUser.tsx`
- `src/components/Layout/HeaderComponent.tsx`

---

## 📞 Contacto

Para dudas o consultas sobre esta migración, contactar al equipo de frontend. 