import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { ApolloError } from 'apollo-boost';
import gql from 'graphql-tag';
import React, { createContext, useContext, useState } from 'react';

interface MemberData {
  number: number;
  fullName: string;
}

interface AuthProps {
  member?: MemberData;
  loading: boolean;
  error?: ApolloError;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthProps>({
  loading: false,
  login: () => { throw new Error ('Attempting to login without an auth provider'); },
  logout: () => { throw new Error ('Attempting to login without an auth provider'); },
});

export default AuthContext;

const MEMBER_QUERY = gql`
  {
    loggedInMember {
      number
      fullName
    }
  }
`;

interface MemberQueryData {
  loggedInMember?: MemberData;
}

interface AuthQueryProps {
  token?: string;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
}

const AuthQuery: React.FC<AuthQueryProps> = ({ children, token, login, logout }) => {
  const {loading, error, data} = useQuery<MemberQueryData>(MEMBER_QUERY, {
    skip: token === undefined,
  });

  const member = data ? data.loggedInMember : undefined;

  return (
    <AuthContext.Provider value={{ member, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider: React.FC = ({ children }) => {
  const TOKEN_KEY = 'token';

  // The only state is the auth token - we use this to create an ApolloClient and query the server
  // for member details.
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || undefined);

  // Create an apollo client using bearer auth.
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URI || 'https://wol-api.ajshort.now.sh/graphql',
    request: operation => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    },
  });

  // Login and logout functions.
  const login = (token: string, remember: boolean) => {
    setToken(token);

    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  };

  const logout = () => {
    setToken(undefined);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <ApolloProvider client={client}>
      <AuthQuery token={token} login={login} logout={logout}>
        {children}
      </AuthQuery>
    </ApolloProvider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);
