import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { get as safeGet } from 'lodash';
import { COLORS } from 'nintendoapp/js/constants/colors';
import { calculateTotal } from 'nintendoapp/js/utils/calculation';


/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;

type Props = {
  navigation: any,
  ui: any
};

class Confirm extends Component<Props> {
  // TODO: disconnect from store
  goToNextScreen() {
    const {
      navigation,
    } = this.props;

    navigation.navigate('Payment');
  }

  render() {
    const products = safeGet(this.props, 'products', []);

    const numProducts = products.length;
    const total = calculateTotal(products);
    return (
      <View style={[styles.container, numProducts < 1 && styles.disabled]}>
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total : </Text>
          <Text style={styles.valueText}>${total}</Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => this.goToNextScreen()}
          disabled={numProducts < 1}
        >
          <Text style={styles.confirmText}>Confirm and Pay</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHTGREY3,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopColor: COLORS.LIGHTGREY,
    borderTopWidth: 0.5,
    paddingTop: 7,
  },
  disabled: {
    opacity: 0.3,
  },
  totalSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  totalText: {
    color: COLORS.BLACK,
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'BrandonText-Bold',
  },
  valueText: {
    color: COLORS.GREEN,
    fontSize: 18,
    fontFamily: 'BrandonText-Bold',
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginBottom: 15,
  },
  confirmText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
  },
});

export default Confirm;
