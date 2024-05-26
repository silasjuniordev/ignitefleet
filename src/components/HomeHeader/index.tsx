import { Container, Greeting, Message, Name, Picture } from "./styles";
import { TouchableOpacity } from 'react-native';
import { Power } from 'phosphor-react-native'
import theme from "../../theme";
import { useApp, useUser } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function HomeHeader() {
    const user = useUser()
    const app = useApp()
    const insets = useSafeAreaInsets()

    const paddingTop = insets.top + 32

    function handleSignOut() {
        app.currentUser?.logOut()
    }

    return (
        <Container style={{ paddingTop }}>
            <Picture 
                source={{ uri: user?.profile.pictureUrl }}
                placeholder="LpQJfnj[~qof%MfQM{fQ?bfQD%fQ" // blurHash -> upar arquivo BlurHash em https://blurha.sh/ para obter esse código
            />

            <Greeting>
                <Message>
                    Olá,
                </Message>

                <Name>
                    {user?.profile.name}
                </Name>

            </Greeting>

            <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut}>
                <Power size={32} color={theme.COLORS.GRAY_400} />
            </TouchableOpacity>
        </Container>
    )
}