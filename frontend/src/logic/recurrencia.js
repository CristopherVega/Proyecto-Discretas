// recurrencia.js — Tiempo de respuesta T(n) = a·T(n/b) + f(n)
// Aquí n es la cantidad de peticiones concurrentes que maneja un pod.

// Calcula T(n) de forma recursiva con memoización.
// f es una función de n (por ejemplo, n => c * n ** k) y T1 es el costo del caso base.
export function calcularT(n, a, b, f, T1 = 1, memo = new Map()) {
  n = Math.max(1, Math.floor(n))
  if (n <= 1) return T1
  if (memo.has(n)) return memo.get(n)
  const valor = a * calcularT(Math.floor(n / b), a, b, f, T1, memo) + f(n)
  memo.set(n, valor)
  return valor
}

// Genera puntos [{ n, T }] desde 1 hasta nMax para la gráfica.
export function generarSerie(nMax, a, b, f, T1 = 1, puntos = 30) {
  const memo = new Map()
  const serie = []
  let ultimo = 0
  for (let i = 1; i <= puntos; i++) {
    const n = Math.max(1, Math.round((nMax * i) / puntos))
    if (n === ultimo) continue
    ultimo = n
    serie.push({ n, T: Math.round(calcularT(n, a, b, f, T1, memo) * 100) / 100 })
  }
  return serie
}

function potencia(e) {
  if (Math.abs(e) < 1e-9) return '1'
  if (Math.abs(e - 1) < 1e-9) return 'n'
  return `n^${+e.toFixed(2)}`
}

// Teorema Maestro para f(n) = c·n^orden.
// Compara el orden de f(n) con log_b(a) y devuelve el caso y la cota asintótica.
export function casoMaestro(a, b, orden) {
  const critico = Math.log(a) / Math.log(b)
  const eps = 1e-9
  if (orden < critico - eps) {
    return { caso: 1, critico, cota: `Θ(${potencia(critico)})` }
  }
  if (Math.abs(orden - critico) <= eps) {
    const p = potencia(critico)
    return { caso: 2, critico, cota: p === '1' ? 'Θ(log n)' : `Θ(${p} log n)` }
  }
  return { caso: 3, critico, cota: `Θ(${potencia(orden)})` }
}
