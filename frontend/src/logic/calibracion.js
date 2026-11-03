// ============================================================
// calibracion.js — Ajuste de a, b y f(n) con datos reales
// ============================================================
// ENTRADAS : latenciasReales: [{ n, latencia }], parámetros iniciales
// SALIDA   : { a, b, c, error }  (f(n) = c·n por ejemplo)
//
// PASOS
// 1. Definir el error: error cuadrático medio entre T(n) simulado y la latencia real.
// 2. Probar una malla de valores (a, b, c) y quedarse con el que dé menor error.
// 3. Definir la tolerancia (por ejemplo, error < 10 %) para la decisión "¿coincide con la latencia real?".
// 4. Devolver los parámetros ajustados y el error, para volver a calcular T(n).
// 5. Anotar en el informe de dónde salen los datos "reales" (medidos o simulados).

export function errorModelo(params, latenciasReales) {
  // TODO
}

export function calibrar(latenciasReales, paramsIniciales, tolerancia) {
  // TODO
}
