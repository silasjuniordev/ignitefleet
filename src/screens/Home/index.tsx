import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { Container, Content } from './styles';

import { useQuery } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert } from 'react-native';



export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation() as any;

  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse?._id });
    } else {
      navigate('departure');
    }
  }

  function fetchVehicle() {
    try {
        const vehicle = historic.filtered("status = 'departure'")[0]
        setVehicleInUse(vehicle);
    } catch (error) {
        Alert.alert('Veículo', 'Não foi possível carregar o veículo em uso.')
        console.log(error);
    }
  }

  useEffect(() => {
    fetchVehicle();
  }, [])

  return (
    <Container>
        <HomeHeader />

        <Content>
          <CarStatus 
            licensePlate={vehicleInUse?.license_plate}
            onPress={handleRegisterMovement} 
        />
        </Content>
    </Container>
  );
}