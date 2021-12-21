import React, {useState} from 'react';
import {Platform, KeyboardAvoidingView, StyleSheet, Text, View, TextInput} from 'react-native';
import Task from './components/task';
import {TouchableOpacity} from "react-native-web";

export default function App() {
    const [task, setTask] = useState([]);
    const [taskItems, setTaskItems] = useState([]);
    const handleAddTask = () => {
        setTaskItems([...taskItems, task])
        setTask('');
    };
    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Tasks list</Text>
            <View style={styles.items}>
                {
                    taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                <Task text={item}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'Create a task'} value={task} onChangeText={text => setTask(text)}/>

                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        paddingVertical: 40,
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: 800,
        paddingHorizontal: 16,
    },
    items: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        paddingTop: 24,
        paddingHorizontal: 16,
    },
    writeTaskWrapper: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    input: {
        minHeight: 48,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        width: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 16
    },
    addWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: {
        color: '#ffffff',
        fontSize: 40,
        lineHeight: '100%',
        height: 48,
        width: 48,
        borderRadius: '100%',
        backgroundColor: '#55BCF6',
        display: 'flex',
        justifyContent: 'center',

    }

});

