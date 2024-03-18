"use client";
import { useEffect, useContext, useState } from "react";
import { useRouter } from 'next/navigation'
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
import { IconLogout } from "@tabler/icons-react";
import { AuthContext } from "@/contexts/AuthContext";
import AvatarLogo from "../../assets/normal-face.png";
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
 
  const { state, dispatch } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const isTokenInvalid = !state.token || state.token.length <= 12;
    if (isTokenInvalid) {
      router.replace("/");
    }
    setLoading(false);
  }, [state.token, router]);
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
                onClick={() => {dispatch({ type: "LOGOUT" }); router.replace("/");}}
                description={state.user ? state.user.email : "Inicia sesión"}
                rightSection={<IconLogout />}
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
