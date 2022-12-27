const round = (number: number | undefined | null, decimalCount: number = 2) => {
  if(number === undefined || number === null) return

  const decimal = 10 ** decimalCount
  return Math.round(number * decimal) / decimal
}

export default round