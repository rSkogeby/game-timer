import { Text } from 'react-stacked'

const ErrorField: React.FC<{ message?: string }> = ({ message }) => (
  <Text color='red'>{message}</Text>
)

export default ErrorField
