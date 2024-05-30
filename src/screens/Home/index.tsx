import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { Container, Content } from './styles';

import { useQuery, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert } from 'react-native';
import { HistoricCard } from '../../components/HistoricCard';



export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation() as any;

  const historic = useQuery(Historic);

  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse?._id.toString() });
    } else {
      navigate('departure');
    }
  }

  function fetchVehicleInUse() {
    try {
        const vehicle = historic.filtered("status = 'departure'")[0]
        setVehicleInUse(vehicle);
    } catch (error) {
        Alert.alert('Veículo', 'Não foi possível carregar o veículo em uso.')
        console.log(error);
    }
  }

  function fetchHistoric() {
    const response = historic.filtered("status = 'arrival'").sorted("create_at", true)
    console.log(response)
  }

  useEffect(() => {
    fetchVehicleInUse()
  })

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => realm.removeListener('change', fetchVehicleInUse)
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  return (
    <Container>
        <HomeHeader />

        <Content>
          <CarStatus 
            licensePlate={vehicleInUse?.license_plate}
            onPress={handleRegisterMovement} 
        />

        <HistoricCard 
          data={{ created: '29-05-2024', licensePlate: 'NIX-6B22', isSync: false }}
        />
        </Content>
    </Container>
  );
}