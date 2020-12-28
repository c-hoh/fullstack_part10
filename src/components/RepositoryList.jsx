import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItemFunc = ({ item }) => {
    return (
      <RepositoryItem 
        itemImage={ item.ownerAvatarUrl }
        itemTitle={ item.fullName } 
        itemDescription={ item.description }
        itemLanguage={ item.language }
        itemStars={ item.stargazersCount }
        itemForks={ item.forksCount }
        itemReviews={ item.reviewCount }
        itemRating={ item.ratingAverage }
      />
    );
  };

  return (
    <FlatList
      data={ repositoryNodes }
      ItemSeparatorComponent={ ItemSeparator }
      keyExtractor={ x => x.id }
      renderItem={ renderItemFunc }
    />
  );
};

export default RepositoryList;