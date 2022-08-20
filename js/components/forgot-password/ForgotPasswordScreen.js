import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { COLORS } from 'nintendoapp/js/constants/colors';
import { openResetPasswordModal, closeInvalidEmailFPModal } from 'nintendoapp/js/actions/uiActions';
import { reset } from 'nintendoapp/js/actions/userActions';
import NavigationService from 'nintendoapp/js/utils/navigation';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';
import Loader from 'nintendoapp/js/components/common/Loader';

/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const INPUT_FIELDS_HEIGHT = 66;

type Props = {
  loading: boolean,
  invalidEmailFPModalOpen: boolean,
};

type State = {
  email: String,
};

export class ForgotPasswordScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Forgot Password',
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
          source={require('nintendoapp/js/components/forgot-password/img/close.png')}
        />
      </TouchableOpacity>,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  resetPassword() {
    const { email } = this.state;
    const { reset } = this.props;
    if (email) {
      reset(email);
    }
  }

  render() {
    const {
      closeInvalidEmailFPModal,
      loading,
      invalidEmailFPModalOpen,
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.headlineSection}>
            {`Enter your email address and further instructions will be sent there.`}
        </Text>
        <View style={styles.emailSection}>
          <Image source={require('./img/email.png')} style={styles.emailImage} />
          <TextInput
            style={styles.emailInput}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            testID={'Email Input Forgot Password'}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.resetPassword()}
          testID={'Submit Button Forgot Password'}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
        {loading && <Loader />}
        <ModalSimple
          isVisible={invalidEmailFPModalOpen}
          onPress={closeInvalidEmailFPModal}
          headline={`Invalid Email.\nPlease Try Again.`}
          testID={'Invalid Email Modal Forgot Password'}
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
  headlineSection: {
    fontFamily: 'BrandonText-Medium',
    width: FIELDS_WIDTH,
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    marginTop: '5.5%',
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 30,
  },
  submitText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
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
    left: 0,
    bottom: 16,
  },
  emailInput: {
    fontFamily: 'BrandonText-Medium',
    width: FIELDS_WIDTH,
    height: INPUT_FIELDS_HEIGHT,
    backgroundColor: 'transparent',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 46,
    paddingLeft: 40,
    fontSize: 18,
  },
});

const mapStateToProps = (state) =>
  ({
    invalidEmailFPModalOpen: state.ui.invalidEmailFPModalOpen,
    loading: state.loading,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    openResetPasswordModal,
    closeInvalidEmailFPModal,
    reset,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
