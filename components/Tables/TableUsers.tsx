import { UsersContext } from "@/contexts/UsersContext";
import useUsers from "@/hooks/useUsers";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import ModalCrudPremios from "../Modals/ModalCrudPremios";
import { ModalDelete } from "../Modals/ModalDelete";
type action = "edit" | "create";
export function TableUsers() {
  const { getUsers } = useUsers();
  useEffect(() => {
    getUsers();
  }, []);
  const { state } = useContext(UsersContext);
  const [action, setaction] = useState<action>("create");
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [data, setData] = useState<any>();

  const rows = state.payload.map((user, index) => (
    <Table.Tr key={index}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>{user.status}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon
            variant="filled"
            aria-label="Settings"
            onClick={() => {
              setOpenModalEdit(true), setData(user), getUsers();
            }}
          >
            <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="Settings"
            onClick={() => {
              setOpenModalDelete(true), getUsers(), setData(user);
            }}
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
        <Card>
          <Group justify="space-between" pb={24}>
            <Title order={1}>Usuarios</Title>
            <Button
              onClick={() => {
                setOpenModalEdit(true), setaction("create");
              }}
            >
              Agregar usuario
            </Button>
          </Group>
          <Table.ScrollContainer minWidth={500} h={350}>
            <Table striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Nombre</Table.Th>
                  <Table.Th>Correo </Table.Th>
                  <Table.Th>Rol</Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th>Acciones</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card>

      <ModalCrudPremios
        abrirModal={openModalEdit}
        setModalEdit={setOpenModalEdit}
        title="Editar premio"
        data={data}
        action={action}
      />
      <ModalDelete
        abrirModal={openModalDelete}
        setModalDelete={setOpenModalDelete}
        data={data}
        action="prize"
      />
    </>
  );
}
