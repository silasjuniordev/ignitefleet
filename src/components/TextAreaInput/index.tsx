import { TextInput, TextInputProps } from "react-native";
import { forwardRef } from "react";
import { Container, Input, Label } from "./styles";
import theme from "../../theme";

type Props = TextInputProps & {
    label: string
}

const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
    const { COLORS } = theme

    return (
        <Container>
            <Label>
                {label}
            </Label>

            <Input 
                ref={ref}
                placeholderTextColor={COLORS.GRAY_400}
                multiline
                autoCapitalize="sentences"
                {...rest}
            />
        </Container>
    )
})

export { TextAreaInput }