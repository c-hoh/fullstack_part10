import { useQuery } from '@apollo/react-hooks';
import { IS_AUTH } from '../graphql/queries';

const useAuthUser = (fetchReviews) => {
  const useReviews = fetchReviews ? true : false;

  const result = useQuery(IS_AUTH, {
    fetchPolicy: 'cache-and-network',
    variables: {
      useReviews
    }
  });

  return { 
    user: result.data ? result.data.authorizedUser : undefined,
    refetch: result.refetch 
  };
};

export default useAuthUser;