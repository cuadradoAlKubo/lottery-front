'use client'
import React from 'react'
import { Grid, Select, TextInput, Text, Image, SimpleGrid, Group, rem, Center, Card, Button, Skeleton, Modal } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath, } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Contest } from '@/interfaces/constest.inteface';
import useModalCrudSorteos from '@/hooks/useModalCrudSorteos';
const initialState = { name: "", contestStatus: "", rounds: 0, contestDate: "", previewImg: <Skeleton height={160} /> };
interface ModalCrudSorteosProps {
    abrirModal?: boolean;
    title?: string
    setModalEdit?: (value: boolean) => void
    data?: Contest
    action: "create" | "edit"
}
export default function ModalCrudSorteos({ action, abrirModal = false, title, setModalEdit = () => { }, data = {
    _id: "",
    name: "",
    status: false,
    rounds: 0,
    contestDate: "",
    createdBy: { _id: "", name: "" },
    image: "",
    createdAt: "",
    contestStatus: "",
} }: ModalCrudSorteosProps) {
    const { setFiles, setPost, post, files, opened, handleInputChange, newValue, handleStatusChange, handlePostContest, getContests }
        = useModalCrudSorteos(data, abrirModal, setModalEdit, initialState, action, data._id);
    const handleDrop = (files: FileWithPath[]) => {
        setFiles(files);
        const previews = files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
        });
        setPost({ ...post, previewImg: previews[0] });
    };

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image height={200} width={200} key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <>
            <Modal opened={opened} onClose={() => { close(), setModalEdit(false) }} title={title} centered size="xl">
                <Grid>
                    <InputCol label="Nombre del sorteo" placeholder={data?.name}
                        onChange={(e: any) => handleInputChange(e, 'name')} value={newValue?.name} />
                    <StatusCol placeholder={data?.contestStatus} onChange={handleStatusChange} />
                    <InputCol label="Numero de rondas" placeholder={data?.rounds} type='number'
                        onChange={(e: any) => handleInputChange(e, 'rounds')} value={newValue?.rounds} />
                    <InputCol label="Fecha del sorteo" type="datetime-local"
                        onChange={(e: any) => handleInputChange(e, 'contestDate')} value={newValue?.contestDate} />
                    <DropzoneCol onDrop={handleDrop} />
                    <PreviewCol previews={previews} />
                    <ButtonCol onClick={() => { handlePostContest(), getContests(), setModalEdit(false) }} />
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

const StatusCol = ({ onChange, placeholder = "OPEN | PENDING | FINISHED" }: any) => (
    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
        <Select
            label="Estado del sorteo"
            placeholder={placeholder}
            data={["OPEN", "PENDING", "FINISHED"]}
            onChange={onChange}
        />
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