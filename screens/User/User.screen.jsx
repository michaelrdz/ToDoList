import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
//import { INFO_PAGE_STYLES as styles } from "./Info.styles";
//import { TEXT_STYLES as textStyles } from "../../styles/text.styles";

import { auth } from "../../firebase";

const UserScreen = ({}) => {

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    // Vista ToDo List
    <View style={styles.container}>
        <Text>
            Aquí va la info del usuario 
            (foto, cambiar foto (librería: React Native Image Picker), Nombre del usuario, correo y cerrar sesión)
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
  );
};
export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});