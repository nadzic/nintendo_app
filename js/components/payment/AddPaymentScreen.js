import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import creditCardType from 'credit-card-type';
import { COLORS } from 'nintendoapp/js/constants/colors';
import { closeAddPaymentProblemModal } from 'nintendoapp/js/actions/uiActions';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';
import { addCreditCard } from 'nintendoapp/js/actions/paymentActions';
import Loader from 'nintendoapp/js/components/common/Loader';
import NavigationService from 'nintendoapp/js/utils/navigation';
import { formatTextWithRegex } from 'nintendoapp/js/utils/formating';

/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;

export class AddPaymentScreen extends Component {
  static navigationOptions = {
    title: 'Add Payment Method',
    headerRight: (<View />),
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
  };

  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);

    this.state = {
      ccNumber: '',
      expireDate: '',
      cvvNumber: '',
      zipCode: '',
      ccType: '',
      cvvType: 'CVV',
      cvvLength: 3,
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

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    } else {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    }
  }

  onSavePress() {
    const {
      ccNumber,
      expireDate,
      zipCode,
      cvvNumber,
    } = this.state;
    const { addCreditCard, user } = this.props;
    const { auth_token } = user;

    const expMonth = expireDate.split('/')[0];
    const expYear = '20'.concat(expireDate.split('/')[1]);

    addCreditCard(auth_token, ccNumber, expMonth, expYear, cvvNumber, zipCode);
  }

  setCcCvvType(ccNumber) {
    const posibleCardsArray = creditCardType(ccNumber);
    if(ccNumber.length <= 4) {
      if (posibleCardsArray.length > 0 && posibleCardsArray.length < 10) {
        this.setState({
          ccType: posibleCardsArray[0].niceType,
          cvvType: posibleCardsArray[0].code.name,
          cvvLength: posibleCardsArray[0].code.size,
        });
      } else {
        this.setState({ ccType: '', cvvType: 'CVV', cvvLength: 3 });
      }
    }
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
      ccNumber,
      expireDate,
      cvvNumber,
      zipCode,
      ccType,
      cvvType,
      cvvLength,
    } = this.state;
    const {
      closeAddPaymentProblemModal,
      loading,
      addPaymentProblemModalOpen,
    } = this.props;
    return (
      <Animated.View style={[styles.container, { paddingBottom: Platform.OS === 'ios' ? this.keyboardHeight : 0 }]}>
        <View style={styles.inputContainer}>
          <View style={styles.firstRow}>
            <TextInput
              style={styles.ccInput}
              placeholder="Card Number"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              autoFocus
              placeholderTextColor={COLORS.LIGHTGREY}
              value={ccNumber}
              onChangeText={(text) => { this.setState({ ccNumber: formatTextWithRegex(text, ' ', '.{1,4}') }); this.setCcCvvType(text); } }
              maxLength={19}
            />
          </View>
          <View style={styles.secondRow}>
            <TextInput
              style={styles.dateInput}
              placeholder="MM/YY"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              placeholderTextColor={COLORS.LIGHTGREY}
              value={expireDate}
              onChangeText={(text) => this.setState({ expireDate: formatTextWithRegex(text, '/', '.{1,2}') })}
              maxLength={5}
            />
            <TextInput
              style={styles.cvvInput}
              placeholder={cvvType}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={COLORS.LIGHTGREY}
              value={cvvNumber}
              onChangeText={(text) => this.setState({ cvvNumber: text })}
              maxLength={cvvLength}
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
          <View style={styles.thirdRow}>
            <Text style={styles.ccType}>{ccType}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={(e) => this.onSavePress(e)}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        {loading && <Loader />}
        <ModalSimple
          isVisible={addPaymentProblemModalOpen}
          onPress={closeAddPaymentProblemModal}
          headline={`There Was An Issue Adding\nYour Credit Card. Please Try\nAgain Or Use A Different\nCard.`}
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
    fontFamily: 'BrandonText-Medium',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    fontSize: 16,
    paddingBottom: 10,
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  dateInput: {
    fontFamily: 'BrandonText-Medium',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    marginRight: 15,
    fontSize: 16,
    paddingBottom: 10,
  },
  cvvInput: {
    fontFamily: 'BrandonText-Medium',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    marginRight: 15,
    fontSize: 16,
    paddingBottom: 10,
  },
  zipInput: {
    fontFamily: 'BrandonText-Medium',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREY,
    fontSize: 16,
    paddingBottom: 10,
  },
  thirdRow: {
    marginTop: 15,
  },
  ccType: {
    color: COLORS.LIGHTGREY,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginBottom: 50,
  },
  saveText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
  },
});

const mapStateToProps = (state) =>
  ({
    loading: state.loading,
    user: state.auth.user,
    addPaymentProblemModalOpen: state.ui.addPaymentProblemModalOpen,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    closeAddPaymentProblemModal,
    addCreditCard,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentScreen);
