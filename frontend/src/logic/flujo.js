// flujo.js — Ejecuta el flujo completo del diagrama (Figura 1 del informe)
import { calcularT, generarSerie, casoMaestro } from './recurrencia.js'
import { probFalloPods, probNoDisponible, superaLimite } from './riesgo.js'
import { kruskal, prim, densidad, latenciasRuta } from './grafo.js'
import { asignarPeticiones } from './asignador.js'
import { calcularMetricas, generarTablaPorCarga, funcionF } from './metricas.js'
import { errorModelo, calibrar } from './calibracion.js'

export const T1 = 0.02 // costo del caso base (ms)
export const TOLERANCIA = 0.1 // error aceptable al comparar con latencia real
export const CARGAS = [250, 500, 1000, 2000, 4000]

export function ejecutarFlujo(params, cluster, reales) {
  const { n, a, b, c, k, limiteRiesgo } = params
  const maxPods = cluster.pods.length
  const modelo = { a, b, c, k, T1 }
  const f = funcionF(modelo)

  // 1. Riesgo de fallo: si supera el límite, se refuerza la redundancia (N + 1)
  let N = Math.min(Math.max(1, Math.round(params.N)), maxPods)
  const iteraciones = []
  let riesgo
  for (;;) {
    const activos = cluster.pods.slice(0, N)
    riesgo = probFalloPods(activos, cluster.dependencias)
    const supera = superaLimite(riesgo, limiteRiesgo)
    iteraciones.push({ N, riesgo, supera })
    if (!supera || N >= maxPods) break
    N += 1
  }
  const podsActivos = cluster.pods.slice(0, N)
  const noLogrado = superaLimite(riesgo, limiteRiesgo)
  const noDisponibles = podsActivos.map((p) => ({ pod: p.id, prob: probNoDisponible(p, cluster.dependencias) }))

  // 2. Tiempo de respuesta T(n) con las peticiones que le tocan a cada pod
  const nPorPod = Math.ceil(n / N)
  const T = calcularT(nPorPod, a, b, f, T1)
  const maestro = casoMaestro(a, b, k)
  const serie = generarSerie(Math.max(5000, nPorPod), a, b, f, T1)

  // 3. Grafo de latencias y árbol de expansión mínima
  const ids = podsActivos.map((p) => p.id)
  const aristas = cluster.aristas.filter((e) => ids.includes(e.origen) && ids.includes(e.destino))
  const arbolKruskal = kruskal(ids, aristas)
  const arbolPrim = prim(ids, aristas)
  const dens = densidad(ids, aristas)
  const rutas = latenciasRuta(arbolKruskal, ids[0])

  // 4. Asignación y métricas
  const asignacion = asignarPeticiones(n, podsActivos, rutas)
  const metricas = calcularMetricas(asignacion, riesgo, modelo)
  const tabla = generarTablaPorCarga(CARGAS, { pods: podsActivos, rutas, riesgo, params: modelo })

  // 5. Calibración con latencias reales
  const error = errorModelo(modelo, reales)
  const coincide = error <= TOLERANCIA
  const ajuste = coincide ? null : calibrar(reales, modelo, TOLERANCIA)

  return {
    N, iteraciones, riesgo, noLogrado, noDisponibles,
    nPorPod, T, maestro, serie,
    ids, aristas, arbolKruskal, arbolPrim, densidad: dens,
    asignacion, metricas, tabla,
    calibracion: { error, coincide, ajuste },
  }
}
