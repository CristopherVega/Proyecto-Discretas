// Tabla genérica: columnas = [{ titulo, valor: (fila) => ... }]
export default function Tabla({ columnas, filas, claseFila }) {
    return (
        <div className="tabla-scroll">
            <table>
                <thead>
                    <tr>{columnas.map((c) => <th key={c.titulo}>{c.titulo}</th>)}</tr>
                </thead>
                <tbody>
                    {filas.map((f, i) => (
                        <tr key={i} className={claseFila ? claseFila(f) : ''}>
                            {columnas.map((c) => <td key={c.titulo}>{c.valor(f)}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
