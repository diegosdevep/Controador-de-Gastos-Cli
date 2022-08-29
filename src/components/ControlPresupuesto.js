import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import globalStyles from '../styles/index'
import {formatearCantidad} from '../helpers/index'
import CircularProgress from 'react-native-circular-progress-indicator'

const ControlPresupuesto = ({presupuesto, gastos, resetearApp}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => 
            Number(gasto.cantidadGasto) + total, 0)
        const totalDisponible = presupuesto - totalGastado
        
        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto * 100)
        )

        setPorcentaje(nuevoPorcentaje)
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])
    


  return (
    <View style={styles.contenedor}>
        <View style={styles.centrarGrafica}>
            <CircularProgress
                value={porcentaje}
                duration={1000}
                radius={150}
                valueSuffix={'%'}
                title={'Gastado'}
                inActiveStrokeColor={'#f5f5f5'}
                inActiveStrokeWidth={20}
                activeStrokeColor={'#3B82F6'}
                activeStrokeWidth={20}
                titleStyle={{fontWeight: 'bold', fontSize: 25}}
                titleColor={'#64748b'}
            />

            <View style={styles.contenedorTexto}>

                <Pressable 
                    onPress={resetearApp}
                    style={styles.boton}
                >
                    <Text style={styles.textoBoton}>Reiniciar presupuesto</Text>
                </Pressable>

                <Text style={styles.valor}>
                    <Text style={styles.label}>Prespuesto: {''}</Text>
                    {formatearCantidad(presupuesto)}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>Disponible: {''}</Text>
                    {formatearCantidad(disponible)}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>Gastado: {''}</Text>
                    {formatearCantidad(gastado)}
                </Text>

            </View>    
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    boton:{
        padding: 10,
        marginBottom:40,
        borderRadius:5,
        backgroundColor:'#DB2777'
    },
    textoBoton:{
        textAlign:'center',
        color: '#fff',
        fontWeight:'bold',
        textTransform:'capitalize'
    },
    centrarGrafica:{
        alignItems:'center',
    },
    contenedorTexto:{
        marginTop:10,
    },
    valor:{
        fontSize:24,
        textAlign:'center',
        marginBottom:10,
    }, 
    label:{
        fontWeight:'700',
        color: '#3B82F6',
    }
});

export default ControlPresupuesto