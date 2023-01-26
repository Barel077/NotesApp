import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Portal, TextInput, useTheme } from 'react-native-paper';
import Note from '../Comps/Note'
import { useCategories } from '../Comps/CategoriesContext';


export default function Notes(route) {
    const { categories, setCategories, nav, theme } = useCategories()

    const [visible, setVisible] = useState(false);

    const [noteName, setNoteName] = useState("");
    const [noteText, setNoteText] = useState("");

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    function AddNote() {
        if (noteName == "" || noteText == "") {
            alert("Please insert some data.")
        }
        else {
            setCategories((prev) => {
                return ([...prev].map((category) => {
                    if (category.name != route.route.params.CatName) return category
                    return {
                        ...category, notes: [...category.notes, { title: noteName, text: noteText }]
                    }
                }))
            })

        }
        setVisible(false);
        setNoteName("")
        setNoteText("")
    }

    useEffect(() => {
    }, [categories])


    return (
        <View style={styles.MainView}>
            <View style={{ backgroundColor: theme.colors.secondary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.NText}>{route.route.params.CatName + " Notes"}</Text>
            </View>
            <View style={styles.NCon}>
                <ScrollView>
                    <Note catName={route.route.params.CatName} />
                </ScrollView>
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.Modal}>
                    <Text style={{ fontSize: 18, marginBottom: '5%' }}>Note Title:</Text>
                    <TextInput onChangeText={text => setNoteName(text)} style={{ width: '80%' }} />
                    <Text style={{ fontSize: 18, marginBottom: '5%' }}>Text:</Text>
                    <TextInput numberOfLines={10} onChangeText={text => setNoteText(text)} style={{ width: '80%' }} />
                    <Button onPress={AddNote}>Create</Button>
                </Modal>
            </Portal>
            <Button style={styles.NoteBtn} labelStyle={{ fontSize: 20, fontWeight: 'bold' }} icon="note-plus" mode="elevated" onPress={showModal}>Add Note</Button>
        </View>
    )
}



const styles = StyleSheet.create({
    MainView: {
        width: '100%',
        flex: 1
    },
    NText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    NCon: {
        flex: 9
    },
    Modal: {
        backgroundColor: 'white',
        height: '70%',
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    NoteBtn: {
        flex: 1,
        justifyContent: 'center',
        margin: '2%'
    },
})