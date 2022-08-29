import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, StyleSheet,StatusBar, Pressable, View, TextInput } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import globalStyles from '../styles'

const FormularioGasto = ({setModal, handleGasto, setGasto, gasto, eliminarGasto}) => {

    const [nombre, setNombre] = useState('')
    const [cantidadGasto, setCantidadGasto] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')
    
    useEffect(() => {
        if(gasto?.nombre){
            setNombre(gasto.nombre)
            setCantidadGasto(gasto.cantidadGasto)
            setCategoria(gasto.categoria)
            setId(gasto.id)
            setFecha(gasto.fecha)
        }
    }, [gasto])
    

  return (
    <SafeAreaView style={styles.contenedor}>
        <StatusBar backgroundColor={'#1E40EF'}/>
        <View style={styles.contenedorBotones}>
            <Pressable 
                style={[styles.btn ,styles.btnCancelar]}
                onPress={() => {
                    setModal(false)
                    setGasto()
                }}
            >
                <Text style={styles.btnTexto}>Cancelar</Text>
            </Pressable>

            {!!id && (
                <Pressable 
                    style={[styles.btn, styles.btnEliminar]}
                    onPress={() => eliminarGasto(id)}
            >
                    <Text style={styles.btnTexto}>Eliminar</Text>
                </Pressable>
                )
            }
        </View>

        <View style={styles.formulario}>
            <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>
            
            <View style={styles.campo}>
                <Text style={styles.label}>Nombre Gasto</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre del gasto'
                    autoCapitalize='words'
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Cantidad Gasto</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Precio del gasto'
                    keyboardType='number-pad'
                    value={cantidadGasto}
                    onChangeText={setCantidadGasto}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Categoria Gasto</Text>
                    <Picker
                        selectedValue={categoria}
                        onValueChange={(value) => setCategoria(value)}
                    >
                        <Picker.Item label='-- Seleccione --' value=''/>
                        <Picker.Item label='Ahorro' value='ahorro'/>
                        <Picker.Item label='Comida' value='comida'/>
                        <Picker.Item label='Casa' value='casa'/>
                        <Picker.Item label='Gastos Varios' value='gastos'/>
                        <Picker.Item label='Ocio' value='ocio'/>
                        <Picker.Item label='Salud' value='salud'/>
                        <Picker.Item label='Suscripciones' value='suscripciones'/>
                    </Picker>
            </View>

            <Pressable 
                onPress={() => handleGasto({nombre, cantidadGasto, categoria, id, fecha})}
                style={styles.btnSubmit}
            >
                <Text style={styles.btnSubmitTexto}>{gasto?.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#1E40EF',
        flex: 1,
    },
    contenedorBotones:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    formulario:{
        ...globalStyles.contenedor
    },
    titulo:{
        textAlign:'center',
        fontSize:28,
        marginBottom:30,
        color: '#64748B'
    },
    campo:{
        marginVertical:10,
    },
    label:{
        color: '#64748B',
        fontSize:16,
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    input:{
        backgroundColor:'#F5F5F5',
        padding: 10,
        borderRadius:10,
        marginTop:10,
    },
    btnSubmit:{
        backgroundColor:'#3B82F6',
        padding: 10,
        marginTop:20,
        borderRadius:10
    },
    btnSubmitTexto:{
        textAlign:'center',
        color: '#fff',
        fontSize:16,
        fontWeight:'bold',
        textTransform:'uppercase'
    },
    btn:{
        borderRadius:10,
        padding: 10,
        marginHorizontal:10,
        marginTop:20,
        flex: 1,
    },
    btnEliminar:{
        backgroundColor:'red',
    },
    btnCancelar:{
        backgroundColor:'#DB2777',
    },
    btnTexto:{
        textAlign:'center',
        fontWeight:'bold',
        color: '#fff',
        textTransform:'uppercase',
        fontSize:18
    }
});

export default FormularioGasto