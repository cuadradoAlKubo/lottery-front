import { PrizesContext } from '@/contexts/PrizesContext';
import usePrizes from '@/hooks/usePrizes';
import { ActionIcon, Card, Group, Table, TextInput, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import ModalCrudPremios from '../Modals/ModalCrudPremios';
import { ModalDelete } from '../Modals/ModalDelete';

export function TableHomePremios() {
    const { getPrizes } = usePrizes()
    useEffect(() => {
        getPrizes();
    }, [])
    const { state } = useContext(PrizesContext);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [data, setData] = useState<any>()
    const rows = state.payload.map((prizes, index) => (
        <Table.Tr key={index}>
            <Table.Td>{prizes.name}</Table.Td>
            <Table.Td>{prizes.description}</Table.Td>
            <Table.Td>{prizes.contestId?.name}</Table.Td>
            <Table.Td>{prizes.status}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon variant="filled" aria-label="Settings" onClick={() => { setOpenModalEdit(true), setData(prizes), getPrizes() }}>
                        <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="filled" color="red" aria-label="Settings" onClick={() => { setOpenModalDelete(true), getPrizes(),setData(prizes) }}>
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Card>
                <Group justify="space-between" pb={24}>
                    <Title order={1}>Premios</Title>
                    <TextInput placeholder='Buscar sorteo' />
                </Group>
                <Table.ScrollContainer minWidth={500} h={350}>
                    <Table striped   >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nombre del premio</Table.Th>
                                <Table.Th>Descripción </Table.Th>
                                <Table.Th>Sorteo</Table.Th>
                                <Table.Th></Table.Th>
                                <Table.Th>Acciones</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card>
  <ModalCrudPremios abrirModal={openModalEdit} setModalEdit={setOpenModalEdit} title='Premio' data={data} action={action} />

            <ModalDelete abrirModal={openModalDelete} setModalDelete={setOpenModalDelete} data={data} action='prize' />
        </>
    );
}