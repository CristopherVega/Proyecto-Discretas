// Gráfica en SVG puro (sin librerías): T(n) del modelo (línea) y latencia real (puntos).
const W = 700
const H = 320
const M = { izq: 60, der: 20, arr: 20, aba: 50 }

function ticks(max, cuantos = 5) {
  return Array.from({ length: cuantos + 1 }, (_, i) => (max * i) / cuantos)
}

export default function GraficaT({ serie, reales, cota, caso }) {
  const nMax = Math.max(...serie.map((p) => p.n), ...reales.map((p) => p.n))
  const yMax = Math.max(...serie.map((p) => p.T), ...reales.map((p) => p.latencia)) * 1.05
  const x = (n) => M.izq + (n / nMax) * (W - M.izq - M.der)
  const y = (v) => H - M.aba - (v / yMax) * (H - M.aba - M.arr)
  const linea = serie.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.n).toFixed(1)},${y(p.T).toFixed(1)}`).join(' ')

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Gráfica de T(n) contra la latencia real">
        {ticks(yMax).map((v) => (
          <g key={`y${v}`}>
            <line x1={M.izq} x2={W - M.der} y1={y(v)} y2={y(v)} stroke="#e5e7eb" />
            <text x={M.izq - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6b7280">{Math.round(v)}</text>
          </g>
        ))}
        {ticks(nMax).map((v) => (
          <g key={`x${v}`}>
            <line x1={x(v)} x2={x(v)} y1={M.arr} y2={H - M.aba} stroke="#f3f4f6" />
            <text x={x(v)} y={H - M.aba + 18} textAnchor="middle" fontSize="11" fill="#6b7280">{Math.round(v)}</text>
          </g>
        ))}
        <line x1={M.izq} x2={W - M.der} y1={H - M.aba} y2={H - M.aba} stroke="#9ca3af" />
        <line x1={M.izq} x2={M.izq} y1={M.arr} y2={H - M.aba} stroke="#9ca3af" />
        <text x={(M.izq + W - M.der) / 2} y={H - 8} textAnchor="middle" fontSize="12" fill="#374151">Peticiones por pod (n)</text>
        <text transform={`translate(14 ${(M.arr + H - M.aba) / 2}) rotate(-90)`} textAnchor="middle" fontSize="12" fill="#374151">Tiempo (ms)</text>
        <path d={linea} fill="none" stroke="#2563eb" strokeWidth="2" />
        {reales.map((p) => (
          <circle key={p.n} cx={x(p.n)} cy={y(p.latencia)} r="4.5" fill="#dc2626">
            <title>{`n = ${p.n}: ${p.latencia} ms (real)`}</title>
          </circle>
        ))}
        <g fontSize="12" fill="#374151">
          <line x1={W - 270} x2={W - 246} y1={22} y2={22} stroke="#2563eb" strokeWidth="2" />
          <text x={W - 240} y={26}>T(n) del modelo</text>
          <circle cx={W - 115} cy={22} r="4.5" fill="#dc2626" />
          <text x={W - 105} y={26}>Real</text>
        </g>
      </svg>
      <p className="nota">
        Teorema Maestro: caso {caso} → <strong>{cota}</strong>
      </p>
    </div>
  )
}