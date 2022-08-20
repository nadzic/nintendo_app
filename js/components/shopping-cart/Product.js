import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from 'nintendoapp/js/constants/colors';

/* eslint-disable global-require */

class Product extends Component {
  render() {
    const { product, onPress, index } = this.props;

    if (!product) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.textSection}>
          <Text style={styles.shortText}>{product.short}</Text>
          <Text style={styles.nameText}>{product.name}</Text>
          <Text style={styles.flavorText}>{product.flavor}</Text>
          <Text style={styles.productText}>${product.price} x 1</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteImg}
          onPress={onPress}
          testID={`Delete Product ${index} Shopping Cart`}
        >
          <Image
            source={require('nintendoapp/js/components/shopping-cart/img/delete.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: COLORS.LIGHTGREY,
    borderBottomWidth: 0.5,
  },
  textSection: {
    paddingLeft: 20,
    width: '100%',
  },
  productImage: {
    width: 67,
    height: 67,
  },
  deleteImg: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-end',
    right: 15,
  },
  shortText: {
    fontFamily: 'BrandonText-Medium',
    fontSize: 15,
    color: COLORS.DARKGREY,
    lineHeight: 20,
  },
  nameText: {
    fontFamily: 'BrandonText-Bold',
    fontSize: 16,
    color: COLORS.BLACK,
    lineHeight: 20,
    width: '70%',
  },
  flavorText: {
    fontSize: 15,
    fontFamily: 'BrandonText-Medium',
    fontWeight: '500',
    color: COLORS.DARKGREY,
    lineHeight: 20,
  },
  productText: {
    fontFamily: 'BrandonText-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Product;
