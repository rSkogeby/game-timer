import { LinkingOptions, NavigationContainer as Upstream, NavigationContainerRef as UpstreamRef } from '@react-navigation/native'
import { FC, ReactNode, Ref, forwardRef } from 'react'

import { ParamList } from '../../lib/navigation'

interface NavigationContainerProps {
  children: ReactNode
  linkingOptions: LinkingOptions<ParamList>
  onReady: () => void
  ref: Ref<UpstreamRef<ParamList>>
}

const NavigationContainer: FC<NavigationContainerProps> = forwardRef(({ children, linkingOptions, onReady }, ref) => {
  return (
    <Upstream
      linking={linkingOptions}
      onReady={onReady}
      ref={ref}
    >
      {children}
    </Upstream>
  )
})

export default NavigationContainer
