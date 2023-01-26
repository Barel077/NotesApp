import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Modal, Portal, TextInput, useTheme } from 'react-native-paper'
import { CategoriesContext, useCategories } from '../Comps/CategoriesContext';
import CreateCategory from '../Comps/Category';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';

export default function Categories() {

    const { theme, nav, categories, setCategories } = useCategories();

    // const theme = useTheme();
    // const nav = useNavigation();
    // const [categories, setCategories] = useState([]);
    const [catName, setcatName] = useState("");
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    async function getCats() {
        const allCats = await AsyncStorage.getItem('categories');
        if (allCats != null) {
            setCategories(JSON.parse(allCats))
        }
        else {
            setCategories([])
        }
    }

    useEffect(() => {
        getCats();
    }, [])


    function AddCategory() {
        if (catName == "") {
            alert("Please insert a valid name.")
        }
        else {
            setCategories((prev) => [...prev, { name: catName, notes: [] }])
        }
        setVisible(false);
        setcatName("")
    }

    //Only AFTER categories has been updated, this side-effect will happen.
    //Not like in the previous try where the setCategory happened but the categories didnt update.
    useEffect(() => {
        AsyncStorage.setItem('categories', JSON.stringify(categories))
    }, [categories])


    return (
        <>
            <View style={styles.MainView}>
                <View style={styles.CV}>
                    <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.CVText}>Categories</Text>
                    </View>

                    <View style={styles.CVCon}>
                            <ScrollView >
                                <CreateCategory />
                            </ScrollView>
                    </View>


                </View>

                <View style={styles.CatView}>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.Modal}>
                            <Text style={{ fontSize: 18, marginBottom: '5%' }}>Type a name for the category:</Text>
                            <TextInput onChangeText={text => setcatName(text)} style={{ width: '80%' }} />
                            <Button onPress={AddCategory}>Create</Button>
                        </Modal>
                    </Portal>
                    <Button style={styles.CatBtn} labelStyle={{ fontSize: 20, fontWeight: 'bold' }} icon="notebook-plus" mode="elevated" onPress={showModal}>Add Category</Button>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    MainView: {
        width: '100%',
        flex: 1
    },
    CV: {
        flex: 10
    },
    CVText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    CVCon: {
        flex: 9,
    },
    Modal: {
        backgroundColor: 'white',
        height: '70%',
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    //The button's styles
    CatView: {
        flex: 1.5
    },
    CatBtn: {
        flex: 1,
        justifyContent: 'center',
        margin: '2%'
    },
})