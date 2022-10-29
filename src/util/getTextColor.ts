function hexToDec (hexString: string): number {
  const decString = (hexString).replace(/[^a-f0-9]/gi, '')

  return parseInt(decString, 16)
}

function hex3ToHex6 (color: string): string {
  const isHex = /^#(([0-9a-f]{2}){3}|([0-9a-f]{2}){4}|([0-9a-f]){3})$/i
  if (!isHex.test(color)) return '#ffffff'
  if (color.length === 4) return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
  return color
}

export function getContrastValue (backgroundColor: string): number {
  backgroundColor = hex3ToHex6(backgroundColor)
  const red = hexToDec(backgroundColor.substring(1, 3))
  const green = hexToDec(backgroundColor.substring(3, 5))
  const blue = hexToDec(backgroundColor.substring(5, 7))

  return Math.sqrt(
    red * red * 0.241 +
    green * green * 0.691 +
    blue * blue * 0.068
  )
}

export default function getTextColor (backgroundColor: string): string {
  backgroundColor = hex3ToHex6(backgroundColor)
  const contrast = getContrastValue(backgroundColor)

  let fontColor = '#ffffff'
  if (contrast > 190) {
    fontColor = '#000000'
  }

  return fontColor
}
