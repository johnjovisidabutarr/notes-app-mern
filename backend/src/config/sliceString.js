export const sliceString = (content) => {
  const N = 80
  const spaceTotal = Math.ceil(content.length / N)
  let newContent = ''
  let start = 0
  let end = N
  for (let i = 0; i < spaceTotal; i++) {
    newContent += content.slice(start, end) + ' '
    start += N
    end += N
  }

  return newContent
}
