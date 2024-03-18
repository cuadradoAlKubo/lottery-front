'use client'
import { ContestContext } from '@/contexts/ContestContext';
import useContest from '@/hooks/useConstest';
import { ActionIcon, Button, Card, Group, Table, Menu, Title, rem } from '@mantine/core';
import { IconEdit, IconTrash, IconSettings, IconArrowsLeftRight } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import ModalCrudSorteos from '../Modals/ModalCrudSorteos';
import { ModalDelete } from '../Modals/ModalDelete';
import { Contest } from '@/interfaces/constest.inteface';
import usePlayContest from '@/hooks/usePlayContest';
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
    const {playContest, data: lotResponse} = usePlayContest()
    const [data, setData] = useState<Contest>()
    const rows = state.payload.map((contest, index) => (
        <Table.Tr key={index}>
            <Table.Td>{contest.name}</Table.Td>
            <Table.Td>{contest.rounds}</Table.Td>
            <Table.Td>{contest.contestStatus}</Table.Td>
            <Table.Td>{contest.createdBy.name}</Table.Td>
            <Table.Td>
                <Group>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Button>Acciones</Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Edición</Menu.Label>
                            <Menu.Item
                                color={'blue'}
                                onClick={() => { setOpenModalEdit(true), setData(contest), setaction("edit") }}
                                leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                            Publicar enlace
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => { setOpenModalEdit(true), setData(contest), setaction("edit") }}
                                leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                            Editar
                            </Menu.Item>
                            <Menu.Item 
                                color='red'
                                onClick={() => { setOpenModalDelete(true), setData(contest) }}
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                            Eliminar
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Sorteo</Menu.Label>
                            <Menu.Item
                                color='green'
                                leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => playContest(contest._id)}
                            >
                            Sortear premio
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
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
            <ModalCrudSorteos abrirModal={openModalEdit} setModalEdit={setOpenModalEdit} title='Editar sorteo' data={data} action={action} />
            <ModalDelete abrirModal={openModalDelete} setModalDelete={setOpenModalDelete} title='sorteo: ' data={data} action='contest' />
        </>
    );
}