import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import appTheme from '../css/theme';

const itemStyle = StyleSheet.create({
  view: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    backgroundColor: appTheme.colours.white
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
  }
});

const RepositoryItem = ({ itemImage, itemTitle, itemDescription, itemLanguage, 
  itemStars, itemForks, itemReviews, itemRating }) => {
  
  const formatK = (number) => {
    if (number >= 1000) {
      return String(Math.round(number / 100) / 10) + 'k';
    } else {
      return number;
    }
  };

  return (
    <View style={ itemStyle.view }>
      <View style={ itemStyle.flexViewRow }>
        <Image style={ itemStyle.image } source={{ uri: itemImage }} /> 
        <View style={ itemStyle.flexViewCol }>
          <Text fontWeight='bold'>{ itemTitle }</Text>
          <Text>{ itemDescription }</Text>
          <Text style={ itemStyle.languageBox }>{ itemLanguage }</Text>
        </View>
      </View>
      <View style={ itemStyle.flexViewRowEvenly }>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text fontWeight='bold'>{ formatK(itemStars) }</Text>{'\n'}Stars
          </Text>
        </View>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text fontWeight='bold'>{ formatK(itemForks) }</Text>{'\n'}Forks
          </Text>
        </View>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text fontWeight='bold'>{ formatK(itemReviews) }</Text>{'\n'}Reviews
          </Text>
        </View>
        <View style={ itemStyle.flexViewRow }>
          <Text style={ itemStyle.detailView }>
            <Text fontWeight='bold'>{ formatK(itemRating) }</Text>{'\n'}Ratings
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;