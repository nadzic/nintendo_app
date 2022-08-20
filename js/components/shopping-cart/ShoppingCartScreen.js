import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { get as safeGet } from 'lodash';
import { COLORS } from 'nintendoapp/js/constants/colors';
import ProductList from 'nintendoapp/js/components/shopping-cart/ProductList';
import Confirm from 'nintendoapp/js/components/shopping-cart/Confirm';
import {
  deleteProductFromCart,
  deleteQuantityFromCart,
  deleteVariantFromCart,
  decreaseQuantityInCart,
  deleteUpcFromCart,
} from 'nintendoapp/js/actions/cartActions';
import { getCreditCard } from 'nintendoapp/js/actions/paymentActions';
import Loader from 'nintendoapp/js/components/common/Loader';
import NavigationService from 'nintendoapp/js/utils/navigation';

/* eslint-disable global-require */

type Props = {
  products: Array,
  quantities: Array,
  navigation: any,
};

export class ShoppingCartScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Shopping cart',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'normal',
      fontFamily: 'BrandonText-Medium',
    },
    headerStyle: {
      backgroundColor: COLORS.GREEN,
    },
    headerTintColor: COLORS.WHITE,
    headerLeft: (
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => NavigationService.resetState('ScanProduct')}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require('nintendoapp/js/components/shopping-cart/img/back.png')}
        />
      </TouchableOpacity>),
  }

  render() {
    const {
      navigation,
      products,
      quantities,
      upcs,
      user,
      loading,
      deleteProductFromCart,
      deleteQuantityFromCart,
      deleteVariantFromCart,
      decreaseQuantityInCart,
      deleteUpcFromCart,
      getCreditCard,
    } = this.props;
    const auth_token = safeGet(user, 'auth_token', '');
    return (
      <View style={styles.container}>
        <ProductList
          products={products}
          quantities={quantities}
          upcs={upcs}
          deleteProductFromCart={deleteProductFromCart}
          deleteQuantityFromCart={deleteQuantityFromCart}
          deleteVariantFromCart={deleteVariantFromCart}
          decreaseQuantityInCart={decreaseQuantityInCart}
          deleteUpcFromCart={deleteUpcFromCart}
        />
        <Confirm
          products={products}
          quantities={quantities}
          navigation={navigation}
          getCreditCard={getCreditCard}
          authToken={auth_token}
        />
        {loading && <Loader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHTGREY2,
    height: '100%',
  },
});

const mapStateToProps = (state) =>
  ({
    user: state.auth.user,
    loading: state.loading,
    products: state.cart.products,
    quantities: state.cart.quantities,
    upcs: state.cart.upcs,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    deleteProductFromCart,
    deleteVariantFromCart,
    deleteQuantityFromCart,
    decreaseQuantityInCart,
    deleteUpcFromCart,
    getCreditCard,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingCartScreen);
