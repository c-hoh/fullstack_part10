import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repos, setRepos] = useState();
  
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!result.loading) {
      setRepos(result.data.repositories);
    }
  }, [result.loading]);
  
  return { repositories: repos };
};

export default useRepositories;