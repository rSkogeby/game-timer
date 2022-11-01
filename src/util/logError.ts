import { captureException } from '../client/sentry'

export default function logError (error: any, message?: string): void {
  if (message != null) error = new Error(message)

  if (__DEV__) {
    console.error(error)
  } else {
    captureException(error)
  }
}
