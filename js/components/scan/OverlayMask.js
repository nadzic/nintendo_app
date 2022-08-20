import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Loader from 'nintendoapp/js/components/common/Loader';

/* eslint-disable global-require */

class OverlayMask extends Component {
  render() {
    const { loading } = this.props;
    const { height, width } = Dimensions.get('window');
    const maskRowHeight = Math.round((height - 200) / 20);
    const maskColWidth = (width - 200) / 2;

    return (
      <View style={styles.maskOutter}>
        <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
        <View style={[{ flex: 30 }, styles.maskCenter]}>
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          <View style={styles.maskInner} />
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
        </View>
        <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
        {loading && <Loader white />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maskOutter: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {
    flexDirection: 'row',
  },
});

export default OverlayMask;
