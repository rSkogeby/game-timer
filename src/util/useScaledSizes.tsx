import { useDimensions } from '@react-native-community/hooks'
import React, { createContext, ReactNode } from 'react'
import { Dimensions } from 'react-native'

interface MapPoint {
  in: number
  out: number
}

function map (min: MapPoint, max: MapPoint, value: number): number {
  return Math.round((value - min.in) * (max.out - min.out) / (max.in - min.in) + min.out)
}

interface DeviceFontSizes {
  /** The size to use on an **iPhone X** or **iPhone 11/12 Pro** in portrait mode */
  iPhonePro?: number | null
  /** The size to use on an **iPhone 11/12 Pro Max** in portrait mode */
  iPhoneProMax?: number | null
  /** The size to use on an **iPad Air 4th generation** or **iPad Pro 11"** in landscape mode */
  iPadAir?: number | null
  /** The size to use on an **iPad Pro 12.9"** in landscape mode */
  iPadPro?: number | null
}

export function calculateScaledSize (width: number, sizes: DeviceFontSizes): number {
  const points: MapPoint[] = []

  if (sizes.iPhonePro != null) points.push({ in: 375, out: sizes.iPhonePro })
  if (sizes.iPhoneProMax != null) points.push({ in: 428, out: sizes.iPhoneProMax })
  if (sizes.iPadAir != null) points.push({ in: 1180, out: sizes.iPadAir })
  if (sizes.iPadPro != null) points.push({ in: 1366, out: sizes.iPadPro })

  if (points.length < 2) {
    throw new Error('Must specify at least two device sizes')
  }

  // Smaller than smallest size
  if (width < points[0].in) {
    return map(points[0], points[1], width)
  }

  // Within one of the given ranges
  for (let i = 1; i < points.length; i++) {
    if (width <= points[i].in) {
      return map(points[i - 1], points[i], width)
    }
  }

  // Larger than the largest size
  return map(points[points.length - 2], points[points.length - 1], width)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getValues (width: number) {
  return {
    labelIconSize: calculateScaledSize(width, { iPhonePro: 21, iPhoneProMax: 21, iPadAir: 32, iPadPro: 34 }),
    labelPadding: calculateScaledSize(width, { iPhonePro: 6, iPhoneProMax: 6, iPadAir: 8, iPadPro: 8 }),
    labelSize: calculateScaledSize(width, { iPhonePro: 14, iPhoneProMax: 14, iPadAir: 22, iPadPro: 22 }),
  }
}

type ScaledSizes = ReturnType<typeof getValues>
const ScaledSizesContext = createContext<ScaledSizes>(getValues(Dimensions.get('window').width))

export const ScaledSizesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { width } = useDimensions().window

  return <ScaledSizesContext.Provider value={getValues(width)}>{children}</ScaledSizesContext.Provider>
}

export default function useScaledSizes (): ScaledSizes {
  return React.useContext(ScaledSizesContext)
}
