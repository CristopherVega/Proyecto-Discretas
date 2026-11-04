// riesgo.js — Probabilidad de fallo simultáneo con inclusión-exclusión

// Todas las combinaciones de k elementos de arr.
export function combinaciones(arr, k) {
  if (k === 0) return [[]]
  if (arr.length < k) return []
  const [primero, ...resto] = arr
  const con = combinaciones(resto, k - 1).map((c) => [primero, ...c])
  const sin = combinaciones(resto, k)
  return [...con, ...sin]
}

// P(A1 ∩ ... ∩ Ak) si los eventos son independientes.
export function probInterseccion(eventos) {
  return eventos.reduce((acc, e) => acc * e.p, 1)
}

// P(A1 ∪ ... ∪ Am) = Σ (-1)^(k+1) · Σ P(intersecciones de k eventos)
export function probUnion(eventos) {
  if (eventos.length > 20) throw new Error('Demasiados eventos para inclusión-exclusión')
  let total = 0
  for (let k = 1; k <= eventos.length; k++) {
    const signo = k % 2 === 1 ? 1 : -1
    for (const comb of combinaciones(eventos, k)) {
      total += signo * probInterseccion(comb)
    }
  }
  return total
}

// Probabilidad de que un pod no esté disponible: falla por su cuenta o falla
// alguna dependencia de la que depende (unión de eventos, por inclusión-exclusión).
export function probNoDisponible(pod, dependencias) {
  const eventos = [{ p: pod.probFallo }]
  for (const d of dependencias) {
    if (d.pods.includes(pod.id)) eventos.push({ p: d.probFallo })
  }
  return probUnion(eventos)
}

// Probabilidad de que el sistema quede sin servicio (todos los pods activos caídos),
// considerando dependencias compartidas. Se condiciona sobre qué dependencias fallan.
// Con dos pods que comparten una dependencia D da: P(D) + P(F1)P(F2) − P(D)P(F1)P(F2).
export function probFalloPods(pods, dependencias) {
  if (pods.length === 0) return 1
  const ids = new Set(pods.map((p) => p.id))
  const deps = dependencias
    .map((d) => ({ p: d.probFallo, afecta: d.pods.filter((id) => ids.has(id)) }))
    .filter((d) => d.afecta.length > 0)
  let total = 0
  for (let mask = 0; mask < 1 << deps.length; mask++) {
    let pEstado = 1
    const caidos = new Set()
    deps.forEach((d, j) => {
      if (mask & (1 << j)) {
        pEstado *= d.p
        d.afecta.forEach((id) => caidos.add(id))
      } else {
        pEstado *= 1 - d.p
      }
    })
    const pTodosCaidos = pods.reduce((acc, pod) => acc * (caidos.has(pod.id) ? 1 : pod.probFallo), 1)
    total += pEstado * pTodosCaidos
  }
  return total
}

export function superaLimite(prob, limite) {
  return prob > limite
}
