/**
 * Captura el token de OAuth del query string antes de que React se monte.
 * Esto previene race conditions con React Strict Mode que ejecuta efectos múltiples veces.
 *
 * Debe ser llamado ANTES de montar la aplicación React.
 */
export const captureAuthToken = (): void => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("auth_token", token);
    // Limpiar la URL para no exponer el token
    window.history.replaceState({}, "", window.location.pathname);
  }
};
