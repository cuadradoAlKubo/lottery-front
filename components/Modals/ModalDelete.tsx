import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, Group, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Contest } from '@/interfaces/constest.inteface';
import { Payload } from '@/interfaces/prizes.interfaces';
import useApi from '@/api/useApi';


interface ModalDeleteProps {
    abrirModal: boolean;
    title?: string;
    setModalDelete: (value: boolean) => void;
    data: Contest | undefined
    action?: "contest" | "prize";
}

export function ModalDelete({ abrirModal = true, title, setModalDelete = () => { }, data, action }: ModalDeleteProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [newData, setNewData] = useState<Contest | Payload>()
    const { del } = useApi();
    useEffect(() => {
        abrirModal ? open() : close()
    }, [abrirModal, close])
    useEffect(() => {

        setNewData(data);
        console.log(data);

    }, [data])
    const handleDelete = async () => {
        setModalDelete(false);
        let endpoint = '';
        if (action === 'contest') {
            endpoint = `https://privatedevs.com/api-contest/api/v1/contests/${data?._id}`;
        } else if (action === 'prize') {
            endpoint = `https://privatedevs.com/api-contest/api/v1/prizes/${data?._id}`;
        }
        try {
            await del(endpoint);
        } catch (error) {
            console.error(error);
        }
        close();
    }

    return (
        <>
            <Modal centered opened={opened} onClose={() => { close(), setModalDelete(false) }} title={title}>
                <Center>
                    <Title pb={24} order={3}>Estas seguro de Elimnar {title} {newData?.name}</Title>
                </Center>
                <Group justify="end">
                    <Group justify="space-between">
                        <Button onClick={close}>Cancel</Button>
                        <Button color="red" onClick={handleDelete}>Delete</Button>
                    </Group>
                </Group>
            </Modal>
        </>
    );
}