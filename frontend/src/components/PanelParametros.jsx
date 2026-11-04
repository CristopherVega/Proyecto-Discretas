import { useEffect, useState } from 'react'

const CAMPOS = [
  { id: 'n', etiqueta: 'Peticiones concurrentes (n)', paso: 1 },
  { id: 'N', etiqueta: 'Pods iniciales (N)', paso: 1 },
  { id: 'a', etiqueta: 'Subproblemas (a)', paso: 1 },
  { id: 'b', etiqueta: 'Factor de división (b)', paso: 0.5 },
  { id: 'c', etiqueta: 'Coeficiente de f(n) (c)', paso: 0.001 },
  { id: 'k', etiqueta: 'Exponente de f(n) (k)', paso: 0.5 },
  { id: 'limiteRiesgo', etiqueta: 'Límite de riesgo aceptable', paso: 0.0001 },
]

function validar(v, maxPods) {
  const e = {}
  if (!(v.n >= 1)) e.n = 'Debe ser al menos 1'
  if (!(v.N >= 1 && v.N <= maxPods)) e.N = `Entre 1 y ${maxPods}`
  if (!(v.a >= 1)) e.a = 'Debe ser al menos 1'
  if (!(v.b > 1)) e.b = 'Debe ser mayor que 1'
  if (!(v.c > 0)) e.c = 'Debe ser mayor que 0'
  if (!(v.k >= 0)) e.k = 'No puede ser negativo'
  if (!(v.limiteRiesgo >= 0 && v.limiteRiesgo <= 1)) e.limiteRiesgo = 'Entre 0 y 1'
  return e
}

const aTexto = (v) => Object.fromEntries(Object.entries(v).map(([k, x]) => [k, String(x)]))
const aNumeros = (t) => Object.fromEntries(Object.entries(t).map(([k, x]) => [k, x === '' ? NaN : Number(x)]))

export default function PanelParametros({ valores, inicial, maxPods, onCambio }) {
  const [texto, setTexto] = useState(aTexto(valores))
  useEffect(() => setTexto(aTexto(valores)), [valores])

  const errores = validar(aNumeros(texto), maxPods)
  const hayErrores = Object.keys(errores).length > 0

  return (
    <section className="card">
      <h2>Parámetros</h2>
      {CAMPOS.map((c) => (
        <label key={c.id} className="campo">
          <span>{c.etiqueta}</span>
          <input
            type="number"
            step={c.paso}
            value={texto[c.id]}
            onChange={(e) => setTexto({ ...texto, [c.id]: e.target.value })}
          />
          {errores[c.id] && <small className="error">{errores[c.id]}</small>}
        </label>
      ))}
      <div className="botones">
        <button disabled={hayErrores} onClick={() => onCambio(aNumeros(texto))}>Calcular</button>
        <button className="secundario" onClick={() => onCambio(inicial)}>Restablecer</button>
      </div>
    </section>
  )
}
