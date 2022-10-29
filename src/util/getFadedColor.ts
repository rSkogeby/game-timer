import tinycolor from 'tinycolor2'

import getTextColor from './getTextColor'

export default function getFadedColor (backgroundColor: string): string {
  return getTextColor(backgroundColor) === '#ffffff'
    ? tinycolor(backgroundColor).brighten(40).toHexString()
    : tinycolor(backgroundColor).darken(40).toHexString()
}
