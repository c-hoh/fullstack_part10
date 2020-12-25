import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import appTheme from '../css/theme';

const styles = StyleSheet.create({
  text: {
    color: appTheme.textColours.main,
    fontSize: appTheme.textProperties.defaultSize,
    fontFamily: appTheme.textProperties.fontFamily,
    fontWeight: appTheme.textProperties.fontWeight
  },
  colorTextSecondary: {
    color: appTheme.textColours.light
  },
  colorPrimary: {
    color: appTheme.colours.primary
  },
  colorContrast: {
    color: appTheme.textColours.contrast
  },
  fontSizeSubheading: {
    fontSize: appTheme.textProperties.largeSize,
  },
  fontSizeHeading: {
    fontSize: appTheme.textProperties.headingSize
  },
  fontWeightBold: {
    fontWeight: appTheme.textProperties.boldWeight
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'contrast' && styles.colorContrast,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export const Heading = ({ contrast, ...props }) => {
  const useColour = contrast ? 'contrast' : '';

  return <Text color={ useColour } fontSize='heading'
               fontWeight='bold' { ...props } />;
};

export default Text;