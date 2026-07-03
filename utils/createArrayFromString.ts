function createArrayFromString(str: string) {
  return str
    .split(/"\n\n/)
    .map((bloque) => bloque.trim())
    .filter(Boolean)
}

export default createArrayFromString
