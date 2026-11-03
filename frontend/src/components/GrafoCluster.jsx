// ============================================================
// GrafoCluster.jsx — Dibujo del clúster y del árbol de menor latencia
// ============================================================
// PROPS : nodos, aristas, arbol (aristas del árbol de expansión mínima)
//
// PASOS
// 1. Crear un div contenedor y obtener una referencia con useRef.
// 2. En useEffect, iniciar Cytoscape con los nodos y las aristas (la etiqueta de la arista es la latencia).
// 3. Estilo: aristas del árbol en un color resaltado y las demás en gris.
// 4. Elegir un layout (por ejemplo, "circle" o "cose").
// 5. Destruir la instancia en la función de limpieza del useEffect.
// 6. Volver a dibujar cuando cambien nodos, aristas o arbol.

export default function GrafoCluster({ nodos, aristas, arbol }) {
  return <div>{/* TODO */}</div>
}
