import { NavigationContainerRef } from '@react-navigation/core'
import { RefObject } from 'react'
import * as Sentry from 'sentry-expo'

const routingInstrumentation = new Sentry.Native.ReactNavigationV5Instrumentation()

Sentry.init({
  dsn: 'https://71d45edaf422482a9cf0059f17c90977@o4504082829017088.ingest.sentry.io/4504082832097280',
  integrations: [new Sentry.Native.ReactNativeTracing({ routingInstrumentation })],
  tracesSampleRate: 1.0
})

export const addBreadcrumb = Sentry.Browser.addBreadcrumb
export const captureException = Sentry.Native.captureException
export const ErrorBoundary = Sentry.Native.ErrorBoundary

export function registerNavigationContainer (navigation: RefObject<NavigationContainerRef<any>>): void {
  routingInstrumentation.registerNavigationContainer(navigation)
}
