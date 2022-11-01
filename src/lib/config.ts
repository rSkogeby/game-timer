import Constants from 'expo-constants'
import unwrap from 'ts-unwrap'

export const INTERNAL_VERSION = unwrap<string>(Constants.manifest?.extra?.internalVersion)
export const MARKETING_VERSION = unwrap<string>(Constants.manifest?.extra?.marketingVersion)
