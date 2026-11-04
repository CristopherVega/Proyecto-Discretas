// metricas.js — Métricas del sistema después del reparto
import { calcularT } from './recurrencia.js'
import { asignarPeticiones } from './asignador.js'

// params: { a, b, c, k, T1 }  ->  f(n) = c·n^k
export function funcionF(params) {
  return (n) => params.c * n ** params.k
}

export function calcularMetricas(asignacion, riesgoSistema, params) {
  const f = funcionF(params)
  const memo = new Map()
  let totalPeticiones = 0
  let suma = 0
  let procesadas = 0
  let descartadas = 0
  let tiempoTotal = 0
  const porPod = asignacion.map((a) => {
    const t = a.ruta + calcularT(a.peticiones, params.a, params.b, f, params.T1, memo)
    const atendidas = Math.min(a.peticiones, a.capacidad)
    totalPeticiones += a.peticiones
    suma += a.peticiones * t
    procesadas += atendidas
    descartadas += a.peticiones - atendidas
    tiempoTotal = Math.max(tiempoTotal, t)
    return { pod: a.pod, tiempo: t }
  })
  const fracDescartadas = totalPeticiones ? descartadas / totalPeticiones : 0
  return {
    latenciaPromedio: totalPeticiones ? suma / totalPeticiones : 0,
    tasaFallos: fracDescartadas + (1 - fracDescartadas) * riesgoSistema,
    throughput: tiempoTotal ? procesadas / (tiempoTotal / 1000) : 0,
    procesadas,
    descartadas,
    tiempoTotal,
    porPod,
  }
}

// Repite el cálculo para varios valores de n (distintas cargas).
export function generarTablaPorCarga(listaDeN, config) {
  return listaDeN.map((n) => {
    const asignacion = asignarPeticiones(n, config.pods, config.rutas)
    const m = calcularMetricas(asignacion, config.riesgo, config.params)
    return { n, ...m }
  })
}
