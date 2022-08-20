import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Product from 'nintendoapp/js/components/shopping-cart/Product';
import { COLORS } from 'nintendoapp/js/constants/colors';
import { getIndexInUpcs } from 'nintendoapp/js/utils/calculation';

/* eslint-disable global-require */

class ProductList extends Component {
  onDeleteProductPress = (product) => {
    const {
      quantities,
      upcs,
      deleteProductFromCart,
      deleteQuantityFromCart,
      deleteVariantFromCart,
      decreaseQuantityInCart,
      deleteUpcFromCart,
    } = this.props;
    const index = getIndexInUpcs(product.upcCode, upcs);
    if (quantities[index] < 2) {
      deleteProductFromCart(product.id);
      deleteQuantityFromCart(index);
      deleteVariantFromCart(index);
      deleteUpcFromCart(index);
    } else {
      deleteProductFromCart(product.id);
      decreaseQuantityInCart(index);
    }
  }

  render() {
    const {
      products,
    } = this.props;

    if (!products) {
      return null;
    }

    return (
      <ScrollView
        style={styles.container}
        testID='Scroll View Shopping Cart'
      >
        {products.length > 0 ? products.map((product, index) => (
          <Product
            product={product}
            key={product.id}
            onPress={() => this.onDeleteProductPress(product)}
            index={index}
          />
        )) :
        <View style={styles.emptyCard}>
          <Text style={styles.emptyCardText}>{`Your cart is empty.\nPlease scan to add items.`}</Text>
        </View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: COLORS.LIGHTGREY2,
    marginBottom: 105.5,
  },
  emptyCard: {
    marginTop: 120,
    display: 'flex',
    alignItems: 'center',
  },
  emptyCardText: {
    fontFamily: 'BrandonText-Medium',
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.DARKGREY,
  },
});

export default ProductList;
