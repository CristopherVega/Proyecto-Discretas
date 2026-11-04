export default function TablaMetricas({ filas }) {
  if (!filas || filas.length === 0) return <p className="nota">Todavía no hay resultados.</p>
  return (
    <div className="tabla-scroll">
      <table>
        <thead>
          <tr>
            <th>Peticiones (n)</th>
            <th>Latencia promedio (ms)</th>
            <th>Tasa de fallos</th>
            <th>Throughput (pet/s)</th>
            <th>Procesadas</th>
            <th>Descartadas</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.n}>
              <td>{f.n}</td>
              <td>{f.latenciaPromedio.toFixed(2)}</td>
              <td>{(f.tasaFallos * 100).toFixed(3)} %</td>
              <td>{f.throughput.toFixed(0)}</td>
              <td>{f.procesadas}</td>
              <td className={f.descartadas > 0 ? 'alerta' : ''}>{f.descartadas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
