import { LinkingOptions, NavigationContainer as Upstream, NavigationContainerRef as UpstreamRef } from '@react-navigation/native'
import { FC, ReactNode, Ref, forwardRef } from 'react'

import { ParamList } from '../../lib/navigation'

interface NavigationContainerProps {
  children: ReactNode
  linkingOptions: LinkingOptions<ParamList>
  ref: Ref<UpstreamRef<ParamList>>
}

const NavigationContainer: FC<NavigationContainerProps> = forwardRef(({ children, linkingOptions }, ref) => {
  return (
    <Upstream
      linking={linkingOptions}
      ref={ref}
    >
      {children}
    </Upstream>
  )
})

export default NavigationContainer
