const toCamelCase = (text: string, split: string = ' ') => {
  return text
    .split(split)
    .map((word, i) => `${i === 0 ? word[0].toLowerCase() : word[0].toUpperCase()}${word.slice(1)}`)
    .join('')
}

export default toCamelCase