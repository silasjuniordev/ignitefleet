import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useObject, useRealm } from "../../libs/realm";
import { Alert } from "react-native";
import { BSON } from "realm";
import { AsyncMessage, Container, Content, Description, Footer, Label, LicensePlate } from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { X } from "phosphor-react-native";
import { Historic } from "../../libs/realm/schemas/Historic";
import { getLastAsyncTimestamp } from "../../libs/asyncStorage/syncStorage";

type RouteParamsProps = {
    id: string
}

export function Arrival() {
    const route = useRoute()
    const { id } = route.params as RouteParamsProps

    const historic = useObject(Historic, new BSON.UUID(id))
    const realm = useRealm()

    const { goBack } = useNavigation()

    const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

    const [dataNotSync, setDataNotSync] = useState(false)

    function handleRemoveVehicle() {
        Alert.alert(
            'Cancelar Chegada',
            'Tem certeza que deseja cancelar a chegada do veículo?',
            [
                { text: 'Não', style: 'cancel'},
                { text: 'Sim', onPress: () => removeVehicle() }
            ]
        )
    }

    function removeVehicle() {
        realm.write(() => {
            realm.delete(historic)
        })

        goBack()
    }

    function handleArrivalVehicle() {
        try {
            if(!historic) {
                Alert.alert('Error','Não foi possível obter os dados do veículo. Tente novamente mais tarde.')
            }

            realm.write(() => {
                historic.status = 'arrival';
                historic.update_at = new Date();
            })

            Alert.alert('Chegada registrada','A chegada do veículo foi registrada com sucesso!')

            goBack()

        } catch (error) {
            console.log(error)
            Alert.alert('Error','Não foi possível registrar a chegada do veículo. Tente novamente mais tarde.')
        }
    }

    useEffect(() => {
        getLastAsyncTimestamp()
        .then(lastSync => setDataNotSync(historic!.update_at.getTime() > lastSync))
    }, [])

    return (
        <Container>
            <Header title={title} />

            <Content>
                <Label>
                    Placa do veículo
                </Label>

                <LicensePlate>
                    {historic?.license_plate}
                </LicensePlate>

                <Label>
                    Finalidade
                </Label>

                <Description>
                    {historic?.description}
                </Description>

            </Content>
            
                {
                    historic?.status === 'departure' && 
                        <Footer>
                            <ButtonIcon 
                                icon={X}
                                onPress={handleRemoveVehicle}
                            />

                            <Button 
                                title="Registrar Chegada" 
                                onPress={handleArrivalVehicle}
                            />
                        </Footer>
                }

                {
                    dataNotSync &&
                    <AsyncMessage>
                        Sincronização da {historic?.status === 'departure' ? 'partida' : 'chegada'} pendente.
                    </AsyncMessage>
                }

        </Container>
    )
}