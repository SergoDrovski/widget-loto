export function shuffle(array) {
  let currentIndex = array.length

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

export const arrayNumbers = (length, slice) => {
  const array = []
  for (let i = 1; i <= length; i++) {
    array.push(i)
  }
  shuffle(array)
  return array.slice(0, slice)
}
