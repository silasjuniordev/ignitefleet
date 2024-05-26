import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { AppProvider, UserProvider } from '@realm/react';
import { REALM_APP_ID } from '@env';

import { StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

    if (!fontsLoaded) {
        return (
            <Loading />
        )
    }

    return (
        <AppProvider id={REALM_APP_ID}>
                <ThemeProvider theme={theme}>
                    <SafeAreaProvider>
                        <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>
                            <StatusBar 
                                barStyle="light-content" 
                                backgroundColor="transparent" 
                                translucent 
                            />
                            <UserProvider fallback={SignIn}>
                                <Routes />
                            </UserProvider>
                        </View>
                    </SafeAreaProvider>
                </ThemeProvider>
            </AppProvider>
    )
}