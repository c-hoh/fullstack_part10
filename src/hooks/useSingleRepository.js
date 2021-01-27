import { useQuery } from '@apollo/react-hooks';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id, first) => {
  const variables = {
    id: id,
    first: first ? first : 10
  };

  const { data, loading, fetchMore, ...result } = useQuery(
    GET_SINGLE_REPOSITORY, {
      variables: { ...variables },
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && 
      data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      query: GET_SINGLE_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews, 
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ]
            }
          }
        };
        console.log(nextResult);
        return nextResult;
      }
    });
  };

  return { 
    repository: data ? data.repository : undefined,
    loading: loading,
    fetchMore: handleFetchMore,
    ...result
  };
};

export default useSingleRepository;