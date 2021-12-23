import React from 'react';
import {View, Text, Image, ScrollView,  TouchableOpacity, StyleSheet} from 'react-native';

const task = (props) => {
    let callParentFunctionDelete = (dex) => {
        props.deletItemParent(dex)
    }
    let callparentfunctionDone = (dex) => {
        props.doneItemParent(dex)
    }
    console.log(props, 'TEXS');
    return (
        <View style={[styles.taskItem, styles.boxShadow]}>
            <View style={styles.leftWrapp}>
                <TouchableOpacity onPress={() => callparentfunctionDone(props.index)}>
                    <View style={[styles.checkBox, (props.status === "done") ? styles.checked : '']}>
                    </View>
                </TouchableOpacity>
                <View style={styles.left}>
                    <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                    <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
                        <Text style={[styles.textDefault, (props.status === "done") ? styles.textDone : '']}>{props.text}</Text>
                    </ScrollView>
                </View>
            </View>
            <TouchableOpacity onPress={() => callParentFunctionDelete(props.index)}>
                <View >
                    <Image style={styles.deleteBtn} source={require('../assets/delete.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    taskItem: {
        backgroundColor: '#ffffff',
        minHeight: 48,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F7F7F7',
        marginBottom: 16,
        paddingVertical: 16,
        position: 'relative',
        overflow: 'hidden'
    },
    boxShadow: {
        shadowColor: '#00000005',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    leftWrapp: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBox: {
        width: 24,
        height: 24,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 100,
        marginRight: 16
    },
    checked: {
        backgroundColor: '#1f9ade',
    },
    textWrapp: {},
    textDefault: {
        color: 'black',
    },
    textDone: {
        color: 'lightgrey',
        flexGrow: 1
    },
    deleteBtn: {
        width: 24,
        height: 24
    }

})

export default task;
