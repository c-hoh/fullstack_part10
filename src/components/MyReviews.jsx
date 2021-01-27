import React from 'react';
import { FlatList } from 'react-native';

import useAuthUser from '../hooks/useAuthUser';
import ItemSeparator from './ItemSeparator';
import { ReviewView } from './RepositoryItem';

const MyReviews = () => {
  const { user, refetch } = useAuthUser(true);
  if ( !user ) {
    return null;
  }
  const userReviews = user.reviews.edges.map(x => ({
    ...x,
    node: {
      ...x.node,
      user: { 
        username: x.node.id.split('.').slice(1, 3).join('/')
      }
    }
  }));

  return (
    <FlatList
      data={ userReviews.map(x => x.node ) }
      renderItem={ (x) => <ReviewView review={ x } showButtons refetch={ refetch } /> }
      keyExtractor={ ({ id }) => id }
      ItemSeparatorComponent={ ItemSeparator }
    />
  );
};

export default MyReviews;