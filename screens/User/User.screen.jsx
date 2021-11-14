import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/core";
//import { INFO_PAGE_STYLES as styles } from "./Info.styles";
//import { TEXT_STYLES as textStyles } from "../../styles/text.styles";
import usrPic from "../../media/images/usr_profpic.png";

import { auth, firebase } from "../../firebase";
import 'firebase/storage';

let usrID = auth.currentUser?.uid;

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

  /*IMAGE PICKER */

  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');

  useEffect(()=> {
    console.log("Rendereo uri: "+pickedImagePath);
    searchImage();
  }, [pickedImagePath]);

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
      uploadImage(result.uri)
      .then(resolve => {
        let ref = firebase.storage().ref().child("users/"+usrID);
        ref.put(resolve).then(resolve => {
          console.log("Imagen subida");
        }).catch(error => {
          console.log("Error al subir imagen");
        });
        /*console.log("Mi Blob");
        console.log(JSON.stringify(resolve));*/
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  uploadImage = (uri) => {
    return new Promise((resolve, reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    });
  }

  searchImage = async () => {
    firebase.storage().ref("users/"+usrID).getDownloadURL()
    .then(resolve => {
      console.log("imagen encontrada");
      setPickedImagePath(resolve);
      //console.log(resolve);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    // Vista ToDo List
    /*<View style={styles.container}>
        <Text>
            Aquí va la info del usuario 
            (foto, cambiar foto (librería: React Native Image Picker), Nombre del usuario, correo y cerrar sesión)
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
    </View>*/
    <View style={styles.screen}>
      <View style={styles.screen}>
          {
            pickedImagePath !== '' ? <Image
            source={{ uri: pickedImagePath }}
            style={styles.usrPic}
            />:
            <Image
            source={usrPic}
            style={styles.usrPic}
            />
           }
          <Text>Email:{auth.currentUser?.email}</Text>
          <Text>User ID (UID):{usrID}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>

      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />
        }
      </View>
    </View>
  );
};
export default UserScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
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
  usrPic: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  }
});