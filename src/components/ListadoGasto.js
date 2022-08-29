import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Gasto from './Gasto'

const ListadoGasto = ({gastos, setModal, setGasto, filtro, gastosFiltrados}) => {
  return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>ListadoGasto</Text>


        {filtro ? gastosFiltrados.map(gasto => (
            <Gasto
                key={gasto.id}
                gasto={gasto}
                setModal={setModal}
                setGasto={setGasto}
            />
        )) : gastos.map(gasto => (
            <Gasto
                key={gasto.id}
                gasto={gasto}
                setModal={setModal}
                setGasto={setGasto}
            />
        ))}

        {
            (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && ( 
                <Text style={styles.noGastos}>No Hay gastos</Text>
            )
        }
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        marginTop:30,
        marginBottom:100,
    },
    titulo:{
        color: '#64748b',
        fontSize:30,
        textAlign:'center',
        fontWeight:'700',
        marginTop:20,
    },
    noGastos:{
        marginTop:20,
        textAlign:'center',
        fontSize:20,
        marginVertical:20,
    }
});

export default ListadoGasto