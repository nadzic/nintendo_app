import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { get as safeGet } from 'lodash';
import { connect } from 'react-redux';
import Loader from 'nintendoapp/js/components/common/Loader';
import { COLORS } from 'nintendoapp/js/constants/colors';
import { REQUEST_LOGIN_SUCCESS, REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS } from 'nintendoapp/js/actions/actionTypes';

export class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: true,
    };
  }

  componentDidMount() {
    const {
      user,
      navigation,
      dispatch
    } = this.props;

    const kitchen = {
      company_name: safeGet(user, 'company_name', null),
      company_id: safeGet(user, 'company_id', null),
    };

    dispatch({ type: REQUEST_LOGIN_SUCCESS, user });
    dispatch({ type: REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS, kitchen });

    if (!user) {
      navigation.navigate('Login');
    } else if (user && !user.company_name) {
      navigation.navigate('ScanKitchen');
    } else {
      navigation.navigate('ScanProduct');
    }
  }

  doneClosePress = () => {
    const { goToLogin } = this.props;
    goToLogin();
  }


  render() {

    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    height: '100%',
  },
});

const mapStateToProps = (state) =>
  ({
    user: state.auth.user,
  });

export default connect(mapStateToProps, null)(AuthLoadingScreen);
