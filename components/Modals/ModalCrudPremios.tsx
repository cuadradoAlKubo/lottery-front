'use client'
import { useDisclosure } from '@mantine/hooks';
import React, {  useEffect, useState } from 'react'
import { Grid, TextInput, Image, SimpleGrid, Group, rem, Center, Card, Button, Skeleton, Modal, Textarea, Text } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import useContestPost from '@/hooks/useContestPost';
import { Payload } from '@/interfaces/prizes.interfaces';
import useApi from '@/api/useApi';
import usePrizes from '@/hooks/usePrizes';

const initialState = { name: "", description: "", previewImg: <Skeleton height={160} /> };

interface ModalCrudSorteosProps {
    abrirModal?: boolean;
    title?: string
    setModalEdit?: (value: boolean) => void
    data?: Payload | undefined
}

export default function ModalCrudSorteos({ abrirModal = false, title, setModalEdit = () => { }, data = {
    name: "",
    description: ""
} }: ModalCrudSorteosProps) {
    const { getPrizes } = usePrizes()
    const [opened, { open, close }] = useDisclosure(false);
    const [post, setPost] = useState(initialState);
    const [newValue, setNewValue] = useState(data)
    const { postContest } = useContestPost();
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const { post: postApi } = useApi();
    useEffect(() => {
        abrirModal ? open() : close()
    }, [abrirModal])
    const handleDrop = (files: FileWithPath[]) => {
        setFiles(files);
        const previews = files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
        });
        setPost({ ...post, previewImg: previews[0] });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setPost({ ...post, [field]: event.target.value });
        setNewValue({ ...newValue, [field]: event.target.value });
    };

    const handlePostPrizes = async () => {
        await postApi('https://privatedevs.com/api-contest/api/v1/prizes/create', { name: post.name, description: post.description, contestId: "65f49180f37c5175e73b6d45", orderToLot: 3 })
        setPost(initialState);
        close();
    };

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image height={200} width={200} key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <>
            <Modal opened={opened} onClose={() => { close(), setModalEdit(false) }} title={title} centered size="xl">
                <Grid>
                    <InputCol label="Nombre del premio" placeholder={data?.name} onChange={(e: any) => handleInputChange(e, 'name')} value={newValue?.name} />
                    <TextCol label="Descripción" onChange={(e: any) => handleInputChange(e, 'description')} value={newValue?.description} />
                    <DropzoneCol onDrop={handleDrop} />
                    <PreviewCol previews={previews} />
                    <ButtonCol onClick={() => { handlePostPrizes(), getPrizes(), setModalEdit(false) }} />
                </Grid>
            </Modal>
        </>
    );
}

// cuerpo del formulario
const InputCol = ({ label, placeholder, type, onChange, value }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput label={label} withAsterisk placeholder={placeholder} type={type} onChange={onChange} value={value} />
    </Grid.Col>
);
const TextCol = ({ label, placeholder, onChange, value }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
        <Textarea label={label} withAsterisk placeholder={placeholder} onChange={onChange} value={value} />
    </Grid.Col>
);


const DropzoneCol = ({ onDrop, ...props }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
        <Dropzone onDrop={onDrop} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
            <Card>
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                    </Dropzone.Idle>
                    <div>
                        <Text size="xl" inline>Drag images here or click to select files</Text>
                        <Text size="sm" c="dimmed" inline mt={7}>Attach as many files as you like, each file should not exceed 5mb</Text>
                    </div>
                </Group>
            </Card>
        </Dropzone>
    </Grid.Col>
);

const PreviewCol = ({ previews }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }} pb={30}>
        <SimpleGrid cols={{ base: 1, sm: 1 }} mt={previews.length > 0 ? 'xl' : 0}>
            <Center>{previews}</Center>
        </SimpleGrid>
    </Grid.Col>
);

const ButtonCol = ({ onClick }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
        <Group justify="end">
            <Button onClick={onClick}>Publicar sorteo</Button>
        </Group>
    </Grid.Col>
);