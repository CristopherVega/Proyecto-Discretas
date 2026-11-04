// grafo.js — Árbol de expansión mínima (Kruskal y Prim)
// aristas: [{ origen, destino, peso }] con peso = latencia en ms

export class UnionFind {
  constructor(elementos) {
    this.padre = new Map(elementos.map((e) => [e, e]))
  }
  find(x) {
    while (this.padre.get(x) !== x) {
      this.padre.set(x, this.padre.get(this.padre.get(x)))
      x = this.padre.get(x)
    }
    return x
  }
  union(a, b) {
    const ra = this.find(a)
    const rb = this.find(b)
    if (ra === rb) return false
    this.padre.set(ra, rb)
    return true
  }
}

function resultado(nodos, elegidas) {
  return {
    aristas: elegidas,
    costoTotal: elegidas.reduce((s, e) => s + e.peso, 0),
    conectado: elegidas.length === Math.max(0, nodos.length - 1),
  }
}

export function kruskal(nodos, aristas) {
  const uf = new UnionFind(nodos)
  const elegidas = []
  const ordenadas = [...aristas].sort((x, y) => x.peso - y.peso)
  for (const e of ordenadas) {
    if (uf.union(e.origen, e.destino)) elegidas.push(e)
    if (elegidas.length === nodos.length - 1) break
  }
  return resultado(nodos, elegidas)
}

export function prim(nodos, aristas) {
  if (nodos.length === 0) return resultado(nodos, [])
  const visitados = new Set([nodos[0]])
  const elegidas = []
  while (visitados.size < nodos.length) {
    let mejor = null
    for (const e of aristas) {
      const a = visitados.has(e.origen)
      const b = visitados.has(e.destino)
      if (a !== b && (!mejor || e.peso < mejor.peso)) mejor = e
    }
    if (!mejor) break // grafo desconectado
    elegidas.push(mejor)
    visitados.add(visitados.has(mejor.origen) ? mejor.destino : mejor.origen)
  }
  return resultado(nodos, elegidas)
}

// Densidad = 2E / (V(V-1)). Cerca de 1 es denso (conviene Prim); cerca de 0 es disperso (Kruskal).
export function densidad(nodos, aristas) {
  const v = nodos.length
  return v < 2 ? 0 : (2 * aristas.length) / (v * (v - 1))
}

// Latencia acumulada desde la raíz hasta cada nodo, siguiendo solo las aristas del árbol.
export function latenciasRuta(arbol, raiz) {
  const ady = new Map()
  for (const e of arbol.aristas) {
    if (!ady.has(e.origen)) ady.set(e.origen, [])
    if (!ady.has(e.destino)) ady.set(e.destino, [])
    ady.get(e.origen).push([e.destino, e.peso])
    ady.get(e.destino).push([e.origen, e.peso])
  }
  const dist = { [raiz]: 0 }
  const cola = [raiz]
  while (cola.length) {
    const actual = cola.shift()
    for (const [vecino, peso] of ady.get(actual) || []) {
      if (!(vecino in dist)) {
        dist[vecino] = dist[actual] + peso
        cola.push(vecino)
      }
    }
  }
  return dist
}
