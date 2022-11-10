import { Image, IImageProps } from 'native-base';

const Flag = ({ ...rest }: IImageProps) => {
  return <Image {...rest} alt="Bandeira" w={8} h={6} mx={3} />;
};

export { Flag };
