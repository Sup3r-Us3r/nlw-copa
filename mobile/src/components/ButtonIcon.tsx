import { useTheme } from 'native-base';
import { IconProps } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IButtonIconProps extends TouchableOpacityProps {
  icon: React.FC<IconProps>;
}

const ButtonIcon = ({ icon: Icon, ...rest }: IButtonIconProps) => {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...rest}>
      <Icon color={colors.gray[300]} size={sizes[6]} />
    </TouchableOpacity>
  );
};

export { ButtonIcon };
