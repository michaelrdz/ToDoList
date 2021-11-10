import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
//import { INFO_PAGE_STYLES as styles } from "./Info.styles";
//import { TEXT_STYLES as textStyles } from "../../styles/text.styles";

import { auth } from "../../firebase";
  
const ToDoScreen = ({}) => {

  return (
    // Vista ToDo List
    <View style={styles.container}>
        <Text>
            Aquí va la lista de tareas (Agregar, cambiar estado, editar titulo, eliminar)
        </Text>
        <Text>Email:{auth.currentUser?.email}</Text>
        <Text>User ID (UID):{auth.currentUser?.uid}</Text>
    </View>
  );
};
export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});