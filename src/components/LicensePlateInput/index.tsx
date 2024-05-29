import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import theme from "../../theme";
import { Container, Input, Label } from "./styles";

type Props = TextInputProps & {
    label: string
}

const LicensePlateInput = forwardRef< TextInput, Props>(({ label, ...rest }, ref) => {
    const { COLORS } = theme

    return (
        <Container {...rest}>
            <Label>
                {label}
            </Label>

            <Input 
                ref={ref}
                maxLength={7}
                autoCapitalize="characters"
                placeholderTextColor={COLORS.GRAY_400}
                {...rest}
            />
        </Container>
    )
})

export { LicensePlateInput }