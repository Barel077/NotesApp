import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import CategoriesProvider, { CategoriesContext } from './Comps/CategoriesContext';
import StackNav from './Comps/StackNav';
import Categories from './MainScreens/Categories';


export default function App() {


  const True = true
  return (


    <PaperProvider>
        <NavigationContainer>
      <CategoriesProvider>
          <StackNav >

            <View style={styles.container}>
              <StatusBar backgroundColor='#EFEFEF'></StatusBar>
              <Categories></Categories>
            </View>

          </StackNav>
      </CategoriesProvider>
        </NavigationContainer>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
