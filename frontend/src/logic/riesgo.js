// ============================================================
// riesgo.js — Probabilidad de fallo simultáneo (inclusión-exclusión)
// ============================================================
// ENTRADAS : lista de eventos con su probabilidad, p. ej. [{ id: "D", p: 0.001 }, ...]
//            Se asume independencia entre eventos.
// SALIDA   : P(A1 ∪ A2 ∪ ... ∪ Am)
//
// PASOS
// 1. Escribir combinaciones(arr, k): todas las combinaciones de k elementos.
// 2. Escribir probInterseccion(eventos): con independencia, es el producto de las p.
// 3. Escribir probUnion(eventos):
//    - Para k = 1..m: sumar o restar (según k sea impar o par) la P de cada
//      intersección de k eventos.
//    - Signo: (-1)^(k+1).
// 4. Escribir probFalloPods(pods, dependencias): construye los eventos
//    "falla D" y "fallan F1 y F2 a la vez" y llama a probUnion.
// 5. Escribir superaLimite(prob, limite): true si prob > limite (decisión del diagrama).
// 6. Probar con el ejemplo: P(D)=0.001, P(F1)=P(F2)=0.01 -> debe dar ≈ 0.0011.

export function combinaciones(arr, k) {
  // TODO
}

export function probInterseccion(eventos) {
  // TODO
}

export function probUnion(eventos) {
  // TODO
}

export function probFalloPods(pods, dependencias) {
  // TODO
}

export function superaLimite(prob, limite) {
  // TODO
}
