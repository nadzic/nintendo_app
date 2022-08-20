import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Email } from 'react-native-openanything';
import { get as safeGet, capitalize } from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { COLORS } from 'nintendoapp/js/constants/colors';
import { APP_VERSION } from 'nintendoapp/js/constants/version';
import NavigationService from 'nintendoapp/js/utils/navigation';
import { logout } from 'nintendoapp/js/actions/userActions';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
  logout: any,
  navigation: any,
};

export class Menu extends Component<Props> {
  onSupportClick = (emailTo) => {
    const { user } = this.props;
    const userEmail = safeGet(user, 'email', '');
    const email = emailTo;
    const subject = 'Nintendo: Feedback/Questions';
    const device = `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`;
    const osVersion = `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`;
    const appVersion = APP_VERSION;
    const body = `Please explain your feedback or questions as detailed as you can, thank you!

    ----
    Device: ${device}
    OS version: ${osVersion}
    User: ${userEmail}
    App version: ${appVersion}`;

    Email(email, subject, body).catch(err => console.error(err));
  }

  userLogout(e) {
    e.preventDefault();
    const { logout } = this.props;
    logout();
  }

  goToScanKitchen(e) {
    e.preventDefault();
    NavigationService.resetState('ScanKitchen');
  }

  render() {
    const { user, currentKitchen } = this.props;
    const email = safeGet(user, 'email', '');
    const appVersion = APP_VERSION;
    const company_name = capitalize(safeGet(currentKitchen, 'company_name', ''));
    return (
      <ScrollView scrollsToTop={false} style={styles.container}>
        <View style={styles.versionNameSection}>
          <Text style={styles.versionText}>VERSION {appVersion}</Text>
          <Text style={styles.nameText}>{email}</Text>
        </View>
        <View style={styles.content}>
          <Text
            onPress={(e) => this.goToScanKitchen(e)}
            style={styles.item}
            testID={'Kitchen Menu'}
          >
            Kitchen{company_name && `: ${company_name}`}
          </Text>
          <View style={styles.lineSeparator} />
          <Text
            onPress={(e) => this.userLogout(e)}
            style={styles.item}
          >
            Log Out
          </Text>
          <View style={styles.lineSeparator} />
          <View>
            <Text style={styles.headlineText}>Customer support</Text>
            <TouchableOpacity
              onPress={() => this.onSupportClick('customer+kiosk@ohmygreen.com')}
            >
              <Text style={styles.emailText}>customer@ohmygreen.com</Text>
            </TouchableOpacity>
            <Text style={[styles.headlineText, { marginTop: 20 }]}>Tech support</Text>
            <TouchableOpacity
              onPress={() => this.onSupportClick('tech+kiosk@ohmygreen.com')}
            >
              <Text style={styles.emailText}>tech@ohmygreen.com</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: COLORS.WHITE,
  },
  versionNameSection: {
    backgroundColor: COLORS.GREEN,
    flex: 1,
    justifyContent: 'flex-end',
    width: '80%',
    height: 90,
    paddingLeft: 18,
    paddingBottom: 14,
  },
  nameText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 18,
  },
  versionText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 13,
  },
  item: {
    fontSize: 18,
    fontFamily: 'BrandonText-Medium',
  },
  content: {
    paddingLeft: 18,
    paddingRight: (WINDOW_WIDTH * 0.33) + 18,
    paddingTop: 36,
  },
  lineSeparator: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    marginTop: 19.5,
    marginBottom: 20,
  },
  headlineText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.GREY2,
    fontSize: 14,
  },
  emailText: {
    color: COLORS.GREEN2,
    fontSize: 16,
    fontFamily: 'BrandonText-Bold',
  },
});

const mapStateToProps = (state) =>
  ({
    user: state.auth.user,
    currentKitchen: state.kitchen.currentKitchen,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    logout,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
