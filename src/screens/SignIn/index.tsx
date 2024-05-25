import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

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

                fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`)
                .then(response => response.json())
                .then(response => console.log(response))

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