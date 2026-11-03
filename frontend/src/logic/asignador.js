// ============================================================
// asignador.js — Reparto de peticiones entre los pods
// ============================================================
// ENTRADAS : n (peticiones), pods (con capacidad y probabilidad de fallo),
//            arbol (resultado de kruskal/prim)
// SALIDA   : [{ pod, peticiones }]
//
// PASOS
// 1. Definir la regla de reparto y anotarla en el informe (por ejemplo, proporcional a la
//    capacidad, o menos carga a los pods con más riesgo).
// 2. Calcular el peso de cada pod: capacidad * (1 - probFallo).
// 3. Repartir n según esos pesos; el sobrante por redondeo va al pod con menor latencia.
// 4. Usar el árbol para elegir la ruta de menor latencia desde el balanceador hasta cada pod.
// 5. Verificar que la suma de peticiones asignadas sea exactamente n.

export function asignarPeticiones(n, pods, arbol) {
  // TODO
}
