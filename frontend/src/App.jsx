import { useMemo, useState } from 'react'
import cluster from './data/cluster.json'
import reales from './data/latenciasReales.json'
import { ejecutarFlujo, TOLERANCIA } from './logic/flujo.js'
import PanelParametros from './components/PanelParametros.jsx'
import GraficaT from './components/GraficaT.jsx'
import GrafoCluster from './components/GrafoCluster.jsx'
import TablaMetricas from './components/TablaMetricas.jsx'
import Tabla from './components/Tabla.jsx'

const PARAMS_INICIALES = { n: 1000, N: 2, a: 2, b: 2, c: 0.012, k: 1, limiteRiesgo: 0.0005 }
const pct = (x, d = 3) => `${(x * 100).toFixed(d)} %`

export default function App() {
  const [params, setParams] = useState(PARAMS_INICIALES)
  const r = useMemo(() => ejecutarFlujo(params, cluster, reales), [params])
  const { calibracion } = r

  return (
    <main className="contenedor">
      <header>
        <h1>Balanceador de carga en microservicios</h1>
        <p>Modelo con recurrencias, inclusión-exclusión y árbol de expansión mínima.</p>
      </header>

      <div className="layout">
        <PanelParametros valores={params} inicial={PARAMS_INICIALES} maxPods={cluster.pods.length} onCambio={setParams} />

        <div className="resultados">
          <section className="card">
            <h2>1. Tiempo de respuesta T(n)</h2>
            <p>
              Con <strong>{r.N}</strong> pods, cada uno recibe unas <strong>{r.nPorPod}</strong> peticiones y
              T({r.nPorPod}) ≈ <strong>{r.T.toFixed(2)} ms</strong>.
            </p>
            <GraficaT serie={r.serie} reales={reales} cota={r.maestro.cota} caso={r.maestro.caso} />
          </section>

          <section className="card">
            <h2>2. Riesgo de fallo (inclusión-exclusión)</h2>
            <Tabla
              columnas={[
                { titulo: 'Pods (N)', valor: (f) => f.N },
                { titulo: 'Riesgo de caída total', valor: (f) => pct(f.riesgo, 4) },
                { titulo: '¿Supera el límite?', valor: (f) => (f.supera ? 'Sí → reforzar redundancia' : 'No') },
              ]}
              filas={r.iteraciones}
              claseFila={(f) => (f.supera ? 'alerta' : 'ok')}
            />
            <p className="nota">
              {r.noLogrado
                ? `Con los ${cluster.pods.length} pods disponibles no se logra bajar del límite: las dependencias compartidas dominan el riesgo.`
                : `Riesgo final con ${r.N} pods: ${pct(r.riesgo, 4)}.`}
            </p>
            <Tabla
              columnas={[
                { titulo: 'Pod', valor: (f) => f.pod },
                { titulo: 'Probabilidad de no estar disponible', valor: (f) => pct(f.prob, 3) },
              ]}
              filas={r.noDisponibles}
            />
          </section>

          <section className="card">
            <h2>3. Árbol de menor latencia</h2>
            <GrafoCluster nodos={r.ids} aristas={r.aristas} arbol={r.arbolKruskal.aristas} />
            <p>
              Costo total — Kruskal: <strong>{r.arbolKruskal.costoTotal} ms</strong>, Prim:{' '}
              <strong>{r.arbolPrim.costoTotal} ms</strong>. Densidad del grafo: <strong>{r.densidad.toFixed(2)}</strong>{' '}
              ({r.densidad > 0.5 ? 'denso: conviene Prim' : 'disperso: conviene Kruskal'}).
            </p>
          </section>

          <section className="card">
            <h2>4. Asignación de peticiones</h2>
            <Tabla
              columnas={[
                { titulo: 'Pod', valor: (f) => f.pod },
                { titulo: 'Peticiones', valor: (f) => f.peticiones },
                { titulo: 'Capacidad', valor: (f) => f.capacidad },
                { titulo: 'Latencia de ruta (ms)', valor: (f) => f.ruta },
              ]}
              filas={r.asignacion}
              claseFila={(f) => (f.peticiones > f.capacidad ? 'alerta' : '')}
            />
          </section>

          <section className="card">
            <h2>5. Métricas</h2>
            <div className="metricas">
              <div><span>Latencia promedio</span><strong>{r.metricas.latenciaPromedio.toFixed(2)} ms</strong></div>
              <div><span>Tasa de fallos</span><strong>{pct(r.metricas.tasaFallos)}</strong></div>
              <div><span>Throughput</span><strong>{r.metricas.throughput.toFixed(0)} pet/s</strong></div>
              <div><span>Procesadas</span><strong>{r.metricas.procesadas}</strong></div>
            </div>
            <h3>Comportamiento según la carga</h3>
            <TablaMetricas filas={r.tabla} />
          </section>

          <section className="card">
            <h2>6. Calibración con datos reales</h2>
            <p>
              Error del modelo frente a la latencia real: <strong>{pct(calibracion.error, 1)}</strong> (tolerancia{' '}
              {pct(TOLERANCIA, 0)}).{' '}
              {calibracion.coincide ? 'El modelo coincide: queda calibrado.' : 'No coincide: hay que ajustar a, b y c.'}
            </p>
            {calibracion.ajuste && (
              <div>
                <p>
                  Ajuste sugerido: a = {calibracion.ajuste.a}, b = {calibracion.ajuste.b}, c = {calibracion.ajuste.c}{' '}
                  (error {pct(calibracion.ajuste.error, 1)}).
                </p>
                <button
                  onClick={() =>
                    setParams({ ...params, a: calibracion.ajuste.a, b: calibracion.ajuste.b, c: calibracion.ajuste.c })
                  }
                >
                  Aplicar calibración
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
