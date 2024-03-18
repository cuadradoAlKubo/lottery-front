'use client'
import React from 'react'
import { Grid, Select, TextInput, Text, Image, SimpleGrid, Group, rem, Center, Card, Button, Skeleton, Modal, Table } from '@mantine/core'
import useModalSorteo from '@/hooks/useModalSorteo';
import { Contest } from '@/interfaces/constest.inteface';
interface ModalCrudSorteosProps {
    open: boolean;
    title?: string;
    data: Contest | undefined;
    onClose: () => any;
}
export default function ModalCrudSorteos({open, title, onClose, data}: ModalCrudSorteosProps) {
    const {prices, handleClick, prepared, handleLot} = useModalSorteo({data: data});

    const rows = prices?.map((element) => (
        <Table.Tr key={element.name}>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.description}</Table.Td>
          <Table.Td>{element.orderToLot}</Table.Td>
          <Table.Td>{element.markAsDelivery ? 'Sorteado' : 'Pendiente'}</Table.Td>
        </Table.Tr>
      ));
    
      return (
        <Modal opened={open} onClose={onClose} title={title} centered size="xl">
            <Table>
                <Table.Thead>
                    <Table.Tr>
                    <Table.Th>Premio</Table.Th>
                    <Table.Th>Descripcion</Table.Th>
                    <Table.Th>Orden</Table.Th>
                    <Table.Th>Sorteado</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Group justify="end" pt={20}>
                <Button onClick={handleClick}>Preparar ronda</Button>
                <Button disabled={!prepared} color='green' onClick={handleLot}>Sortear premio</Button>
            </Group>
        </Modal>

      );
}


const ButtonCol = ({ onClick }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
        <Group justify="end">
            <Button onClick={onClick}>Crear ronda</Button>
            <Button color='green' onClick={onClick}>Sortear</Button>
        </Group>
    </Grid.Col>
);