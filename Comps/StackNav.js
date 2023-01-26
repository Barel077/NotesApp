import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categories from '../MainScreens/Categories';
import Notes from '../MainScreens/Notes';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const StackNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Group>
                <Stack.Screen name='Categories' component={Categories} />
                <Stack.Screen name='Notes' component={Notes} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNav