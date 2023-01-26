import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CategoriesContext, useCategories } from './CategoriesContext';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';

export default function Note(props) {

    const { categories, setCategories, nav, theme } = useCategories()

    useEffect(() => {
       
    }, [categories])

    function del(title) {
        setCategories((prev) => {
            return (prev.map((category) => {
                 console.log(category.name)
                if (category.name == props.catName) { 
                    const notes = category.notes.filter((element) => element.title != title)
                    return {
                        ...category,
                        notes
                    }
                }
                return category
            }))
        })
    }
    return (
        <>
            {categories.map((category, index) => {
                if (category.name == props.catName) {
                    return (
                        category.notes.map((note) => {
                            return (
                                <View style={styles.N}>
                                    <View style={styles.NName} >
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{note.title}</Text>
                                    </View>
                                    <View style={{ flex: 4, alignItems: 'center' }}>
                                        <Text numberOfLines={3}>{note.text}</Text>
                                    </View>
                                    <Button icon={'delete'} labelStyle={{ fontSize: 30 }} onPress={() => { del(note.title) }}></Button>
                                </View>
                            )
                        }))
                }
            })
            }
        </>
    )
}
// onStartShouldSetResponder={() => nav.navigate("Notes", { CatName: category.name })}
const styles = StyleSheet.create({
    N: {
        height: 150,
        borderBottomWidth: 1,
        marginHorizontal: '2%',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    NName: {
        flex: 1
    }

})