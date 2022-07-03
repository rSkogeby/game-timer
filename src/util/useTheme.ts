import tinycolor from 'tinycolor2'

type OpaqueColor = string

interface PaletteColor {
  dark: OpaqueColor
  light: OpaqueColor
  main: OpaqueColor
  text: {
    disabled: OpaqueColor
    primary: OpaqueColor
    secondary: OpaqueColor
  }
}

function getTextColors (main: OpaqueColor): PaletteColor['text'] {
  if (tinycolor(main).isDark()) {
    return { disabled: '#ffffff80', primary: '#ffffffff', secondary: '#ffffffb2' }
  } else {
    return { disabled: '#00000080', primary: '#000000ff', secondary: '#000000b2' }
  }
}

function getColors (main: OpaqueColor): PaletteColor {
  return {
    dark: tinycolor(main).darken(20).toHexString(),
    light: tinycolor(main).lighten(20).toHexString(),
    main,
    text: getTextColors(main)
  }
}

interface Theme {
  background: PaletteColor
  error: PaletteColor
  primary: PaletteColor
  secondary: PaletteColor
}

interface UseThemeReturn {
  theme: Theme
}

const THEME = {
  background: getColors('#FFFFFF'),
  error: getColors('#DB5461'),
  primary: getColors('#171738'),
  secondary: getColors('#8EF9F3')
}

export default function useTheme (): UseThemeReturn {
  return { theme: THEME }
}
