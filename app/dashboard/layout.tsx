"use client";
import { useEffect, useContext, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import NavbarFooter from "@/components/Navbar/NavbarFooter";
import {
  AppShell,
  Avatar,
  Burger,
  Center,
  Group,
  NavLink,
  ScrollArea,
  Skeleton,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { AuthContext } from "@/contexts/AuthContext";
import AvatarLogo from "../../assets/normal-face.png";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { state } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (
      state.token === null ||
      state.token === "" ||
      state.token === undefined ||
      state.token.length <= 12
    ) {
      window.location.href = "/";
    }
    setLoading(false);
  }, []);
  if (!loading) {
    return (
      <AppShell
        layout="alt"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <AppShell.Section>
            <Group>
              <Burger
                opened={opened}
                onClick={() => setOpened(!opened)}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
          </AppShell.Section>
          <AppShell.Section grow my="md" component={ScrollArea}>
            <Navbar />
          </AppShell.Section>
          <AppShell.Section >
            <Center>
              <NavbarFooter />
            </Center>
            {state.user ? (
              <NavLink
                label={state.user ? state.user.name : "Anónimo"}
                description={state.user ? state.user.email : "Inicia sesión"}
                rightSection={<IconChevronRight />}
                leftSection={
                  <Avatar src="/assets/normal-face.png" radius="xl" />
                }
              />
            ) : null}
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    );
  }
}
