import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {TouchableOpacity} from "react-native-web";

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
            <TouchableOpacity onPress={() => callparentfunctionDone(props.index)}>
                <View style={[styles.checkBox, (props.status === "done") ? styles.checked : '']}>
                </View>
            </TouchableOpacity>
            <View style={styles.left}>
                <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                <Text style={[styles.textDefault, (props.status === "done") ? styles.textDone : '']}>{props.text}</Text>
            </View>
            <TouchableOpacity onPress={() => callParentFunctionDelete(props.index)}>
                <View style={styles.deleteBtn}>

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
        paddingVertical: 16
    },
    boxShadow: {
        shadowColor: '#00000005',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    left: {},
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
    textDefault: {
        color: 'black'
    },
    textDone: {
        color: 'grey',
    },
    deleteBtn: {
        width: 24,
        height: 24,
        backgroundColor: 'red',
        borderRadius: 2
    }

})

export default task;
