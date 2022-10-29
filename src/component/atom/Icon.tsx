import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Octicons from '@expo/vector-icons/Octicons'

import useScaledSizes from '../../util/useScaledSizes'

export type IconName =
  | 'label-add-user'
  | 'label-add'
  | 'label-cancel'
  | 'label-clear'
  | 'label-collapsable-close'
  | 'label-collapsable-open'
  | 'label-move'
  | 'label-open-in-new'
  | 'label-open'
  | 'label-check-box-unchecked'
  | 'label-check-box-checked'
  | 'label-radio-button-unchecked'
  | 'label-radio-button-checked'
  | 'label-remove'
  | 'label-schedule-for-later'
  | 'label-search'
  | 'label-shopping-cart'
  | 'label-subtract'
  | 'label-is-masked-field'
  | 'label-is-unmasked-field'

interface IconProps {
  color?: string
  name: IconName
}

const Icon: React.FC<IconProps> = ({ color, name }) => {
  const scaledSizes = useScaledSizes()

  switch (name) {
    case 'label-add-user': return <Entypo color={color} name='add-user' size={scaledSizes.labelIconSize} />
    case 'label-add': return <MaterialIcons color={color} name='add' size={scaledSizes.labelIconSize} />
    case 'label-cancel': return <MaterialCommunityIcons color={color} name='playlist-remove' size={scaledSizes.labelIconSize} />
    case 'label-check-box-unchecked': return <MaterialCommunityIcons color={color} name='checkbox-blank-outline' size={scaledSizes.labelIconSize} />
    case 'label-check-box-checked': return <MaterialCommunityIcons color={color} name='checkbox-marked' size={scaledSizes.labelIconSize} />
    case 'label-clear': return <Octicons color={color} name='x' size={scaledSizes.labelIconSize} />
    case 'label-collapsable-close': return <MaterialIcons color={color} name='chevron-right' size={scaledSizes.labelIconSize} />
    case 'label-collapsable-open': return <MaterialIcons color={color} name='expand-more' size={scaledSizes.labelIconSize} />
    case 'label-move': return <MaterialCommunityIcons color={color} name='folder-move-outline' size={scaledSizes.labelIconSize} />
    case 'label-open-in-new': return <MaterialCommunityIcons color={color} name='open-in-new' size={scaledSizes.labelIconSize} />
    case 'label-open': return <MaterialIcons color={color} name='keyboard-arrow-down' size={scaledSizes.labelIconSize} />
    case 'label-radio-button-unchecked': return <MaterialIcons color={color} name='radio-button-unchecked' size={scaledSizes.labelIconSize * 0.8} />
    case 'label-radio-button-checked': return <MaterialIcons color={color} name='radio-button-checked' size={scaledSizes.labelIconSize * 0.8} />
    case 'label-remove': return <Ionicons color={color} name='remove-circle-outline' size={scaledSizes.labelIconSize} />
    case 'label-schedule-for-later': return <MaterialIcons color={color} name='event' size={scaledSizes.labelIconSize} />
    case 'label-search': return <MaterialIcons color={color} name='search' size={scaledSizes.labelIconSize} />
    case 'label-shopping-cart': return <MaterialIcons color={color} name='shopping-cart' size={scaledSizes.labelIconSize} />
    case 'label-subtract': return <MaterialIcons color={color} name='remove' size={scaledSizes.labelIconSize} />
    case 'label-is-masked-field': return <MaterialCommunityIcons color={color} name='shield-key-outline' size={scaledSizes.labelIconSize} />
    case 'label-is-unmasked-field': return <MaterialCommunityIcons color={color} name='shield-key' size={scaledSizes.labelIconSize} />
    default: return <FontAwesome color='red' name='question' size={scaledSizes.labelIconSize} />
  }
}

export default Icon
