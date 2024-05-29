import { useRoute } from "@react-navigation/native";
import { Container, Content, Description, Footer, Label, LicensePlate } from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

type RouteParamsProps = {
    id: string
}

export function Arrival() {
    const route = useRoute()
    const { id } = route.params as RouteParamsProps

    return (
        <Container>
            <Header title="Chegada" />

            <Content>
                <Label>
                    Placa do veículo
                </Label>

                <LicensePlate>
                    XXX0000
                </LicensePlate>

                <Label>
                    Finalidade
                </Label>

                <Description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ratione quam qui voluptatem, nisi sapiente, suscipit doloremque nostrum quis, possimus consequuntur et. Corrupti accusamus, vel molestias nam modi suscipit quos.
                </Description>

                <Footer>
                    <Button 
                        title="Registrar Chegada" 
                    />
                </Footer>
            </Content>
        </Container>
    )
}