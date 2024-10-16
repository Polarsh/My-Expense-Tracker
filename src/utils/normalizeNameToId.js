// Función para normalizar un nombre y convertirlo en un id adecuado
export function normalizeNameToId(name) {
  return name
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios en blanco al principio y al final
    .replace(/\s+/g, '-') // Reemplazar espacios en blanco con guiones
    .replace(/[^a-z0-9-]/g, '') // Eliminar caracteres no alfanuméricos excepto guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones consecutivos con uno solo
}

// Ejemplo de uso
// const normalizedId = normalizeNameToId('Nueva Empresa S.A.')
// console.log(normalizedId) // 'nueva-empresa-sa'
