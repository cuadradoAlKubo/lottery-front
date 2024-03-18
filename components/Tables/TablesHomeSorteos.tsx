'use client'
import { ContestContext } from '@/contexts/ContestContext';
import useContest from '@/hooks/useConstest';
import { ActionIcon, Button, Card, Group, Table, Menu, Title, rem, Notification } from '@mantine/core';
import { IconEdit, IconTrash, IconSettings, IconArrowsLeftRight, IconSum, IconPlus } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import ModalCrudSorteos from '../Modals/ModalCrudSorteos';
import { ModalDelete } from '../Modals/ModalDelete';
import { Contest } from '@/interfaces/constest.inteface';
import usePlayContest from '@/hooks/usePlayContest';
import { User } from '@/interfaces/auth.interface';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ModalSorteo from '../Modals/ModalSorteo';
type action = 'edit' | 'create'
export function TableHomeSorteos() {
    const [localStorageUser, setLocalStorageUser] = useState<User>();
    const { getContests } = useContest()
    const [errorRound, setErrorRound] = useState(false)
    useEffect(() => {
        getContests();
    }, [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setLocalStorageUser(user);
        }
    }, []);
    const { state } = useContext(ContestContext);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openSorteoModal, setOpenSorteoModal] = useState(false);
    const [action, setaction] = useState<action>("create")
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [data, setData] = useState<Contest>()
    const rows = state.payload
        .filter(contest => contest.status === true && contest.createdBy.name === localStorageUser?.name)
        .map((contest, index) => (
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
                                <Link style={{textDecoration:'none'}} href={'/dashboard/premios'}>
                                    <Menu.Item
                                        leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                    Agregar premios
                                    </Menu.Item>
                                </Link>

                                <Menu.Item
                                    color='green'
                                    leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={()=>{setOpenSorteoModal(true), setData(contest)}}
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
            <ModalSorteo data={data} open={openSorteoModal} onClose={() => setOpenSorteoModal(false)}  title='Sortear premios'></ModalSorteo>
            {errorRound && <Notification onClose={()=>setErrorRound(false)} pos={'absolute'} right={'0'} bottom={'0'} color="red" title="Ha ocurrido un error">
                Asegúrate de haber creado los premios necesarios
            </Notification>}
        </>
    );
}