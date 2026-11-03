// ============================================================
// PanelParametros.jsx — Formulario con los datos de entrada
// ============================================================
// PROPS : valores (objeto con n, N, a, b, c, limiteRiesgo), onCambio(nuevosValores)
//
// PASOS
// 1. Crear un input numérico para cada parámetro: n, N, a, b, coeficiente de f(n), límite de riesgo.
// 2. Validar: n > 0, N >= 1, a >= 1, b > 1, límite entre 0 y 1.
// 3. Al cambiar un campo, llamar onCambio con el objeto actualizado.
// 4. Agregar un botón "Calcular" y otro "Restablecer".
// 5. Mostrar mensajes de error debajo del campo inválido.

export default function PanelParametros({ valores, onCambio }) {
  return <div>{/* TODO */}</div>
}
