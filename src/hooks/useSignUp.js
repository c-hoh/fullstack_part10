import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [signUpMutation, result] = useMutation(SIGN_UP);

  const doSignUp = async ({ username, password }) => {
    const user = { username, password };
    const { data } = await signUpMutation({ variables: { user: user }});
    return data;
  };

  return [doSignUp, result];
};

export default useSignUp;