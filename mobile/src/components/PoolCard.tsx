import { Heading, HStack, Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Participants, IParticipantProps } from './Participants';

interface IPoolCardProps {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  };
  participants: IParticipantProps[];
  _count: {
    participants: number;
  };
}

interface IProps extends TouchableOpacityProps {
  data: IPoolCardProps;
}

const PoolCard = ({ data, ...rest }: IProps) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
      >
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {data.title}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            Criado por {data.owner.name}
          </Text>
        </VStack>

        <Participants
          count={data._count.participants}
          participants={data.participants}
        />
      </HStack>
    </TouchableOpacity>
  );
};

export { type IPoolCardProps, PoolCard };
