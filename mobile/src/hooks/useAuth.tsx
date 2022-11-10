import { useContext } from 'react';

import { AuthContext, IAuthContextDataProps } from '../contexts/AuthContext';

const useAuth = (): IAuthContextDataProps => {
  const context = useContext(AuthContext);

  return context;
};

export { useAuth };
