import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
  const [loginMutation, result] = useMutation(LOGIN);

  const doSignIn = async ({ username, password }) => {
    const credentials = { username, password };
    const response = await loginMutation({ variables: 
      { credentials: credentials }});
    return response;
  };

  return [doSignIn, result];
};

export default useSignIn;