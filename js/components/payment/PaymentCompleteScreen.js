import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ViewOverflow from 'react-native-view-overflow';
import { COLORS } from 'nintendoapp/js/constants/colors';
import NavigationService from 'nintendoapp/js/utils/navigation';
import { calculateTotal } from 'nintendoapp/js/utils/calculation';
import {
  deleteAllProductsFromCart,
  deleteAllVariantsFromCart,
  deleteAllQuantitiesFromCart,
  deleteAllUpcsFromCart,
} from 'nintendoapp/js/actions/cartActions';

/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;

export class PaymentCompleteScreen extends Component {
  static navigationOptions = {
    title: 'Payment Complete',
    headerLeft: null,
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'normal',
      fontFamily: 'BrandonText-Medium',
      textAlign: 'center',
      flex: 1,
    },
    headerStyle: {
      backgroundColor: COLORS.GREEN,
    },
    headerTintColor: COLORS.WHITE,
  };

  goToScanProductScreen() {
    const {
      deleteAllProductsFromCart,
      deleteAllQuantitiesFromCart,
      deleteAllVariantsFromCart,
      deleteAllUpcsFromCart,
      navigation,
    } = this.props;
    deleteAllProductsFromCart();
    deleteAllQuantitiesFromCart();
    deleteAllVariantsFromCart();
    deleteAllUpcsFromCart();
    NavigationService.resetState('ScanProduct');
  }

  render() {
    const { products } = this.props;
    return (
      <View style={styles.container}>
        <ViewOverflow style={styles.box}>
          <View style={styles.circleImageWrapper}>
            <Image source={require('nintendoapp/js/components/payment/img/circle.png')} />
          </View>
          <Text style={styles.priceText}>${calculateTotal(products)}</Text>
          <View style={styles.lineSeparator} />
          <Text style={styles.completeText}>Payment Complete</Text>
          <Text style={styles.emailReceiptText}>Email receipt has been sent</Text>
        </ViewOverflow>
        <TouchableOpacity
          style={styles.scanProductButton}
          onPress={() => {
            this.goToScanProductScreen();
          }}
        >
          <Text style={styles.scanProductText}>Return to Scan Product</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHTGREY4,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    width: '88%',
    height: 200,
    borderRadius: 5,
    position: 'relative',
    zIndex: 30,
  },
  circleImageWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  priceText: {
    fontSize: 35,
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontFamily: 'BrandonText-Bold',
  },
  lineSeparator: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    width: '65%',
    marginTop: 10,
    marginBottom: 10,
  },
  completeText: {
    fontSize: 20,
    color: COLORS.DARKGREY2,
    textAlign: 'center',
    fontFamily: 'BrandonText-Medium',
  },
  emailReceiptText: {
    fontFamily: 'BrandonText-Medium',
    fontSize: 16,
    color: COLORS.DARKGREY2,
    textAlign: 'center',
  },
  scanProductButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 20,
  },
  scanProductText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
  },
});

const mapStateToProps = (state) =>
  ({
    products: state.cart.products,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    deleteAllProductsFromCart,
    deleteAllVariantsFromCart,
    deleteAllQuantitiesFromCart,
    deleteAllUpcsFromCart,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCompleteScreen);
