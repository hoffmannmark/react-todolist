import React, {useState, useEffect} from 'react';
import {Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';

import Task from './components/task';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

    const storage = new Storage({
        size: 1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    });
    const [taskInput, setTask] = useState([]);
    const [taskItems, setTaskItems] = useState([]);
    const InitialAllTasks = () => {
        storage.getAllDataForKey('tasks').then(storageTasks => {
            console.log(storageTasks);
            if (storageTasks.length > 0) {
                setTaskItems(storageTasks)
            }
        });
    }
    useEffect(() => {
        InitialAllTasks();
    }, [])
    const handleAddTask = () => {
        if (taskInput !== "") {
            setTaskItems([{text: taskInput, status: 'new'}, ...taskItems])
            storage.save({
                key: 'tasks',
                id: taskItems.length,
                data: {text: taskInput, status: 'new'},
            });
            setTask('');
        }
    };
    const deleteTask = (index) => {
        console.log('DELETE')
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
        storage.clearMap();
        for (let i = 0; itemsCopy.length > i; i++) {
            storage.save({
                key: 'tasks',
                id: i,
                data: itemsCopy[i],
            });
        }
    }
    const doneTask = (index) => {
        console.log('doneTask')
        let itemsCopy = [...taskItems];
        let doneTaskItem = taskItems[index];
        itemsCopy.splice(index, 1);
        let allItemsCopyWithDone;
        if (doneTaskItem.status === 'done') {
            allItemsCopyWithDone = [doneTaskItem, ...itemsCopy]
            doneTaskItem.status = 'new';
        } else {
            allItemsCopyWithDone = [...itemsCopy, doneTaskItem]
            doneTaskItem.status = 'done';
        }


        setTaskItems(allItemsCopyWithDone);
        storage.clearMap();
        for (let i = 0; allItemsCopyWithDone.length > i; i++) {
            storage.save({
                key: 'tasks',
                id: i,
                data: allItemsCopyWithDone[i],
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Tasks list</Text>
            <ScrollView style={styles.items}>
                {
                    taskItems.map((item, index) => {
                        return (
                            <View key={index}>
                                <Task text={item.text} status={item.status} index={index} deletItemParent={deleteTask} doneItemParent={doneTask}/>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'Create a task'} value={taskInput} onChangeText={text => setTask(text)}/>
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>Add</Text>
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
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    items: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        maxHeight: '85%'
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
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
        borderRadius: 16,
    },
    addWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        width: 48,
        backgroundColor: '#55BCF6',
        borderRadius: 100,
    },
    addText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 600
    }

});



