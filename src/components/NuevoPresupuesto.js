import React from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'

import globalStyles from '../styles/index'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, handleNuevoPresupuesto}) => {

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType='number-pad'
        placeholder='Agrega tu presupuesto'
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
      />

      <Pressable 
        onPress={() => handleNuevoPresupuesto(presupuesto)}
        style={styles.btn}
      >
          <Text style={styles.btnTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    label:{
        textAlign:'center',
        color: '#3B82F6',
        fontSize:24,
        fontWeight:'600'
    },
    input:{
        backgroundColor:'#f5f5f5',
        padding: 10,
        borderRadius:10,
        marginTop:30,
        textAlign:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,

        elevation: 1,
    },
    btn:{
        marginTop:30,
        backgroundColor:'#1048a4',
        padding: 10,
        borderRadius:10,
    },
    btnTexto:{
        color: '#fff',
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'bold'
    }
});

export default NuevoPresupuesto