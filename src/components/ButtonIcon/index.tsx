import { IconProps } from "phosphor-react-native";
import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";
import theme from "../../theme";

export type IconBoxProps = (props: IconProps) => JSX.Element

type Props = TouchableOpacityProps & {
    icon: IconBoxProps
}

export function ButtonIcon({ icon: Icon, ...rest }: Props) {
    const { COLORS } = theme

    return (
        <Container activeOpacity={0.7} {...rest}>
            <Icon 
                size={24}
                color={COLORS.BRAND_MID}
            />
        </Container>
    )
}