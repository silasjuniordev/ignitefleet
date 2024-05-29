import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { Container, Title } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../theme";

type Props = {
    title: string
}

export function Header({ title }: Props) {
    const { COLORS } = theme
    const insets = useSafeAreaInsets()
    const { goBack } = useNavigation()

    const paddingTop = insets.top + 42

    return (
        <Container style={{ paddingTop }}>
            <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={COLORS.BRAND_LIGHT}
                />
            </TouchableOpacity>

            <Title>
                {title}
            </Title>
        </Container>
    )
}