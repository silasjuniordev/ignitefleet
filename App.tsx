import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

    if (!fontsLoaded) {
        return (
            <Loading />
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>
                <StatusBar 
                    barStyle="light-content" 
                    backgroundColor="transparent" 
                    translucent 
                />
                <SignIn />
            </View>
        </ThemeProvider>
    )
}