
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from 'nintendoapp/js/constants/colors';

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;

const ModalSimple = (props) => {
  const {
    isVisible,
    onPress,
    headline,
    content,
    testID,
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => onPress()}
      style={styles.modalContainer}
    >
      <View style={styles.modalMainSection} testID={testID}>
        {headline && <Text style={styles.modalHeadlineText}>{headline}</Text>}
        {content && <Text style={styles.modalContentText}>{content}</Text>}
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => onPress()}
        >
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: 'BrandonText-Medium',
  },
  modalContentText: {
    marginTop: 17,
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.GREY2,
    fontFamily: 'BrandonText-Medium',
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
    fontFamily: 'BrandonText-Medium',
  },
});

export default ModalSimple;

