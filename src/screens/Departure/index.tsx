import { useRef, useState } from "react";
import { useRealm } from "../../libs/realm";
import { useUser } from "@realm/react"; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, TextInput } from "react-native";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { Container, Content } from "./styles";
import { licensePlateValidate } from "../../utils/licensePlateValidation";

export function Departure() {
    const descriptionRef = useRef<TextInput>(null);
    const licensePlateRef = useRef<TextInput>(null);

    const [description, setDescription] = useState('');
    const [licensePlate, setLicensePlate] = useState('');

    const [isRegistering, setIsRegistering] = useState(false);

    const realm = useRealm()
    const user = useUser()

    const { goBack } = useNavigation()

    function handleDepartureRegister() {
        try {
            if (!licensePlateValidate(licensePlate)) {
                licensePlateRef.current?.focus();
                return Alert.alert('Placa inválida', 'Por favor, insira uma placa válida.')
            }
    
            if (description.trim().length === 0) {
                descriptionRef.current?.focus();
                return Alert.alert('Finalidade', 'Por favor, Descreva a finalidade da saída.')
            }

            setIsRegistering(true);

            realm.write(() => {
                realm.create('Historic', Historic.generate({
                    user_id: user.id,
                    license_plate: licensePlate.toUpperCase(),
                    description
                }))
            })

            Alert.alert('Saída registrada', 'A saída foi registrada com sucesso!')
            
            goBack()

        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Houve um erro ao registrar a saída. Tente novamente mais tarde.')
            
            setIsRegistering(false);
        }
    }

    return (
        <Container>
            <Header title="Saída" />
            <KeyboardAwareScrollView extraHeight={100}>
                <ScrollView>
                    <Content>
                        <LicensePlateInput 
                            ref={licensePlateRef}
                            label="Placa do veículo"
                            placeholder="AAA-9999"
                            onSubmitEditing={() => descriptionRef.current?.focus()}
                            returnKeyType="next"
                            onChangeText={setLicensePlate}
                        />

                        <TextAreaInput 
                            ref={descriptionRef}
                            label="Finalidade"
                            placeholder="Descreva a finalidade da saída"
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType="send"
                            blurOnSubmit
                            onChangeText={setDescription}
                        />

                        <Button 
                            title="Registrar Saída"
                            onPress={handleDepartureRegister}
                            isLoading={isRegistering}
                        />
                    </Content>
                </ScrollView>
            </KeyboardAwareScrollView>
        </Container>
    )
}