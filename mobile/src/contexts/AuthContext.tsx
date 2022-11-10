import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface IUserProps {
  name: string;
  avatarUrl: string;
}

interface IAuthContextDataProps {
  user: IUserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface IAuthContextProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextDataProps>(
  {} as IAuthContextDataProps
);

const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUserProps>({} as IUserProps);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const [_, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GCP_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  });

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(accessToken: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post<{ token: string }>('/users', {
        accessToken
      });

      api.defaults.headers.common.Authorization = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get<{ user: IUserProps }>('/me');

      setUser(userInfoResponse.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      signInWithGoogle(response?.authentication?.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext, type IAuthContextDataProps };
