import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, ScrollView, StatusBar, StyleSheet, View} from 'react-native'
import Header from './src/components/Header'
import NuevoPresupuesto from './src/components/NuevoPresupuesto'
import ControlPresupuesto from './src/components/ControlPresupuesto'
import FormularioGasto from './src/components/FormularioGasto'
import { generarId } from './src/helpers'
import ListadoGasto from './src/components/ListadoGasto'
import Filtro from './src/components/Filtro'
import AsyncStorage from '@react-native-async-storage/async-storage'



const App = () => {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0

        if(presupuestoStorage > 0){
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  }, [])
  

  useEffect(() => {
    if(isValidPresupuesto){
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    }
  }, [isValidPresupuesto])
  
  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos') ?? []

        setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  }, [])

  useEffect(() => {
    const guardarGastosStorage = async() => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  },[gastos])

  const handleNuevoPresupuesto = (presupuesto) => {
    if(Number(presupuesto) > 0){
      setIsValidPresupuesto(true)
    }else{
      Alert.alert('Error', 'El presupuesto debe ser mayor a 0 ', 
      [{text: 'OK'}])
    }
  }

  const handleGasto = gasto => {

    if([gasto.nombre, gasto.categoria, gasto.cantidadGasto].includes('')){
      Alert.alert(
        'Error',
        'Todos los campos son Obligatorios'
      )
      return
    }

    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState =>  gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }else{
      //Nuevo gasto al State
      gasto.id = generarId()
      gasto.fecha = Date.now()

      setGastos([...gastos, gasto])
    }
    setModal(!modal)
  }

  const eliminarGasto = id => {
    Alert.alert(
      'Deseas eliminar el gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, eliminar', onPress: () => {
          const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
          setGastos(gastosActualizados)
          setModal(!modal)
          setGasto({})
        }},
      ]
    )
  }


  const resetearApp = () => {
    Alert.alert(
      'Deseas resetear la app?',
      'Esto eliminara presupuesto y gastos',
      [
        {text: 'No', styles: 'cancel'},
        {text: 'Si, eliminar', onPress: async() => {
          try {
            await AsyncStorage.clear()
            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <StatusBar backgroundColor={'#3B82F6'}/>
        <View style={styles.header}>
          <Header/>

          {
            isValidPresupuesto 
            ?
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              resetearApp={resetearApp}
            />
            :
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          }
        </View>
        
        {
          isValidPresupuesto && (
            <>
              <Filtro
                gastos={gastos}
                setGastosFiltrados={setGastosFiltrados}
                filtro={filtro}
                setFiltro={setFiltro}
              />
              
              <ListadoGasto
                gastos={gastos}
                setModal={setModal}
                setGasto={setGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </>
          )
        }
      </ScrollView>
        {
          modal && (
            <Modal
              animationType='slide'
              visible={modal}
              onRequestClose={() => {
                setModal(!modal)
              }}
            >
              <FormularioGasto
                setModal={setModal}
                handleGasto={handleGasto}
                gasto={gasto}
                setGasto={setGasto}
                eliminarGasto={eliminarGasto}
              />
            </Modal>
          )
        }

        {isValidPresupuesto && (
          <Pressable
            style={styles.pressable}
            onPress={() => setModal(!modal)}
          >
            <Image
              style={styles.imagen}
              source={require('./src/img/nuevo-gasto.png')}
            />
          </Pressable>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
      backgroundColor:'#f5f5f5',
      flex: 1,
    },
    header:{
      backgroundColor:'#3B82F6',
      minHeight:400,
    },
    pressable:{
      width: 60,
      height: 60,
      position: 'absolute',
      bottom: 20,
      right: 20
    },
    imagen:{
      width: 60,
      height: 60,
    }
});

export default App