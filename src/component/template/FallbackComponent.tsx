import { reloadAsync } from 'expo-updates'
import Spacer from 'react-spacer'
import { VStack } from 'react-stacked'

import logError from '../../util/logError'
import useTheme from '../../util/useTheme'
import Description from '../atom/Description'
import Heading from '../atom/Heading'
import RectangleButton from '../molecule/RectangleButton'

function restart (): void {
  reloadAsync().catch(logError)
}

interface Props {
  error: Error
  componentStack: string | null
  eventId: string | null
  resetError: () => void
}

const FallbackComponent = ({ error }: Props): JSX.Element => {
  const { theme } = useTheme()

  return (
    <VStack
      alignItems='center'
      grow={1}
      justifyContent='center'
      padding={32}
    >
      <Heading>
        Ooops!! 😔
      </Heading>
      <Spacer height={32} />
      <Description>
        Det blev inte riktigt som vi tänkt oss - det uppstod alltså ett fel - vi har fått information om detta och ska se över våra tjänster.
      </Description>
      <Spacer height={16} />
      <RectangleButton
        accentColor={theme.primary.main}
        onPress={restart}
        title='Starta om'
        type='filled'
      />
      <Spacer height={16} />
      <Description>
        {error?.message ?? String(error)}
      </Description>
    </VStack>
  )
}

export default FallbackComponent
