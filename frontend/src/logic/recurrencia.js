// ============================================================
// recurrencia.js — Tiempo de respuesta T(n) = a·T(n/b) + f(n)
// ============================================================
// ENTRADAS : n (peticiones concurrentes), a, b, f (función de n),
//            T1 (costo del caso base, por ejemplo 1)
// SALIDA   : valor de T(n) y el caso del Teorema Maestro
//
// PASOS
// 1. Escribir calcularT(n, a, b, f, T1) de forma recursiva.
//    - Caso base: si n <= 1, devolver T1.
//    - Caso recursivo: a * calcularT(n / b, ...) + f(n).
//    - Usar Math.floor o Math.ceil en n / b (decidan cuál y úsenlo igual en todo el proyecto).
// 2. Guardar resultados ya calculados en un Map (memoización) para que no se repitan.
// 3. Escribir generarSerie(nMax, a, b, f, T1): devuelve [{ n, T }] para la gráfica.
// 4. Escribir casoMaestro(a, b, orden): compara el orden de f(n) (por ejemplo, orden = 1 si f(n) = n)
//    con log_b(a) y devuelve { caso: 1 | 2 | 3, cota: "Θ(...)" }.
//    - orden < log_b(a)  -> caso 1, Θ(n^log_b(a))
//    - orden = log_b(a)  -> caso 2, Θ(n^log_b(a) · log n)
//    - orden > log_b(a)  -> caso 3, Θ(f(n)) (si se cumple la regularidad)
// 5. Probar con a=2, b=2, f(n)=n: debe dar caso 2 y Θ(n log n).

export function calcularT(n, a, b, f, T1 = 1, memo = new Map()) {
  // TODO
}

export function generarSerie(nMax, a, b, f, T1 = 1) {
  // TODO
}

export function casoMaestro(a, b, orden) {
  // TODO
}
