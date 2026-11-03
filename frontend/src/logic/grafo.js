// ============================================================
// grafo.js — Árbol de expansión mínima (Kruskal y Prim)
// ============================================================
// ENTRADAS : nodos: ["pod1", "pod2", ...]
//            aristas: [{ origen, destino, peso }]  (peso = latencia en ms)
// SALIDA   : { aristas: [...], costoTotal }
//
// PASOS
// 1. Escribir la clase UnionFind (find y union) para detectar ciclos.
// 2. kruskal(nodos, aristas):
//    - Ordenar las aristas por peso de menor a mayor.
//    - Recorrer: si origen y destino están en conjuntos distintos, agregar la arista y unirlos.
//    - Parar cuando haya (nodos - 1) aristas.
// 3. prim(nodos, aristas):
//    - Empezar en un nodo cualquiera.
//    - Repetir: elegir la arista más barata que conecte el árbol con un nodo nuevo.
//    - Parar cuando todos los nodos estén en el árbol.
// 4. Escribir densidad(nodos, aristas) = 2·E / (V·(V-1)); sirve para explicar cuál conviene.
// 5. Validar que ambos algoritmos den el mismo costoTotal en el mismo grafo.
// 6. Manejar el caso de grafo desconectado (devolver un aviso o un bosque).

export class UnionFind {
  // TODO
}

export function kruskal(nodos, aristas) {
  // TODO
}

export function prim(nodos, aristas) {
  // TODO
}

export function densidad(nodos, aristas) {
  // TODO
}
