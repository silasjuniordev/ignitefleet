import { IconProps } from "phosphor-react-native";
import theme from "../../theme";

import { Container, Title } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type IconBoxProps = (props: IconProps) => JSX.Element

type Props = {
    icon?: IconBoxProps
    title: string
}

export function TopMessage({ title, icon: Icon }: Props) {
    const { COLORS } = theme
    const insets = useSafeAreaInsets()

    const paddingTop = insets.top + 5

    return (
        <Container style={{ paddingTop }}>
            {
                Icon &&
                <Icon
                    size={18}
                    color={COLORS.GRAY_100}
                />
            }

            <Title>
                {title}
            </Title>
        </Container>
    )
}