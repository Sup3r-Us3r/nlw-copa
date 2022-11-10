import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

import appPreviewImage from '../assets/app-nlw-copa-preview.png';
import iconCheckImage from '../assets/icon-check.svg';
import logoImage from '../assets/logo.svg';
import usersAvatarExampleImage from '../assets/users-avatar-example.png';
import { api } from '../lib/axios';

interface IHomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

const Home: NextPage<IHomeProps> = ({ poolCount, guessCount, userCount }) => {
  const [poolTitle, setPoolTitle] = useState<string>('');

  async function createPool(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const poolResponse = await api.post<{ code: string }>('/pools', {
        title: poolTitle
      });

      await navigator.clipboard.writeText(poolResponse.data.code);

      setPoolTitle('');

      alert(
        'Bolão criado com sucesso, o código foi copiado para área de transferência!'
      );
    } catch (error) {
      console.log(error);

      alert('Não foi possível criar o bolão, por favor tente novamente!');
    }
  }

  return (
    <div className="max-w-[1124px] mx-auto grid grid-cols-2 gap-28 items-center h-screen">
      <main>
        <Image
          className="pointer-events-none select-none"
          src={logoImage}
          alt="Logo NLW Copa"
          quality={100}
        />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            className="pointer-events-none select-none"
            src={usersAvatarExampleImage}
            alt="Avatars"
            quality={100}
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2" onSubmit={createPool}>
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Qual nome do seu bolão?"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="Icon check" />
            <div className="flex flex-col">
              <span className="font-bold">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="Icon check" />
            <div className="flex flex-col">
              <span className="font-bold">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImage} alt="NLW Copa" quality={100} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get<{ count: number }>('/pools/count'),
      api.get<{ count: number }>('/guesses/count'),
      api.get<{ count: number }>('/users/count')
    ]);

  return {
    revalidate: 5 * 60, // 5 min,
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  };
};

export default Home;
