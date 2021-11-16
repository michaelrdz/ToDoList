import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth, database } from "../../firebase";
import logo from "../../media/images/utags.png";

const SingUpScreen = ({setRegistroVisible}) => {
    // Our app will contain 2 states, the email and password with an empty string as initial value
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const userInfo = {"Nombre":""};
  
    // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
    //const navigation = useNavigation();
  
    // Use Effect is a hook that listen to side effects, we can use it in 3 ways:
    // -Without dependency array: it will execute on each render
    // -With an empty dependency array: it will execute only on the first render
    // -With a dependency array with dependecies: it will execute when the dependecies change
  
    /*useEffect(() => {
      // We call the function onAuthStateChanged which is a listener that will be checking for changes on the current
      // state of authentiation.
      const unsuscribe = auth.onAuthStateChanged((user) => {
        // When the auth changes we will receive a user
        if (user) {
          // if there is a valid user we will replace the current screen for the Home one.
          navigation.replace("Home");
        }
      });
      // When the component unmounts we return the same constant to unsuscribe to the listener
      return unsuscribe;
    }, []);*/
    // This comments apply for both functions, you just need to change the name of the function called from auth
    // We use two function(createUserWithEmailAndPassword,signInWithEmailAndPassword ) from the auth instance
    // It receives email and password and creates or authenticate a new account on firebase
  
    // This is a promise based function, so we can call it in two ways:
    // -With a then/catch syntax (as we did in this app)
    // -With an async/await aproach: (as below)
    // try {
    //   const userCredentials = await auth.createUserWithEmailAndPassword(
    //     email,
    //     pdw
    //   );
    //   const user = userCredentials.user;
    //   console.log(user.email);
    // } catch (error) {
    //   alert(error.message);
    // }
    // in order to the last example to work the function must be declared with the async keyword:
    // const handleSignup = async()=>{}
  
    // A promise is a function tha will execute and return something in the future
    // it has 3 posible status:
    // - pending:  when the promise execute and we don't know the final status yet
    // - fullfilled: when the promise executed correctly
    // - rejected: when there is an error or we reject the promise because it didn't return the expected result
    const handleSignup = () => {
      auth
        .createUserWithEmailAndPassword(email, pwd)
        .then((userCredentials) => {
          // then is a fullfilled promise
          const user = userCredentials.user;
          console.log(user.email);
          console.log("UID");
          console.log(user.uid);
          crearUsuarios(user.uid);
        })
        .catch((error) => {
          // catch is a rejected promise
          alert(error.message);
        });
        setRegistroVisible(false);
    };

    const crearUsuarios = (ID) => {
        userInfo.Nombre = name;
        database
        .ref()
        .child("Usuarios/"+ID)
        .set(userInfo);
      };
    
    return (
      // KeyboardAvoidingView is a type of view that will push the content up when a keyboard shows
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <Image source={logo} style={styles.logo} />
          <TextInput
            placeholder="Nombre completo"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignup}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  export default SingUpScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#0782F9",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "#0782F9",
      borderWidth: 2,
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
    logo: {
      width: 220,
      height: 220,
      marginLeft: 40,
      marginBottom: 20,
    },
  });