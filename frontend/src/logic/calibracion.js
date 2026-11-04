// calibracion.js — Ajuste de a, b y c comparando con latencias reales
import { calcularT } from './recurrencia.js'
import { funcionF } from './metricas.js'

// Error porcentual absoluto medio entre el modelo y las latencias reales.
export function errorModelo(params, latenciasReales) {
  const f = funcionF(params)
  const memo = new Map()
  let suma = 0
  for (const r of latenciasReales) {
    const t = calcularT(r.n, params.a, params.b, f, params.T1, memo)
    suma += Math.abs(t - r.latencia) / r.latencia
  }
  return suma / latenciasReales.length
}

// Busca en una malla los valores de a, b y c con menor error.
export function calibrar(latenciasReales, paramsIniciales, tolerancia = 0.1) {
  const errorInicial = errorModelo(paramsIniciales, latenciasReales)
  let mejor = { ...paramsIniciales, error: errorInicial }
  const valoresA = [1, 2, 3, 4]
  const valoresB = [1.5, 2, 3, 4]
  const valoresC = Array.from({ length: 80 }, (_, i) => 0.0005 * Math.pow(1.09, i))
  for (const a of valoresA) {
    for (const b of valoresB) {
      for (const c of valoresC) {
        const p = { ...paramsIniciales, a, b, c }
        const error = errorModelo(p, latenciasReales)
        if (error < mejor.error) mejor = { ...p, error }
      }
    }
  }
  return {
    a: mejor.a,
    b: mejor.b,
    c: +mejor.c.toPrecision(3),
    error: mejor.error,
    errorInicial,
    coincide: mejor.error <= tolerancia,
  }
}
