// ============================================================
// metricas.js — Métricas del sistema después del reparto
// ============================================================
// ENTRADAS : asignacion (salida de asignador), arbol, pods, T(n)
// SALIDA   : { latenciaPromedio, tasaFallos, throughput, procesadas }
//
// PASOS
// 1. latenciaPromedio: promedio ponderado por peticiones de (latencia de la ruta + T parcial).
// 2. tasaFallos: probabilidad de fallo del sistema (usar riesgo.js).
// 3. throughput: peticiones procesadas / tiempo total estimado.
// 4. procesadas: peticiones asignadas menos las esperadas con fallo.
// 5. generarTablaPorCarga(listaDeN): repetir los pasos para varios valores de n
//    (así se ve el comportamiento ante distintas cargas).

export function calcularMetricas(asignacion, arbol, pods, tiempoT) {
  // TODO
}

export function generarTablaPorCarga(listaDeN, config) {
  // TODO
}
