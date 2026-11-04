// asignador.js — Reparto de peticiones entre los pods
// Regla: cada pod recibe una parte proporcional a capacidad × (1 − probFallo).
// El sobrante por redondeo se da a los pods con mayor parte decimal (método del mayor resto);
// en empate gana el pod con menor latencia de ruta.

export function asignarPeticiones(n, pods, rutas = {}) {
  n = Math.max(0, Math.round(n))
  const pesos = pods.map((p) => p.capacidad * (1 - p.probFallo))
  const total = pesos.reduce((s, w) => s + w, 0)
  const partes = pods.map((p, i) => {
    const exacto = (n * pesos[i]) / total
    return { pod: p.id, capacidad: p.capacidad, ruta: rutas[p.id] ?? 0, base: Math.floor(exacto), resto: exacto - Math.floor(exacto) }
  })
  let faltan = n - partes.reduce((s, p) => s + p.base, 0)
  const orden = [...partes].sort((x, y) => y.resto - x.resto || x.ruta - y.ruta)
  for (let i = 0; faltan > 0; i = (i + 1) % orden.length, faltan--) orden[i].base += 1
  return partes.map(({ pod, capacidad, ruta, base }) => ({ pod, capacidad, ruta, peticiones: base }))
}
