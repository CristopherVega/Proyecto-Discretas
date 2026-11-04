import { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'

export default function GrafoCluster({ nodos, aristas, arbol }) {
  const contenedor = useRef(null)

  useEffect(() => {
    const enArbol = new Set(arbol.map((e) => `${e.origen}-${e.destino}`))
    const cy = cytoscape({
      container: contenedor.current,
      elements: [
        ...nodos.map((id) => ({ data: { id } })),
        ...aristas.map((e) => ({
          data: { id: `${e.origen}-${e.destino}`, source: e.origen, target: e.destino, etiqueta: `${e.peso} ms` },
          classes: enArbol.has(`${e.origen}-${e.destino}`) ? 'arbol' : '',
        })),
      ],
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(id)', 'text-valign': 'center', color: '#fff', 'font-size': 11,
            'background-color': '#2563eb', width: 42, height: 42,
          },
        },
        {
          selector: 'edge',
          style: {
            label: 'data(etiqueta)', 'font-size': 10, color: '#6b7280', width: 1.5,
            'line-color': '#cbd5e1', 'text-background-color': '#fff', 'text-background-opacity': 1,
            'text-background-padding': 2, 'curve-style': 'bezier',
          },
        },
        { selector: 'edge.arbol', style: { 'line-color': '#16a34a', width: 4, color: '#166534' } },
      ],
      layout: { name: 'circle', padding: 30 },
      userZoomingEnabled: false,
    })
    return () => cy.destroy()
  }, [nodos, aristas, arbol])

  return (
    <div>
      <div ref={contenedor} className="grafo" />
      <p className="nota">
        <span className="leyenda verde" /> Árbol de expansión mínima <span className="leyenda gris" /> Otras conexiones
      </p>
    </div>
  )
}
