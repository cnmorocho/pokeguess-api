export function obtenerElementoAleatorio<T>(lista: Array<T>): T {
    return lista[Math.floor(Math.random() * lista.length + 1)]
}
