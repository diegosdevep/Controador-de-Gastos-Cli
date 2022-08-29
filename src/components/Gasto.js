import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import globalStyles from '../styles'
import { formatearCantidad, formatearFecha } from '../helpers'



const diccionarioIconos = {
  ahorro: require('../img/icono_ahorro.png'),
  comida: require('../img/icono_comida.png'),
  casa: require('../img/icono_casa.png'),
  gastos: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
}

const Gasto = ({gasto, setModal, setGasto}) => {

    const {nombre, cantidadGasto, categoria, fecha} = gasto

    const handleAcciones = () => {
      setModal(true)
      setGasto(gasto)
    }

  return (
    <Pressable
      onPress={handleAcciones}
    >
        <View style={styles.contenedor}>
          <View style={styles.contenido}>

            <View style={styles.contenedorImagen}>
              <Image
                style={styles.imagen}
                source={diccionarioIconos[categoria]}
              />

              <View style={styles.contenedorTexto}>
                <Text style={styles.categoria}>{categoria}</Text>
                <Text style={styles.nombre}>{nombre}</Text>
                <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
              </View>
            </View>

            <Text style={styles.cantidad}>{formatearCantidad(cantidadGasto)}</Text>
            
          </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor,
        marginBottom:10
    },
    contenido:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between',
    },
    contenedorImagen:{
      flex: 1,
      flexDirection: 'row',
      alignItems:'center',
    },
    imagen:{
      width: 80,
      height: 80,
      marginRight:20,
    },
    contenedorTexto:{
      flex: 1,
    },
    categoria:{
      color: '#94a3b8',
      fontSize:16,
      fontWeight:'bold',
      textTransform:'uppercase',
      marginBottom:2,
    },
    nombre:{
      fontSize:22,
      color: '#64748b',
      marginBottom:5
    },
    cantidad:{
      fontSize:20,
      fontWeight:'700'
    },
    fecha:{
      fontWeight:'bold',
      color: '#DB2777'
    }
});

export default Gasto