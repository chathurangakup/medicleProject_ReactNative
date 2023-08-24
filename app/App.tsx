import React, { useState } from 'react';
import { Text, View, StatusBar, SafeAreaView } from "react-native"
import { PersistGate } from 'redux-persist/integration/react'
import Root from './screens/Root'

import type { StatusBarStyle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import configureStoreRedux from './store';

const { store, persistor } = configureStoreRedux();
import { Provider } from 'react-redux'
import 'react-native-gesture-handler';

import {
    navigationRef,
    routeNameRef,
    onNavigationStateChange,
} from '../app/routes/NavigationHelper';

import AppStatusBar from './components/AppStatusBar';

const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;

export const App = () => {




    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {/* <StatusBar backgroundColor={'red'} barStyle={'dark-content'} translucent={false} /> */}
                        <NavigationContainer
                            ref={navigationRef}
                            onReady={() =>
                            (routeNameRef.current =
                                navigationRef.current.getCurrentRoute().name)
                            }
                            onStateChange={() => onNavigationStateChange()}>
                            <Root />
                        </NavigationContainer>

                    </View>
                </SafeAreaView>
            </PersistGate>

        </Provider>
    )
}