import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de Gastos</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    texto:{
        textAlign:'center',
        fontSize:31,
        color: '#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
    }
});

export default Header