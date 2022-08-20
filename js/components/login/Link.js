import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from 'nintendoapp/js/constants/colors';

/* eslint-disable global-require */

class Link extends Component {
  render() {
    const { text, testID, navFunction } = this.props;
    return (
      <TouchableOpacity
        onPress={navFunction}
        testID={testID}
      >
        <Text
          style={styles.contentText}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contentText: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: 'BrandonText-Medium',
  },
});

export default Link;
