import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from "react-native-web";

const task = (props) => {
    return (
        <View style={[styles.taskItem, styles.boxShadow]}>
            <View style={styles.checkBox}>

            </View>
            <View style={styles.left}>
                <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                <Text>{props.text}</Text>
            </View>
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
    left: {
    },
    checkBox: {
        width: 24,
        height: 24,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: '100%',
        marginRight: 16
    }

})

export default task;
