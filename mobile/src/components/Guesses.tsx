import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';

import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { Game, IGameProps } from './Game';
import { Loading } from './Loading';

interface IGuessesProps {
  poolId: string;
  code: string;
}

const Guesses = ({ poolId, code }: IGuessesProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [games, setGames] = useState<IGameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState<string>('');
  const [secondTeamPoints, setSecondTeamPoints] = useState<string>('');

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get<{ games: IGameProps[] }>(
        `/pools/${poolId}/games`
      );

      setGames(response.data.games);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os jogos!',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite!',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      });

      toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });

      await fetchGames();
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível enviar o palpite!',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
};

export { Guesses };
