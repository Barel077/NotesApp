import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { CategoriesContext, useCategories } from './CategoriesContext';
import { Button } from 'react-native-paper'

export default function CreateCategory() {

    const { categories, setCategories, theme, nav } = useCategories()



    return (
        <>
            {categories.map((category, index) => {
                return (
                    <View style={styles.Cat} key={index}>
                        <View style={styles.catName} onStartShouldSetResponder={() => nav.navigate("Notes", {CatName: category.name})}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{category.name}</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total Notes</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 20 }}>{category.notes.length}</Text>
                            </View>
                        </View>
                    </View>)
            })}
        </>
    )
}

const styles = StyleSheet.create({
    Cat: {
        height: 120,
        borderBottomWidth: 1,
        marginHorizontal: '2%',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    catName: {
        flex: 4,
     
    },
})