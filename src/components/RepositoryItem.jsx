import React from 'react';
import { Text, View } from 'react-native';

const RepositoryItem = ({ itemTitle, itemDescription, itemLanguage, itemStars,
  itemForks, itemReviews, itemRating }) => {
  return (
    <View>
      <Text>Full name: { itemTitle }</Text>
      <Text>Description: { itemDescription }</Text>
      <Text>Language: { itemLanguage }</Text>
      <Text>Stars: { itemStars }</Text>
      <Text>Forks: { itemForks }</Text>
      <Text>Reviews: { itemReviews }</Text>
      <Text>Rating: { itemRating }</Text>
    </View>
  );
};

export default RepositoryItem;