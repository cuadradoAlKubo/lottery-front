import { PrizesContext } from '@/contexts/PrizesContext';
import usePrizes from '@/hooks/usePrizes';
import { Button, Card, Group, rem, Table, TextInput, Title, Menu } from '@mantine/core';
import {  IconTrash, IconSettings} from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import ModalCrudPremios from '../Modals/ModalCrudPremios';
import { ModalDelete } from '../Modals/ModalDelete';
import { User } from '@/interfaces/auth.interface';
import { ContestContext } from '@/contexts/ContestContext';
type action = 'edit' | 'create'
export function TableHomePremios() {
    const [localStorageUser, setLocalStorageUser] = useState<User>();
    const { getPrizes } = usePrizes()
    useEffect(() => {
        getPrizes();
    }, [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setLocalStorageUser(user);
        }
    }, []);
    const { state } = useContext(PrizesContext);
    const [nombresSorteos, setNombresSorteos] = useState<any[]>([]);
    const [sorteos, setSorteos] = useState<any[]>([]);
    const { state: stateContest } = useContext(ContestContext);
    const [action, setaction] = useState<action>("create")
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [data, setData] = useState<any>()
    useEffect(() => {
        let tempNombresSorteos: any = []
        let tempSorteos: any = []
        stateContest.payload.map((sorteo) => {
            if (sorteo.createdBy.name === localStorageUser?.name) {
                tempNombresSorteos.push({ label: sorteo.name, value: sorteo._id })
            }
        })
        setNombresSorteos(tempNombresSorteos);
        setSorteos(tempSorteos);
    }, [state, localStorageUser])
    const rows = state.payload
        .filter(prizes => prizes.status === true && nombresSorteos.some(sorteo => sorteo.value === prizes.contestId?._id))
        .map((prizes, index) => (
            <Table.Tr key={index}>
                <Table.Td>{prizes.name}</Table.Td>
                <Table.Td>{prizes.description}</Table.Td>
                <Table.Td>{prizes.contestId?.name}</Table.Td>
                <Table.Td>{prizes.status}</Table.Td>
                <Table.Td>
                    <Group>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Button>Acciones</Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Edición</Menu.Label>
                                <Menu.Item
                                    onClick={() => { setOpenModalEdit(true), setData(prizes), getPrizes() }}
                                    leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                Editar
                                </Menu.Item>
                                <Menu.Item 
                                    color='red'
                                    onClick={() => { setOpenModalDelete(true), getPrizes(),setData(prizes) }}
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                Eliminar
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
                    <Title order={1}>Premios</Title>
                    <Button onClick={() => { setOpenModalEdit(true), setaction("create") }} >Agregar premio</Button>
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
            <ModalCrudPremios abrirModal={openModalEdit} setModalEdit={setOpenModalEdit} title='Editar premio' data={data} action={action} />
            <ModalDelete abrirModal={openModalDelete} setModalDelete={setOpenModalDelete} data={data} action='prize' />
        </>
    );
}