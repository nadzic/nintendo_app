import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { get as safeGet } from 'lodash';
import { COLORS } from 'nintendoapp/js/constants/colors';
import {
  openRemoveCardModal,
  closeRemoveCardModal,
  closeDeletePaymentProblemModal,
  closeUpdatePaymentProblemModal,
} from 'nintendoapp/js/actions/uiActions';
import { deleteCreditCard, updateCreditCard } from 'nintendoapp/js/actions/paymentActions';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';
import NavigationService from 'nintendoapp/js/utils/navigation';
import Loader from 'nintendoapp/js/components/common/Loader';
import { formatTextWithRegex } from 'nintendoapp/js/utils/formating';

/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;

export class EditPaymentScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Payment Method',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'normal',
      textAlign: 'center',
      fontFamily: 'BrandonText-Medium',
      flex: 1,
    },
    headerStyle: {
      backgroundColor: COLORS.GREEN,
    },
    headerTintColor: COLORS.WHITE,
    headerRight: (<TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.state.params.openRemoveCardModal()}><Image source={require('nintendoapp/js/components/payment/img/delete-white.png')} /></TouchableOpacity>),
    headerLeft:
    <TouchableOpacity
      onPress={() => NavigationService.goBack()}
      style={{ marginLeft: 11.5 }}
    >
      <Image
        style={{ width: 22, height: 22 }}
        source={require('nintendoapp/js/components/payment/img/close.png')}
      />
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);

    const creditCardLast4 = safeGet(props.customer, 'sources.data[0].last4', '');
    const expMonth = safeGet(props.customer, 'sources.data[0].exp_month', '');
    const expYear = safeGet(props.customer, 'sources.data[0].exp_year', '');
    const zipCode = safeGet(props.customer, 'sources.data[0].address_zip', '');

    this.state = {
      ccNumber: this.generateCreditCardDisplay(creditCardLast4),
      expireDate: this.generateDateDisplay(expMonth, expYear),
      zipCode,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    } else {
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }
  }

  componentDidMount() {
    if (this.props.openRemoveCardModal && !this.props.navigation.state.params) {
      this.props.navigation.setParams({ openRemoveCardModal: this.props.openRemoveCardModal });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    } else {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    }
  }

  onUpdatePress() {
    const {
      expireDate,
      zipCode,
    } = this.state;
    const { updateCreditCard, user } = this.props;
    const { auth_token } = user;

    const expMonth = expireDate.split('/')[0];
    const expYear = '20'.concat(expireDate.split('/')[1]);

    updateCreditCard(auth_token, expMonth, expYear, zipCode);
  }

  confirmRemoveCreditCard = () => {
    const { deleteCreditCard, user } = this.props;
    const { auth_token } = user;

    deleteCreditCard(auth_token);
  }

  generateCreditCardDisplay = (last4) => {
    return last4 ? `**** **** **** ${last4}` : '';
  }

  generateDateDisplay = (expMonth, expYear) => {
    if (expMonth && expYear) {
      if (expMonth.toString().length === 1) {
        expMonth = `0${expMonth}`;
      }
      expYear = expYear.toString().slice(-2);
      return `${expMonth}/${expYear}`;
    }
    return '';
  }

  generateCvvDisplay = (last4) => {
    return last4 ? '***' : '';
  }

  keyboardWillShow = (event) => {
    if (Platform.OS === 'ios') {
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }).start();
    } else {
      this.keyboardHeight = event.endCoordinates.height;
    }
  };

  keyboardWillHide = (event) => {
    if (Platform.OS === 'ios') {
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }).start();
    } else {
      this.keyboardHeight = 0;
    }
  };

  render() {
    const {
      closeRemoveCardModal,
      closeDeletePaymentProblemModal,
      closeUpdatePaymentProblemModal,
      loading,
      removeCardModalOpen,
      deletePaymentProblemModalOpen,
      updatePaymentProblemModalOpen,
    } = this.props;
    const {
      ccNumber,
      expireDate,
      zipCode,
    } = this.state;

    return (
      <Animated.View style={[styles.container, { paddingBottom: Platform.OS === 'ios' ? this.keyboardHeight : 0 }]}>
        <View style={styles.inputContainer}>
          <View style={styles.firstRow}>
            <TextInput
              style={styles.ccInput}
              placeholder="Card Number"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholderTextColor={COLORS.LIGHTGREY}
              value={ccNumber}
              editable={false}
            />
          </View>
          <View style={styles.secondRow}>
            <TextInput
              style={styles.dateInput}
              underlineColorAndroid="transparent"
              placeholder="MM/YY"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              placeholderTextColor={COLORS.LIGHTGREY}
              onChangeText={(text) => this.setState({ expireDate: formatTextWithRegex(text, '/', '.{1,2}') })}
              maxLength={5}
              value={expireDate}
            />
            <TextInput
              style={styles.cvvInput}
              placeholder="CVV"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              placeholderTextColor={COLORS.LIGHTGREY}
              editable={false}
            />
            <TextInput
              style={styles.zipInput}
              placeholder="Zip Code"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={COLORS.LIGHTGREY}
              value={zipCode}
              onChangeText={(text) => this.setState({ zipCode: text })}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={(e) => this.onUpdatePress(e)}
        >
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
        <Modal
          isVisible={removeCardModalOpen}
          onBackdropPress={() => closeRemoveCardModal()}
          style={styles.modalContainer}
        >
          <View style={styles.modalMainSection}>
            <Text style={styles.modalHeadlineText}>{`Are You Sure You\nWant To Remove Your\nCard?`}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => closeRemoveCardModal()}
              >
                <Text style={styles.modalButtonCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonYes}
                onPress={() => this.confirmRemoveCreditCard()}
              >
                <Text style={styles.modalButtonYesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {loading && <Loader />}
        <ModalSimple
          isVisible={deletePaymentProblemModalOpen}
          onPress={closeDeletePaymentProblemModal}
          headline={`There Was An Issue Deleting\nYour Credit Card. Please Try\nAgain.`}
        />
        <ModalSimple
          isVisible={updatePaymentProblemModalOpen}
          onPress={closeUpdatePaymentProblemModal}
          headline={`There Was An Issue Updating\nYour Credit Card. Please Try\nAgain.`}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: FIELDS_WIDTH,
    marginTop: 35,
  },
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  ccInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    fontSize: 16,
    paddingBottom: 10,
    color: COLORS.LIGHTGREY,
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  dateInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    marginRight: 15,
    fontSize: 16,
    paddingBottom: 10,
  },
  cvvInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    marginRight: 15,
    fontSize: 16,
    paddingBottom: 10,
  },
  zipInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    fontSize: 16,
    paddingBottom: 10,
  },
  updateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginBottom: 50,
  },
  updateText: {
    color: COLORS.WHITE,
    fontSize: 20,
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  modalMainSection: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 3,
  },
  modalHeadlineText: {
    color: COLORS.BLACK,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 25,
    fontWeight: '500',
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  modalButtonCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GREEN,
    borderWidth: 1,
    width: '44%',
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 25,
    marginBottom: 30,
    marginRight: 8,
  },
  modalButtonCancelText: {
    color: COLORS.GREEN,
    fontSize: 20,
  },
  modalButtonYes: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: '44%',
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 25,
    marginBottom: 30,
    marginLeft: 8,
  },
  modalButtonYesText: {
    color: COLORS.WHITE,
    fontSize: 20,
  },
});

const mapStateToProps = (state) =>
  ({
    ui: state.ui,
    user: state.auth.user,
    loading: state.loading,
    customer: state.creditCard.customer,
    removeCardModalOpen: state.ui.removeCardModalOpen,
    deletePaymentProblemModalOpen: state.ui.deletePaymentProblemModalOpen,
    updatePaymentProblemModalOpen: state.ui.updatePaymentProblemModalOpen,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    openRemoveCardModal,
    closeRemoveCardModal,
    deleteCreditCard,
    closeDeletePaymentProblemModal,
    closeUpdatePaymentProblemModal,
    updateCreditCard,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditPaymentScreen);
