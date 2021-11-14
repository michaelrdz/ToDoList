import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput  } from "react-native";
import { auth, database } from "../../firebase";

  
const ToDoScreen = ({}) => {

   //*** */
  //const [usuario, setUsuario] = useState();
  //const data = { "ID": "", "Email": "" };
  const item = {"Titulo":"", "Estado":"Desactivar"};
  const [titulo, setTitulo] = useState();

  useEffect(() => {
    // database
    //   .ref()
    //   .child("Usuarios")
    //   .on(
    //     "value",
    //     (data) => {
    //       const datas = data.val();
    //       console.log(data);
    //     },
    //     []
    //   );

    listarItems();
  });

  // Nuevo Item
  const crearItem = () => {
    const todoRef = database.ref("Usuarios/"+auth.currentUser?.uid+"/Items");
    item.Titulo = titulo;
    todoRef.push(item);
    console.log(item);
  };
  
  // Consultar la informacion
  const listarItems = () => {
    const todoRef = database.ref("Usuarios/"+auth.currentUser?.uid+"/Items");
    todoRef.on("value", (snapshot) => {
      const items= snapshot.val();
      const itemListar= [];
      for (let id in items) {
          itemListar.push({id, ...items[id] });
      }
      //setItemListar(itemListar);
      console.log(itemListar);
    } )
  };

    // Modificar Item
    const modificarItem = ( ID, tit, estado ) => {
      const todoRef = database.ref("Usuarios/"+usauth.currentUser?.uiduario+"/Items").child(ID);
      todoRef.update({
        Titulo: tit, Estado: estado,
      });
      listarItems();
    };

  // Eliminar Item
  const eliminarItem = ( ID ) => {
    const todoRef = database.ref("Usuarios/"+auth.currentUser?.uid+"/Items").child(ID);
    todoRef.remove();
    listarItems();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setTitulo(text)}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity
        onPress={() => {crearItem()}}
        //onPress={() => { handleLogin(); listarItems()}}
        //onPress={() => { handleLogin(); modificarItem("-MoEluHUTfaNhfhFoYsW", "SSSSSSS", "ACTIVAR")}}
        //onPress={() => { handleLogin(); eliminarItem("-MoEniIk0lDPbJzhNjKs")}}
        style={{ backgroundColor: "red", height:100, width:200, alignItems:"center", justifyContent: "center", }}
      >
        <Text>PROBAR</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};
export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});