import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get as safeGet } from 'lodash';
import { COLORS } from 'nintendoapp/js/constants/colors';
import {
  openResetPasswordModal,
  closeEmailTakenModal,
  closeResendEmailModal,
  hideThankYouSignupContent,
} from 'nintendoapp/js/actions/uiActions';
import { validateEmail, validatePassword } from 'nintendoapp/js/utils/validation';
import { goBack } from 'nintendoapp/js/actions/navigationActions';
import NavigationService from 'nintendoapp/js/utils/navigation';
import { register, resend } from 'nintendoapp/js/actions/userActions';
import Loader from 'nintendoapp/js/components/common/Loader';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';

/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const INPUT_FIELDS_HEIGHT = 35;

export class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Sign up',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'normal',
      fontFamily: 'BrandonText-Medium',
    },
    headerStyle: {
      backgroundColor: COLORS.GREEN,
    },
    headerTintColor: COLORS.WHITE,
    headerLeft:
      <TouchableOpacity
        onPress={() => NavigationService.goBack()}
        style={{ marginLeft: 11.5 }}
      >
        <Image
          style={{ width: 22, height: 22 }}
          source={require('nintendoapp/js/components/signup/img/close.png')}
        />
      </TouchableOpacity>,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      firstNameInvalid: false,
      firstNameFocus: false,
      lastNameInvalid: false,
      lastNameFocus: false,
      emailInvalid: false,
      emailFocus: false,
      passwordInvalid: false,
      passwordFocus: false,
    };
  }

  onFirstNameFocus() {
    this.setState({
      firstNameFocus: true,
    });
  }

  onFirstNameBlur() {
    this.setState({
      firstNameFocus: false,
    });
  }

  onLastNameFocus() {
    this.setState({
      lastNameFocus: true,
    });
  }

  onLastNameBlur() {
    this.setState({
      lastNameFocus: false,
    });
  }

  onEmailFocus() {
    this.setState({
      emailFocus: true,
    });
  }

  onEmailBlur() {
    this.setState({
      emailFocus: false,
    });
  }

  onPasswordFocus() {
    this.setState({
      passwordFocus: true,
    });
  }

  onPasswordBlur() {
    this.setState({
      passwordFocus: false,
    });
  }

  userRegister(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;
    const { register } = this.props;
    if (this.validateFields()) {
      register(firstName, lastName, email, password);
    }
  }

  resendEmail(e) {
    e.preventDefault();
    const { resend, user } = this.props;
    const email = safeGet(user, 'email', '');
    resend(email);
  }

  goBackToLogin() {
    const { hideThankYouSignupContent } = this.props;
    NavigationService.goBack();
    hideThankYouSignupContent();
  }

  validateFields() {
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;
    let valid = true;
    if (firstName.length < 2) {
      this.setState({ firstNameInvalid: true });
      valid = false;
    } else {
      this.setState({ firstNameInvalid: false });
    }
    if (lastName.length < 2) {
      this.setState({ lastNameInvalid: true });
      valid = false;
    } else {
      this.setState({ lastNameInvalid: false });
    }
    if (!validateEmail(email)) {
      this.setState({ emailInvalid: true });
      valid = false;
    } else {
      this.setState({ emailInvalid: false });
    }
    if (!validatePassword(password)) {
      this.setState({ passwordInvalid: true });
      valid = false;
    } else {
      this.setState({ passwordInvalid: false });
    }

    return valid;
  }

  render() {
    const {
      firstNameInvalid,
      lastNameInvalid,
      emailInvalid,
      passwordInvalid,
      firstNameFocus,
      lastNameFocus,
      emailFocus,
      passwordFocus,
    } = this.state;
    const {
      closeEmailTakenModal,
      closeResendEmailModal,
      loading,
      user,
      emailTakenModalOpen,
      resendEmailModalOpen,
      thankYouSignupContentVisible,
    } = this.props;
    const email = safeGet(user, 'email', '');

    if (thankYouSignupContentVisible) {
      return (
        <View style={styles.container}>
          <Text style={styles.headlineSection}>
            {`THANK YOU\nFOR SIGNING\nUP!`}
          </Text>
          <Text style={styles.contentText}>
            {`An email confirmation has been sent to\n`}<Text style={{ fontWeight: 'bold' }}>{email}.</Text>{` Click on the confirmation\nlink in the email to activate your account.`}
          </Text>

          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.transparentButton} onPress={() => this.goBackToLogin()}>
              <Text style={styles.transaprentButtonText}>{`I’ve confirmed my account.\nProceed to login.`}</Text>
            </TouchableOpacity>
            <View style={styles.lineSeparator} />
            <TouchableOpacity style={styles.transparentButton} onPress={(e) => this.resendEmail(e)}>
              <Text style={styles.transaprentButtonText}>Resend Email</Text>
            </TouchableOpacity>
          </View>
          {loading && <Loader />}
          <ModalSimple
            isVisible={resendEmailModalOpen}
            onPress={closeResendEmailModal}
            headline={`Email Has Been Resent To\n${email}.`}
          />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: COLORS.WHITE }}>
        <View style={styles.container}>
          <Text style={styles.headlineSection}>
            {`CREATE A NEW\nACCOUNT`}
          </Text>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>
              First Name
            </Text>
            <TextInput
              style={[styles.fieldInput, firstNameInvalid && styles.fieldInpuInvalid, firstNameFocus && styles.fieldInputFocus]}
              underlineColorAndroid="transparent"
              placeholder="First Name"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.firstName}
              onChangeText={(text) => this.setState({ firstName: text })}
              placeholderTextColor={COLORS.DARKGREY}
              onBlur={() => this.onFirstNameBlur()}
              onFocus={() => this.onFirstNameFocus()}
              testID={'First Name Input Signup'}
            />
            {firstNameInvalid &&
            <Text style={styles.errorText}>
              Please enter your first name.
            </Text>
            }
            <View style={{ marginTop: 20 }}>
              <Text style={styles.fieldText}>
                Last Name
              </Text>
              <TextInput
                style={[styles.fieldInput, lastNameInvalid && styles.fieldInpuInvalid, lastNameFocus && styles.fieldInputFocus]}
                underlineColorAndroid="transparent"
                placeholder="Last Name"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.lastName}
                onChangeText={(text) => this.setState({ lastName: text })}
                placeholderTextColor={COLORS.DARKGREY}
                onBlur={() => this.onLastNameBlur()}
                onFocus={() => this.onLastNameFocus()}
                testID={'Last Name Input Signup'}
              />
              {lastNameInvalid &&
              <Text style={styles.errorText}>
                Please enter your last name.
              </Text>
              }
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.fieldText}>
                Email
              </Text>
              <TextInput
                style={[styles.fieldInput, emailInvalid && styles.fieldInpuInvalid, emailFocus && styles.fieldInputFocus]}
                underlineColorAndroid="transparent"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                placeholderTextColor={COLORS.DARKGREY}
                onBlur={() => this.onEmailBlur()}
                onFocus={() => this.onEmailFocus()}
                testID={'Email Input Signup'}
              />
              {emailInvalid &&
              <Text style={styles.errorText}>
                Please enter a valid email address.
              </Text>
              }
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.fieldText}>
                Password
              </Text>
              <TextInput
                style={[styles.fieldInput, passwordInvalid && styles.fieldInpuInvalid, passwordFocus && styles.fieldInputFocus]}
                secureTextEntry
                underlineColorAndroid="transparent"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                placeholderTextColor={COLORS.DARKGREY}
                onBlur={() => this.onPasswordBlur()}
                onFocus={() => this.onPasswordFocus()}
                testID={'Password Input Signup'}
              />
              <Text style={[styles.passwordNotes, passwordInvalid && styles.passwordNotesInvalid]}>
                Minimum 6 characters long with at least one letter and one number.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={(e) => this.userRegister(e)}
            testID={'Signup Button Signup'}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
          {loading && <Loader />}
          <ModalSimple
            isVisible={emailTakenModalOpen}
            onPress={closeEmailTakenModal}
            headline={`You can't register\nwith this email.`}
          />
        </View>
      </KeyboardAwareScrollView>
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
  headlineSection: {
    width: FIELDS_WIDTH,
    color: COLORS.BLACK,
    fontWeight: '300',
    fontFamily: 'BrandonText-Medium',
    fontSize: 36,
    marginTop: '5.5%',
    lineHeight: 40,
  },
  fields: {
    width: FIELDS_WIDTH,
    marginTop: 20,
  },
  passwordNotes: {
    color: COLORS.DARKGREY,
    marginTop: 5,
    fontFamily: 'BrandonText-Medium',
  },
  passwordNotesInvalid: {
    color: COLORS.RED,
  },
  fieldText: {
    width: '100%',
    textAlign: 'left',
    fontFamily: 'BrandonText-Medium',
  },
  fieldInput: {
    fontFamily: 'BrandonText-Medium',
    marginTop: 5,
    paddingLeft: 13,
    borderRadius: 3,
    backgroundColor: COLORS.LIGHTGREY3,
    height: INPUT_FIELDS_HEIGHT,
    paddingTop: 0,
    paddingBottom: 0,
  },
  fieldInputFocus: {
    borderColor: COLORS.GREEN,
    borderWidth: 1,
  },
  fieldInpuInvalid: {
    backgroundColor: COLORS.LIGHTRED,
    borderColor: COLORS.RED,
    borderWidth: 1,
  },
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 30,
  },
  signupText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: 'BrandonText-Medium',
  },
  errorText: {
    paddingTop: 5,
    color: COLORS.RED,
  },
  contentText: {
    marginTop: 15,
    width: FIELDS_WIDTH,
  },
  lineSeparator: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    marginTop: 25,
    marginBottom: 25,
    width: '80%',
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  transparentButton: {
  },
  transaprentButtonText: {
    color: COLORS.GREEN3,
    fontSize: 18,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) =>
  ({
    ui: state.ui,
    loading: state.loading,
    user: state.signup.user,
    emailTakenModalOpen: state.ui.emailTakenModalOpen,
    resendEmailModalOpen: state.ui.resendEmailModalOpen,
    thankYouSignupContentVisible: state.ui.thankYouSignupContentVisible,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    openResetPasswordModal,
    closeEmailTakenModal,
    register,
    resend,
    closeResendEmailModal,
    hideThankYouSignupContent,
    goBack,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
