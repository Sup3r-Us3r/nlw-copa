import { VStack, useToast, HStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Share } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Guesses } from '../components/Guesses';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { IPoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { api } from '../services/api';

interface IDetailsProps {
  id: string;
}

const Details = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [poolDetails, setPoolDetails] = useState<IPoolCardProps>(
    {} as IPoolCardProps
  );
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'ranking'
  );

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as IDetailsProps;

  async function handleCodeShare() {
    await Share.share({
      title: 'Código do bolão',
      message: poolDetails.code
    });
  }

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get<IPoolCardProps>(`/pools/${id}`);

      setPoolDetails(response.data);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão!',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus paupites"
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
};

export { Details };
