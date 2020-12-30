import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';
import { IS_AUTH } from '../graphql/queries';

const useAuthUser = () => {
  const [user, setUser] = useState({});

  const result = useQuery(IS_AUTH, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!result.loading) {
      setUser(result.data.authorizedUser);
    }
  }, [result.loading]);

  return { user };
};

export default useAuthUser;