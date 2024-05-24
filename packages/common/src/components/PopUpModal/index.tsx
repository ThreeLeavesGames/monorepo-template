import React, { ReactNode, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

const PopUpModal = (props:{children:ReactNode}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            setModalVisible((val) => !val);
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 10,
                borderRadius:10
              }}
            >
              {props.children}
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default PopUpModal;
