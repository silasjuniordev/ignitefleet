import { Realm } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { Container, Content, Label, Title } from './styles';

import { useQuery, useRealm } from '../../libs/realm';
import { useUser } from '@realm/react';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert, FlatList } from 'react-native';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import { getLastAsyncTimestamp, saveLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage';
import { TopMessage } from '../../components/TopMessage';
import { CloudArrowUp } from 'phosphor-react-native';



export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([])

  const [percentageToSync, setPercentageToSync] = useState<string | null>(null)

  const { navigate } = useNavigation() as any;

  const historic = useQuery(Historic);

  const realm = useRealm();

  const user = useUser()

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

  async function fetchHistoric() {
    try {
    const response = historic.filtered("status = 'arrival'").sorted("create_at", true)

    const lastSync = await getLastAsyncTimestamp()
    
    const formattedHistoric = response.map(( item ) => {
      return ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        isSync: lastSync > new Date(item.update_at).getTime(),
        created: dayjs(item.create_at).format('[Saída em] DD/MM/YYYY [às] HH:mm')        
      })
    })

    setVehicleHistoric(formattedHistoric)

    } catch (error) {
        console.log(error)
        Alert.alert('Erro', 'Falha ao carregar o historico. Tente novamente mais tarde.')
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })
  }

  async function progressNotification(transfered: number, transferable: number) {
    const percentage = (transfered / transferable) * 100
    
    if (percentage >= 100) {
        await saveLastSyncTimestamp()
        await fetchHistoric()
        setPercentageToSync(null)

        Toast.show({
            type: 'info',
            text1: 'Todos os dados estão sincronizados',
        })
    }

    if (percentage < 100) {
        setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
    }
  }

  useEffect(() => {
    fetchVehicleInUse()
  })

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
        const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user.id}'`)

        mutableSubs.add(historicByUserQuery, { name: 'historic_By_User' })
    })
  },[realm])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) {
        return
    }

    syncSession.addProgressNotification(
        Realm.ProgressDirection.Upload,
        Realm.ProgressMode.ReportIndefinitely,
        progressNotification
    )

    return () => syncSession.removeProgressNotification(progressNotification)
  },[])

  return (
    <Container>

        {
            percentageToSync && <TopMessage title={percentageToSync} icon={CloudArrowUp} />
        }

        <HomeHeader />

        <Content>
          <CarStatus 
            licensePlate={vehicleInUse?.license_plate}
            onPress={handleRegisterMovement} 
        />

        <Title>
            Histórico
        </Title>

        <FlatList 
            data={vehicleHistoric}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <HistoricCard 
                    data={item}
                    onPress={() => handleHistoricDetails(item.id)} 
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={(
                <Label>
                    Nenhum veículo utilizado.
                </Label>
            )}
        />
        </Content>
    </Container>
  );
}