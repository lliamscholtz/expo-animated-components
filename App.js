import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FlatlistScreen from './src/screens/Flatlist';
import PerspectiveButtonScreen from './src/screens/PerspectiveButton';
import BlurredCarouselScreen from './src/screens/BlurredCarousel';
import ScrollToListScreen from './src/screens/ScrollToList';

function LibraryScreen({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 30,
            }}
        >
            <Button
                title="Flatlist ScrollY Effect"
                onPress={() => navigation.navigate('Flatlist')}
            />
            <Button
                title="Perspective Button"
                onPress={() => navigation.navigate('PerspectiveButton')}
            />
            <Button
                title="Blurred Carousel"
                onPress={() => navigation.navigate('BlurredCarousel')}
            />
            <Button
                title="ScrollTo List"
                onPress={() => navigation.navigate('ScrollToList')}
            />
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Library" component={LibraryScreen} />
                <Stack.Screen
                    name="Flatlist"
                    component={FlatlistScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PerspectiveButton"
                    component={PerspectiveButtonScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BlurredCarousel"
                    component={BlurredCarouselScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ScrollToList"
                    component={ScrollToListScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
