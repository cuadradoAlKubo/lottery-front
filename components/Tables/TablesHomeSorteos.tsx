'use client'
import { ContestContext } from '@/contexts/ContestContext';
import useContest from '@/hooks/useConstest';
import { ActionIcon, Button, Card, Group, Table, TextInput, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import ModalCrudSorteos from '../Modals/ModalCrudSorteos';
import { ModalDelete } from '../Modals/ModalDelete';
import { Contest } from '@/interfaces/constest.inteface';
type action = 'edit' | 'create'
export function TableHomeSorteos() {
    const { getContests } = useContest()
    useEffect(() => {
        getContests();
    }, [])

    const { state } = useContext(ContestContext);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [action, setaction] = useState<action>("create")
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [data, setData] = useState<Contest>()
    const rows = state.payload.map((contest, index) => (
        <Table.Tr key={index}>
            <Table.Td>{contest.name}</Table.Td>
            <Table.Td>{contest.rounds}</Table.Td>
            <Table.Td>{contest.contestStatus}</Table.Td>
            <Table.Td>{contest.createdBy.name}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon variant="filled" aria-label="Settings" onClick={() => { setOpenModalEdit(true), setData(contest), setaction("edit") }}>
                        <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="filled" color="red" aria-label="Settings" onClick={() => { setOpenModalDelete(true), setData(contest) }} >
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
                    <Title order={1}>Sorteos</Title>
                    <Button onClick={() => { setOpenModalEdit(true), setaction("create") }}>Crear sorteo</Button>
                </Group>
                <Table.ScrollContainer minWidth={500} h={350}>
                    <Table striped   >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nombre del sorteo</Table.Th>
                                <Table.Th>Rondas </Table.Th>
                                <Table.Th>Estado</Table.Th>
                                <Table.Th>Creado por</Table.Th>
                                <Table.Th>Acciones</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card>
        <ModalCrudSorteos abrirModal={openModalEdit} setModalEdit={setOpenModalEdit} title='Sorteo' data={data} action={action} />|
            <ModalDelete abrirModal={openModalDelete} setModalDelete={setOpenModalDelete} title='sorteo: ' data={data} action='contest' />
        </>
    );
}