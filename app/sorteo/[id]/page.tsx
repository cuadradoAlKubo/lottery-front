'use client'
import { AppShell, Burger, Group, UnstyledButton, Text, Title, Button, InputLabel, Input, Flex, TextInput, Card, Badge } from '@mantine/core';
import Image from 'next/image';
import { io } from 'socket.io-client';
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react';
import CardPrize from '@/components/Lotterys/CardPrize';
import { IconChevronDown } from '@tabler/icons-react';
import usePrices from '@/hooks/usePrices';
import useCountDown from '@/hooks/useCountDown';

export const socket = io('https://privatedevs.com', 
  {path: '/api-contest/socket.io',
});

export default function SorteoPage({ params }: { params: { id: string } }) {
  const [opened, setOpened] = useState<boolean | undefined>(false);
  const [timmer, setTimmer] = useState("00:00:00");
  const premios = useRef<HTMLDivElement>(null);
  const {data, getPrices} = usePrices(params.id);
  const prizes = data?.payload[0].prizes
  const contest = data?.payload[0].contest
  const {timeLeft} = useCountDown({targetDate: contest?.contestDate!})

  useEffect(() => {
    setTimmer(
      (timeLeft.hours > 9 ? timeLeft.hours : "0" + timeLeft.hours) +
      ":" +
      (timeLeft.minutes > 9 ? timeLeft.minutes : "0" + timeLeft.minutes) +
      ":" +
      (timeLeft.seconds > 9 ? timeLeft.seconds : "0" + timeLeft.seconds),
    );
  }, [timeLeft])


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    
    socket.on('contestUpdated ', (payload) =>{
      console.log(payload)
      getPrices()
    })

    socket.on("error", (error) => {
      console.log(error)
    });

    return () => {
      socket.off('connect');
    };
  }, [socket]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      bg={'#000'}
      
    >
      <AppShell.Header h={'80px'}>
        <Group h="100%" px="md" >
          <Group justify="center" style={{ flex: 1, width: '100%' }}>
            <Image width={150} height={30} alt='logo' src='https://import.cdn.thinkific.com/cdn-cgi/image/width=384,dpr=1,onerror=redirect/643563%2Fcustom_site_themes%2Fid%2FovAKzuZwRfmmwOLdtki8_DEVTALLES-LOGO-VARIANTES.png' />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main style={{overflow: 'hidden', boxSizing:'border-box', padding: 0}}>
        <div className={styles.image}>
            <Image src={'/assets/mountain.webp'} width={2000} height={400} alt='mountain'></Image>
        </div>
        <div className={styles.bg}></div>
        <div className='main' style={{zIndex: 10, position: 'relative'}}>
            
            <Title order={1} style={{textAlign: 'center'}} fw={400} pb={50} pt={100}>Sorteo: <span style={{fontSize: '60px', fontWeight: '600'}}>{contest?.name}</span></Title>
            {/* <Title order={1} style={{textAlign: 'center'}} pt={20}>Ronda: 1</Title> */}
            {timeLeft.days > 0 && <Title order={1} style={{textAlign: 'center'}}>{timeLeft.days} días</Title>}
            <Title className={styles.titleTime} order={2}>{timmer}</Title>
            
            <Flex style={{zIndex: '2', margin: 'auto'}} gap={20} maw={'400px'} direction={'column'} align={'center'} justify={'center'}>
              <TextInput style={{width:'100%'}} label="Usuario de Discord" variant="filled" size="xl" radius="lg" placeholder="pepito123" />
              <Button fullWidth radius={'lg'} size='xl' color='teal'>Regístrate</Button>
            </Flex>
            <Flex pt={100}>
              <Button  fz={22} leftSection={<IconChevronDown size={30} />}  rightSection={<IconChevronDown size={30} />} style={{margin: 'auto'}} variant="transparent" color="gray" size="xl">Ver premios </Button>
            </Flex>
        </div>
      </AppShell.Main>
      
      <Card bg={'black'} ref={premios}>
        <Flex justify={'center'}>
          <Title order={1} pt={100}>Premios</Title>
        </Flex>

        <Flex wrap={'wrap'} justify={'center'} pt={50} gap={20}>
          {prizes?.map(prize => 
            <CardPrize 
              key={prize.orderToLot} 
              name={prize.name} 
              image={prize.image} 
              markAsDelivery={prize.markAsDelivery}
            />)}
        </Flex>
      </Card>
    </AppShell>
  );
}