import { Avatar, Center, HStack, Text } from 'native-base';

interface IParticipantProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

interface IProps {
  participants: IParticipantProps[];
  count: number;
}

const Participants = ({ participants, count }: IProps) => {
  return (
    <HStack>
      {participants &&
        participants.map(participant => (
          <Avatar
            key={participant.id}
            source={{ uri: participant.user.avatarUrl }}
            w={8}
            h={8}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          >
            {participant.user?.name?.at(0).toUpperCase()}
          </Avatar>
        ))}

      <Center
        w={8}
        h={8}
        bgColor="gray.700"
        rounded="full"
        borderWidth={1}
        borderColor="gray.800"
      >
        <Text color="gray.100" fontSize="xs" fontFamily="medium">
          {count ? `+${count}` : 0}
        </Text>
      </Center>
    </HStack>
  );
};

export { type IParticipantProps, Participants };
