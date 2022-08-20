import React, { Component } from 'react';
import {
  View,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { COLORS } from 'nintendoapp/js/constants/colors';
import {
  closeResetPasswordModal,
  closeInvalidCredentialsModal,
  closeUserNotConfirmedModal,
  closeUserNotRegisteredModal,
} from 'nintendoapp/js/actions/uiActions';
import { login, logout } from 'nintendoapp/js/actions/userActions';
import NavigationService from 'nintendoapp/js/utils/navigation';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';
import Loader from 'nintendoapp/js/components/common/Loader';
import Link from 'nintendoapp/js/components/login/Link';
/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const INPUT_FIELDS_HEIGHT = 66;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type Props = {
  dispatch: any,
  navigation: any,
  login: any,
  loading: boolean,
};

type State = {
  email: String,
  password: String,
};

export class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  userLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;
    if (email && password) {
      login(email, password);
    }
  }

  render() {
    const {
      closeResetPasswordModal,
      closeInvalidCredentialsModal,
      closeUserNotRegisteredModal,
      userNotConfirmedModalOpen,
      userNotRegisteredModalOpen,
      closeUserNotConfirmedModal,
      invalidCredentialsModalOpen,
      resetPasswordModalOpen,
      loading,
    } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
        <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('./img/bg.png')}
          >
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('./img/logo-white.png')}
                testID={'Logo White Login'}
              />
            </View>
            <View style={{ marginBottom: SCREEN_HEIGHT > 800 ? '45%' : '30%', width: '88%' }}>
              <View style={{ position: 'relative' }}>
                <View style={styles.emailSection}>
                  <Image
                    source={require('./img/email.png')}
                    style={styles.emailImage}
                  />
                  <TextInput
                    style={styles.emailInput}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholderTextColor={COLORS.LIGHTGREY}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    testID={'Email Input Login'}
                  />
                </View>
                <View style={styles.lineSeparator} />
                <View style={styles.passwordSection}>
                  <Image
                    source={require('./img/password.png')}
                    style={styles.passwordImage}
                  />
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={COLORS.LIGHTGREY}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    testID={'Password Input Login'}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={(e) => this.userLogin(e)}
                testID={'Log In Button Login'}
              >
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
              <View style={styles.createForgetSection}>
                <Link
                  navFunction={() => NavigationService.navigate('Signup')}
                  text="Create an Account"
                  testID={'Create Account Login'}
                />
                <Text style={styles.separator}>&#124;</Text>
                <Link
                  navFunction={() => NavigationService.navigate('ForgotPassword')}
                  text="Forgot Password?"
                  testID={'Forgot Password Login'}
                />
              </View>
            </View>
            {loading && <Loader />}
            <ModalSimple
              isVisible={resetPasswordModalOpen}
              onPress={closeResetPasswordModal}
              headline={`Reset Password\nInstructions Sent.`}
              content='Check your email to complete.'
              testID={'Modal Reset Password Login'}
            />
            <ModalSimple
              isVisible={userNotRegisteredModalOpen}
              onPress={closeUserNotRegisteredModal}
              headline={`We Can't Find\nAn Account With\nThis Email.\nPlease Sign Up Instead.`}
              testID={'Modal Not Registred Login'}
            />
            <ModalSimple
              isVisible={userNotConfirmedModalOpen}
              onPress={closeUserNotConfirmedModal}
              headline={`This Email Is Registered\nBut Needs To Be Confirmed.`}
              testID={'Modal Not Confirmed Login'}
            />
            <ModalSimple
              isVisible={invalidCredentialsModalOpen}
              onPress={closeInvalidCredentialsModal}
              headline={`Invalid Password.\nPlease Try Again.`}
              testID={'Modal Invalid Password Login'}
            />
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    marginTop: 65,
    marginBottom: 65,
    zIndex: 100,
    width: 160,
    height: 34,
  },
  logo: {
    width: 160,
    height: 34,
  },
  createForgetSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 18,
  },
  lineSeparator: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    width: '88%',
    position: 'absolute',
    top: 65,
    left: '6%',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: '100%',
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 30,
  },
  emailSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emailImage: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    position: 'absolute',
    left: 25,
    bottom: 16,
    zIndex: 100,
  },
  emailInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 60,
    fontSize: 18,
    fontFamily: 'BrandonText-Medium',
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  passwordImage: {
    margin: 5,
    height: 24,
    width: 24,
    position: 'absolute',
    left: 25,
    bottom: 17,
    zIndex: 100,
  },
  passwordInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 60,
    fontSize: 18,
    fontFamily: 'BrandonText-Medium',
  },
  loginText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: 'BrandonText-Medium',
  },
  separator: {
    color: COLORS.WHITE,
    paddingLeft: 15,
    paddingRight: 15,
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
  modalContentText: {
    marginTop: 17,
    fontSize: 18,
    textAlign: 'center',
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 25,
    marginBottom: 30,
  },
  modalButtonText: {
    color: COLORS.WHITE,
    fontSize: 20,
  },
});

const mapStateToProps = (state) =>
  ({
    userNotRegisteredModalOpen: state.ui.userNotRegisteredModalOpen,
    invalidCredentialsModalOpen: state.ui.invalidCredentialsModalOpen,
    userNotConfirmedModalOpen: state.ui.userNotConfirmedModalOpen,
    resetPasswordModalOpen: state.ui.resetPasswordModalOpen,
    loading: state.loading,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    closeResetPasswordModal,
    closeUserNotRegisteredModal,
    closeUserNotConfirmedModal,
    closeInvalidCredentialsModal,
    login,
    logout,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
