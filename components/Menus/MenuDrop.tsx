import { Menu, Button, Text, rem } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

export default function MenuDrop() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>Acciones</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Edición</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Editar
        </Menu.Item>
        <Menu.Item leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
          Eliminar
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Sorteo</Menu.Label>
        <Menu.Item
            color='green'
          leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
        >
          Sortear premio
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}