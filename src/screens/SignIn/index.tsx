import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

import { Realm, useApp } from '@realm/react';

import { useEffect, useState } from 'react';

import { Container, Title, Slogan } from "./styles";
import backgroundImg from '../../assets/background.png'
import { Button } from "../../components/Button";
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
    const [useAuthenticating, setUseAuthenticating] = useState(false)
    const [_, response, googleSignIn] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email']
    })

    const app = useApp();

    function handleGoogleSignIn() {
        setUseAuthenticating(true)

        googleSignIn().then((response) => {
            if (response.type !== 'success') {
                setUseAuthenticating(false)
            }
        })
    }

    useEffect(() => {
        if (response?.type === 'success') {
            if (response.authentication?.idToken) {
                const credentials = Realm.Credentials.jwt(response.authentication.idToken)

                app.logIn(credentials).catch((error) => {
                    Alert.alert('Erro', 'Falha ao autenticar. Tente novamente.')
                    setUseAuthenticating(false)
                })

            } else {
                Alert.alert('Erro', 'Falha ao autenticar. Tente novamente.')
                setUseAuthenticating(false)
            }
        }
    }, [response])

    return (
        <Container source={backgroundImg}>
            <Title>
                Ignite Fleet
            </Title>

            <Slogan>
                Gestão de uso de veículos
            </Slogan>

            <Button 
                title="Entrar com Google"
                isLoading={useAuthenticating}
                onPress={handleGoogleSignIn}
            />
        </Container>
    )
}