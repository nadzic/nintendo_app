import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get as safeGet, last, capitalize, isEmpty } from 'lodash';
import SideMenu from 'react-native-side-menu';
import DeviceInfo from 'react-native-device-info';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Menu from 'nintendoapp/js/components/common/Menu';
import { COLORS } from 'nintendoapp/js/constants/colors';
import ModalSimple from 'nintendoapp/js/components/common/ModalSimple';
import { closeScanProductProblemModal, closeScanProductNoRecordModal } from 'nintendoapp/js/actions/uiActions';
import { addProduct } from 'nintendoapp/js/actions/cartActions';
import { getIndexInUpcs, alreadyInProducts } from 'nintendoapp/js/utils/calculation';
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
  upcs: Array,
  products: Array,
  user: Object,
  currentKitchen: Object,
};

type State = {
  isOpen: boolean,
  selectedAboutItem: string,
};

export class ScanProductScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  onMenuItemSelected = () =>
    this.setState({
      isOpen: false,
      testUpcCode: '',
    });

  onBarCodeRead = (e) => {
    const {
      addProduct,
      user,
      products,
      upcs,
      currentKitchen,
    } = this.props;
    const { testUpcCode } = this.state;
    const isEmulator = DeviceInfo.isEmulator();
    const { auth_token } = user;
    const company_id = safeGet(currentKitchen, 'company_id', '');
    const lastProduct = last(products);
    let productId = 0;
    let upc_type = '';
    let upc_code;

    if (isEmulator) {
      upc_code = testUpcCode;
    } else {
      upc_type = e.type;
      upc_code = e.data;
    }

    // example of upcs: '899587003128', '898248001572', '894455000254'

    if (lastProduct) {
      productId = lastProduct.id + 1;
    }

    if (upc_type === 'org.gs1.EAN-13' || upc_type === 'EAN_13') {
      upc_code = ltrim0(upc_code);
    }

    if (alreadyInProducts(upc_code, products)) {
      const index = getIndexInUpcs(upc_code, upcs);
      addProduct(auth_token, upc_code, company_id, productId, true, index);
    } else {
      addProduct(auth_token, upc_code, company_id, productId, false, 0);
    }
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
      products,
      loading,
      currentProductVisible,
      scanProductProblemModalOpen,
      scanProductNoRecordModalOpen,
      currentKitchen,
      closeScanProductNoRecordModal,
      closeScanProductProblemModal,
      navigation
    } = this.props;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={navigation} />;
    const currentProduct = safeGet(this.props, 'currentProduct', {});
    const companyName = capitalize(safeGet(currentKitchen, 'company_name', ''));
    const isEmulator = DeviceInfo.isEmulator();

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
                      source={require('./img/logo.png')}
                      testID={'Logo Dark Scan Product'}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={this.toggle}
                    style={styles.menuButton}
                    testID={'Menu Scan Product'}
                  >
                    <Image
                      source={require('./img/menu.png')}
                      style={styles.menu}
                    />
                  </TouchableOpacity>
                  <View style={styles.kitchenWrapper}>
                    <Text style={styles.kitchen}>For {companyName}</Text>
                  </View>
                  {isEmulator &&
                  <View style={styles.testWrapper}>
                    <TextInput
                      style={styles.testUpc}
                      placeholder="Upc product number"
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      placeholderTextColor={COLORS.LIGHTGREY}
                      value={testUpcCode}
                      onChangeText={(text) => this.setState({ testUpcCode: text })}
                      testID={'Upc Product Number Scan Product'}
                    />
                  </View>
                }
                  {isEmulator && isEmpty(currentProduct) &&
                  <View style={[styles.testWrapper, { top: 150 }]}>
                    <TouchableOpacity
                      style={styles.testButton}
                      onPress={() => this.onBarCodeRead()}
                      testID={'Apply Button Scan Product'}
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
                    <Text style={styles.scanText}>Scan product barcode</Text>
                  </View>
                  {currentProductVisible &&
                  <View style={styles.product}>
                    <View style={styles.productImageWrap}>
                      <Image
                        source={{ uri: currentProduct.imageUrl }}
                        style={styles.productImage}
                      />
                    </View>
                    <Text style={styles.productText}>{`${currentProduct.name} \n$${currentProduct.price}`}</Text>
                    <View style={{ marginLeft: 15 }}>
                      <Image
                        source={require('./img/check.png')}
                        style={styles.check}
                      />
                    </View>
                  </View>}
                  {products.length > 0 &&
                    <TouchableOpacity
                      style={styles.checkoutButton}
                      onPress={() => NavigationService.resetState('ShoppingCart')}
                    >
                      <Text style={styles.checkoutText}>{`Checkout ${products.length} ${products.length === 1 ? 'item' : 'items'}`}</Text>
                    </TouchableOpacity>
                    }
                </View>
              </View>
            }
          />
          <ModalSimple
            isVisible={scanProductNoRecordModalOpen}
            onPress={closeScanProductNoRecordModal}
            headline={`This Product Is Not\nCarried By Our\nKitchen Service.`}
            testID={'Modal Product Code Not Valid Login'}
          />
          <ModalSimple
            isVisible={scanProductProblemModalOpen}
            onPress={closeScanProductProblemModal}
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
  product: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.28,
    backgroundColor: 'rgba(255,255,255,0.19)',
    padding: 7,
    borderRadius: 50,
  },
  productImageWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 27,
    height: 27,
  },
  productText: {
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
    fontFamily: 'BrandonText-Medium',
  },
  scanText: {
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
  kitchenWrapper: {
    position: 'absolute',
    zIndex: 100,
    top: SCREEN_WIDTH * 0.40,
  },
  kitchen: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 16,
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
  checkoutButton: {
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
  },
  checkoutText: {
    fontFamily: 'BrandonText-Medium',
    color: COLORS.WHITE,
    fontSize: 20,
  },
  testWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
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
    ui: state.ui,
    scanProductNoRecordModalOpen: state.ui.scanProductNoRecordModalOpen,
    scanProductProblemModalOpen: state.ui.scanProductProblemModalOpen,
    products: state.cart.products,
    quantities: state.cart.quantities,
    upcs: state.cart.upcs,
    currentProduct: state.product.currentProduct,
    currentProductVisible: state.product.currentProductVisible,
    loading: state.loading,
    user: state.auth.user,
    currentKitchen: state.kitchen.currentKitchen,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    closeScanProductProblemModal,
    closeScanProductNoRecordModal,
    addProduct,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScanProductScreen);

