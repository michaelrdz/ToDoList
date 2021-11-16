import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ToDoScreen from "../../screens/ToDo";
import UserScreen from "../../screens/User";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth } from "../../firebase";
const HomePage = () => {
  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();
  
  /*const [user, setUserId] = useState();
  setUserId(auth.currentUser?.email);*/
  
  // We will make a simple call to auth.signOut() which is also a promise based function and if it fullfills
  // we redirect the user to Login
  /*const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };*/

  return (
    //Vista elemento padre
    <Tab.Navigator 
      screenOptions={({route})=>({
        tabBarIcon:({focused, color, size})=> {
          let iconName;

          if(route.name === "ToDoScreen") {
            iconName = focused 
            ? "ios-list"
            : "ios-list-outline"
          }else if(route.name === "UserScreen"){
            iconName = focused 
            ? "person-circle"
            : "person-circle-outline"
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: "#f18698",
        tabBarActiveTintColor: "grey"
      })}>
        <Tab.Screen name="ToDoScreen" children={()=> <ToDoScreen />} />
        <Tab.Screen name="UserScreen" children={()=> <UserScreen />} />

      </Tab.Navigator>
    /*<View style={styles.container}>
      <Text>Email:{auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>*/
  );
};
export default HomePage;

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
