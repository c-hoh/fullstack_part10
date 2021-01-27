import React from 'react';
import { View, Image, StyleSheet, Button, Linking, FlatList, Alert } from 'react-native';
import { useHistory, useParams } from 'react-router-native';
import { format } from 'date-fns';

import useSingleRepository from '../hooks/useSingleRepository';
import useDeleteReview from '../hooks/useDeleteReview';
import Text from './Text';
import appTheme, { style } from '../css/theme';
import ItemSeparator from './ItemSeparator';

const itemStyle = StyleSheet.create({
  listHeader: {
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: appTheme.colours.white,
    flex: 1
  },
  flexViewRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 3,
  },
  flexViewRowEvenly: {
    display: 'flex',
    flexDirection: 'row',
    margin: 3,
    justifyContent: 'space-evenly'
  },
  flexViewCol: {
    display: 'flex',
    flexDirection: 'column',
    margin: 3,
    justifyContent: 'space-evenly',
    flexShrink: 10
  },
  flexButton: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5
  },
  detailView: {
    textAlign: 'center'
  },
  image: {
    width: appTheme.smallImage.width,
    height: appTheme.smallImage.height,
    marginRight: 10
  },
  languageBox: {
    backgroundColor: appTheme.colours.primary,
    color: appTheme.textColours.contrast,
    padding: 5,
    marginTop: 3,
    flexShrink: 20,
    marginRight: 'auto',
    borderRadius: 3
  },
  bottomButton: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: appTheme.smallImage.width,
    height: appTheme.smallImage.height,
    borderRadius: appTheme.smallImage.height / 2,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: appTheme.colours.secondary,
    marginRight: 10,
  },
  ratingText: {
    fontSize: appTheme.textProperties.defaultSize,
    fontWeight: appTheme.textProperties.boldWeight,
    textAlign: 'center',
  }
});

export const formatK = (number) => {
  if (number >= 1000) {
    return String(Math.round(number / 100) / 10) + 'k';
  } else {
    return number;
  }
};

const openLink = async (link) => {
  await Linking.openURL(link);
};

export const RepositoryItemCore = ({ itemImage, itemTitle, itemDescription, 
  itemLanguage, itemStars, itemForks, itemReviews, itemRating, itemURI, 
  showOpen }) => {
  
  return (
    <View style={ showOpen ? itemStyle.listHeader : style.view }>
      <View style={ itemStyle.flexViewRow }>
        <Image testID="repoImg" style={ itemStyle.image } 
               source={{ uri: itemImage }} /> 
        <View style={ itemStyle.flexViewCol }>
          <Text testID="repoTitle" fontWeight='bold'>{ itemTitle }</Text>
          <Text testID="repoDescription">{ itemDescription }</Text>
          <Text testID="repoLanguage" style={ itemStyle.languageBox }>
            { itemLanguage }
          </Text>
        </View>
      </View>
      <View style={ itemStyle.flexViewRowEvenly }>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text testID="repoStars" fontWeight='bold'>
              { formatK(itemStars) }
            </Text>{'\n'}Stars
          </Text>
        </View>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text testID="repoForks" fontWeight='bold'>
              { formatK(itemForks) }
            </Text>{'\n'}Forks
          </Text>
        </View>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text testID="repoReviews" fontWeight='bold'>
              { formatK(itemReviews) }
            </Text>{'\n'}Reviews
          </Text>
        </View>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text testID="repoRating" fontWeight='bold'>
              { formatK(itemRating) }
            </Text>{'\n'}Ratings
          </Text>
        </View>
      </View>
      { showOpen 
        ? <View style={ itemStyle.bottomButton }>
              <Button onPress={ () => openLink(itemURI) }
                      color={ appTheme.colours.primary }
                      title="Open in GitHub" />
          </View>
        : null
        }
    </View>
  );
};

export const ReviewView = ({ review, showButtons, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();
  
  const pushID = (reviewID) => {
    const urlID = reviewID.split('.').slice(1, 3).join('/');
    history.push('/repo/' + urlID);
  };

  const doDelete = (reviewID) => {
    deleteReview(reviewID);
    refetch();
  };

  const deleteRepo = (reviewID) => {
    const repoName = reviewID.split('.').slice(1, 3).join('/');
    Alert.alert(
      'Delete Review?',
      `Do you want to delete your review on ${repoName}?`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => doDelete(reviewID)
        }
      ]
    );
  };

  const date = new Date(review.item.createdAt);
  const prettyDate = format(date, 'yyyy-MM-dd');
  return (
    <View style={ style.view }>
      <View style={ itemStyle.flexViewRow }>
        <View style={ itemStyle.rating }>
          <Text style={ itemStyle.ratingText }>{ review.item.rating }</Text>
        </View>
        <View style={ itemStyle.flexViewCol }>
          <Text fontWeight='bold'>{ review.item.user.username }</Text>
          <Text>{ prettyDate }</Text>
          <Text>{ review.item.text }</Text>
        </View>
      </View>
      { showButtons ?
        <View style={ itemStyle.flexViewRow }>
          <View style={ itemStyle.flexButton }>
            <Button
              onPress={ () => pushID(review.item.id) }
              title='View Repository'
              color={ appTheme.colours.primary } 
            />
          </View>
          <View style={ itemStyle.flexButton }>
            <Button
              onPress={ () => deleteRepo(review.item.id) }
              title='Delete'
              color='#d04040'
            />
          </View>
        </View>
        : <></>
      }
    </View>
  );
};

const RepositoryItem = ({ showOpen }) => {
  const { repo } = useParams();
  const tidyRepo = repo.replace('/', '.');
  const { repository, fetchMore } = useSingleRepository(tidyRepo, 5);
  
  const onEnd = () => {
    fetchMore();
  };

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList data={ repository.reviews.edges.map(r => r.node) }
              renderItem={ (x) => <ReviewView review={ x } /> }
              keyExtractor={ ({ id }) => id }
              ItemSeparatorComponent={ ItemSeparator }
              ListHeaderComponent={ 
                <RepositoryItemCore 
                  itemImage={ repository.ownerAvatarUrl }
                  itemTitle={ repository.fullName } 
                  itemDescription={ repository.description }
                  itemLanguage={ repository.language }
                  itemStars={ repository.stargazersCount }
                  itemForks={ repository.forksCount }
                  itemReviews={ repository.reviewCount }
                  itemRating={ repository.ratingAverage }
                  showOpen={ showOpen }
                /> 
              }
              onEndReached={ onEnd }
              onEndReachedThreshold={ 0.5 }
    />
  );
};


export default RepositoryItem;