import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { get as safeGet, isNil } from 'lodash';
import SideMenu from 'react-native-side-menu';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Menu from 'nintendoapp/js/components/common/Menu';
import { COLORS } from 'nintendoapp/js/constants/colors';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';
import { closeScanKitchenProblemModal, closeScanKitchenNoRecordModal } from 'nintendoapp/js/actions/uiActions';
import { addKitchen } from 'nintendoapp/js/actions/kitchenActions';
import { ltrim0 } from 'nintendoapp/js/utils/formating';
import NavigationService from 'nintendoapp/js/utils/navigation';
import Loader from 'nintendoapp/js/components/common/Loader';

/* Config/Constants
============================================================================= */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

/* eslint-disable global-require */

type Props = {
  dispatch: any,
  navigation: any;
  user: Object,
};

type State = {
  isOpen: boolean,
  selectedAboutItem: string,
};

export class ScanKitchenScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      testUpcCode: '',
    };
  }

  onMenuItemSelected = () =>
    this.setState({
      isOpen: false,
      testUpcCode: '',
    });

  onBarCodeRead = (e) => {
    const {
      user,
      addKitchen,
    } = this.props;
    const { testUpcCode } = this.state;
    const isEmulator = DeviceInfo.isEmulator();
    let upc_type = '';
    let upc_code;

    if (isEmulator) {
      upc_code = testUpcCode;
    } else {
      upc_type = e.type;
      upc_code = e.data;
    }

    if (upc_type === 'org.gs1.EAN-13' || upc_type === 'EAN_13') {
      upc_code = ltrim0(upc_code);
    }

    addKitchen(user, upc_code);
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    const { isOpen, testUpcCode } = this.state;
    const {
      currentKitchenVisible,
      scanKitchenProblemModalOpen,
      scanKitchenNoRecordModalOpen,
      closeScanKitchenNoRecordModal,
      closeScanKitchenProblemModal,
      loading,
      navigation,
    } = this.props;

    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={navigation} />;
    const currentKitchen = safeGet(this.props, 'currentKitchen', {});
    const companyName = safeGet(currentKitchen, 'company_name', '');
    const isEmulator = DeviceInfo.isEmulator();
    let timeoutGoToScanProduct = null;

    if (currentKitchenVisible) {
      timeoutGoToScanProduct = setTimeout(() => {
        NavigationService.resetState('ScanProduct');
      }, 2000);
    }

    return (
      <SideMenu
        menu={menu}
        isOpen={isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>
          <QRCodeScanner
            reactivate
            showMarker
            reactivateTimeout={3000}
            onRead={this.onBarCodeRead}
            cameraStyle={{ height: SCREEN_HEIGHT }}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            customMarker={
              <View style={styles.rectangleContainer}>
                <View style={styles.topOverlay}>
                  <View style={styles.logoWrapper}>
                    <Image
                      style={styles.logo}
                      source={require('nintendoapp/js/components/scan/img/logo.png')}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={this.toggle}
                    style={styles.menuButton}
                  >
                    <Image
                      source={require('nintendoapp/js/components/scan/img/menu.png')}
                      style={styles.menu}
                    />
                  </TouchableOpacity>
                  {isEmulator &&
                    <View style={styles.testWrapper}>
                      <TextInput
                        style={{ width: 300, backgroundColor: COLORS.LIGHTGREY, height: 35 }}
                        placeholder="Upc kitchen number"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.LIGHTGREY}
                        value={testUpcCode}
                        onChangeText={(text) => this.setState({ testUpcCode: text })}
                        testID={'Upc Kitchen Number Scan Kitchen'}
                      />
                    </View>
                  }
                  {isEmulator && !currentKitchenVisible &&
                    <View style={[styles.testWrapper, { top: 150 }]}>
                      <TouchableOpacity
                        testID={'Apply Button Scan Kitchen'}
                        style={styles.testButton}
                        onPress={() => this.onBarCodeRead()}
                      >
                        <Text style={styles.testText}>Apply</Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.leftAndRightOverlay} />
                  <View style={styles.rectangle}>
                    {loading && <Loader white />}
                  </View>
                  <View style={styles.leftAndRightOverlay} />
                </View>
                <View style={styles.bottomOverlay}>
                  <View style={styles.scanTextWrapper}>
                    <Text style={styles.scanText}>Scan kitchen QR code</Text>
                  </View>
                  {currentKitchenVisible &&
                    <View
                      style={styles.kitchen}
                    >
                      <Text style={styles.kitchenText}>{companyName}</Text>
                      <View style={{ marginLeft: 15 }}>
                        <Image
                          source={require('nintendoapp/js/components/scan/img/check.png')}
                          style={styles.check}
                        />
                      </View>
                    </View>
                    }
                  {(!isNil(currentKitchen.company_id) && !isNil(currentKitchen.company_name)) &&
                    <TouchableOpacity
                      style={styles.scanProductsButton}
                      testID={'Scan Products Button Scan Kitchen'}
                      onPress={() => {
                        clearTimeout(timeoutGoToScanProduct);
                        NavigationService.resetState('ScanProduct');
                        }
                      }
                    >
                      <Text style={styles.scanProductsText}>{`Scan products`}</Text>
                    </TouchableOpacity>
                    }
                </View>
              </View>
            }
          />
          <ModalSimple
            isVisible={scanKitchenNoRecordModalOpen}
            onPress={closeScanKitchenNoRecordModal}
            headline={`Sorry But The\nKitchen Code Is\nNot Valid.`}
            testID={'Modal Kitchen Code Not Valid Login'}
          />
          <ModalSimple
            isVisible={scanKitchenProblemModalOpen}
            onPress={closeScanKitchenProblemModal}
            headline={`There Was\nA Connection Issue.\nPlease Try Again.`}
          />
        </View>
      </SideMenu>
    );
  }
}

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * (SCREEN_RATIO < 1.7 ? 0.55 : 0.65); // this is equivalent to 255 from a 393 device width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BLACK,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 10,
  },
  menu: {
    width: 30,
    height: 30,
  },
  kitchen: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.30,
    backgroundColor: 'rgba(255,255,255,0.19)',
    padding: 7,
    borderRadius: 50,
  },
  kitchenText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    paddingLeft: 10,
    maxWidth: '75%',
  },
  scanTextWrapper: {
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  scanText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 26,
    marginBottom: 20,
  },
  logoWrapper: {
    position: 'absolute',
    zIndex: 100,
    top: 53,
  },
  logo: {
    width: 126,
    height: 36,
  },
  check: {
    width: 22,
    height: 16,
  },
  cameraPreview: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  scanProductsButton: {
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
  },
  scanProductsText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
  },
  testWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1010,
    top: 100,
    width: 300,
  },
  testUpc: {
    width: 300,
    backgroundColor: COLORS.LIGHTGREY,
    height: 35,
  },
  testButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: 100,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
  },
  testText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftAndRightOverlay: {
    height: SCREEN_WIDTH * (SCREEN_RATIO < 1.7 ? 0.60 : 0.70),
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },
});

const mapStateToProps = (state) =>
  ({
    scanKitchenNoRecordModalOpen: state.ui.scanKitchenNoRecordModalOpen,
    scanKitchenProblemModalOpen: state.ui.scanKitchenProblemModalOpen,
    currentKitchen: state.kitchen.currentKitchen,
    currentKitchenVisible: state.kitchen.currentKitchenVisible,
    loading: state.loading,
    user: state.auth.user,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    closeScanKitchenProblemModal,
    closeScanKitchenNoRecordModal,
    addKitchen,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScanKitchenScreen);
