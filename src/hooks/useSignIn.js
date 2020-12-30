import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [loginMutation, result] = useMutation(LOGIN);
  const apolloClient = useApolloClient();

  const doSignIn = async ({ username, password }) => {
    const credentials = { username, password };
    const { data } = await loginMutation({ variables: 
      { credentials: credentials }});
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [doSignIn, result];
};

export default useSignIn;