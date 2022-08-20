import React, { Component, Fragment } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as safeGet } from 'lodash';
import { closeProcessingPaymentProblemModal } from 'nintendoapp/js/actions/uiActions';
import { getCreditCard } from 'nintendoapp/js/actions/paymentActions';
import { makeKioskPurchase } from 'nintendoapp/js/actions/cartActions';
import { GO_TO_EDIT_PAYMENT, GO_TO_ADD_PAYMENT, GO_BACK } from 'nintendoapp/js/actions/actionTypes';
import { COLORS } from 'nintendoapp/js/constants/colors';
import { calculateTotal } from 'nintendoapp/js/utils/calculation';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';
import Loader from 'nintendoapp/js/components/common/Loader';
import NavigationService from 'nintendoapp/js/utils/navigation';

const FIELDS_WIDTH = '88%';
const FIELDS_HEIGHT = 50;

export class PaymentScreen extends Component {
  static navigationOptions = {
    title: 'Payment',
    headerRight: (<View />),
    headerBackTitle: null,
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'normal',
      textAlign: 'center',
      flex: 1,
      fontFamily: 'BrandonText-Medium',
    },
    headerStyle: {
      backgroundColor: COLORS.GREEN,
    },
    headerTintColor: COLORS.WHITE,
    headerLeft: (
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => NavigationService.goBack()}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require('nintendoapp/js/components/payment/img/back.png')}
        />
      </TouchableOpacity>),
  }

  componentWillMount() {
    const { getCreditCard, user } = this.props;
    const auth_token = safeGet(user, 'auth_token', '');
    getCreditCard(auth_token);
  }

  onPayClick = () => {
    const {
      makeKioskPurchase,
      user,
      variants,
      quantities,
    } = this.props;
    const { auth_token } = user;
    makeKioskPurchase(auth_token, variants, quantities);
  }

  render() {
    const {
      products,
      quantities,
      closeProcessingPaymentProblemModal,
      customer,
      loading,
      navigation,
      processingPaymentProblemModalOpen,
      goToAddPaymentContentVisible,
    } = this.props;

    const creditCardBrand = safeGet(customer, 'sources.data[0].brand', '');
    const creditCardLast4 = safeGet(customer, 'sources.data[0].last4', '');

    const ccContent = goToAddPaymentContentVisible ? (
      <Fragment>
        <Text style={styles.ccText}>Add payment method</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddPayment')}>
          <Text style={styles.editText}>Add</Text>
        </TouchableOpacity>
      </Fragment>
    ) : (
      <Fragment>
        <Text style={styles.ccText}>{`${creditCardBrand} ****${creditCardLast4}`}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditPayment')}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </Fragment>
    );

    return (
      <View style={styles.container}>
        <View style={styles.ccViewer}>
          {ccContent}
        </View>
        <View style={[styles.payButtonSection, goToAddPaymentContentVisible && styles.disabled]}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => this.onPayClick()}
            disabled={goToAddPaymentContentVisible}
          >
            <Text style={styles.payText}>Pay <Text style={{ fontFamily: 'BrandonText-Bold' }}>${calculateTotal(products)}</Text></Text>
          </TouchableOpacity>
        </View>
        {loading && <Loader />}
        <ModalSimple
          isVisible={processingPaymentProblemModalOpen}
          onPress={closeProcessingPaymentProblemModal}
          headline={`There Was An Issue\nProcessing Your Payment.\nPlease Try Again Or Add A\nNew Credit Card.`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  ccViewer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.LIGHTGREY2,
    width: FIELDS_WIDTH,
    height: FIELDS_HEIGHT,
    borderRadius: 3,
    padding: 15,
    marginTop: 30,
  },
  ccText: {
    fontFamily: 'BrandonText-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editText: {
    fontFamily: 'BrandonText-Bold',
    color: COLORS.GREEN,
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButtonSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  payButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: FIELDS_HEIGHT,
    marginTop: 30,
  },
  payText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
  },
  disabled: {
    opacity: 0.3,
  },
});

const mapStateToProps = (state) =>
  ({
    customer: state.creditCard.customer,
    products: state.cart.products,
    variants: state.cart.variants,
    quantities: state.cart.quantities,
    loading: state.loading,
    user: state.auth.user,
    processingPaymentProblemModalOpen: state.ui.processingPaymentProblemModalOpen,
    goToAddPaymentContentVisible: state.ui.goToAddPaymentContentVisible,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    closeProcessingPaymentProblemModal,
    getCreditCard,
    makeKioskPurchase,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
