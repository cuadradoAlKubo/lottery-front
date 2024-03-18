import React, { useState } from "react";
import {
  Flex,
  Button,
  Card,
  Center,
  PasswordInput,
  TextInput,
  Title,
  Container,
} from "@mantine/core";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Md5 } from "ts-md5";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await login(email, Md5.hashStr(password));
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid size="xl">
      <Flex direction={"column"} justify="center" align="center" h="100vh">
        <Card w={400}>
          <Center>
            <Flex direction={"column"} justify="center" align="center">
              <img
                src="/assets/ISO-DUO.png"
                alt="logo"
                width={80}
                height={80}
              />
              <Title order={1} pb={30}>
                dev/Sorteos
              </Title>
            </Flex>
          </Center>
          <form onSubmit={handleSubmit}>
            <TextInput
              variant="filled"
              size="lg"
              label="Correo"
              pb={10}
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <PasswordInput
              label="Contraseña"
              pb={30}
              variant="filled"
              size="lg"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <Button fullWidth size="lg" variant="filled" type="submit">
              Iniciar sesión
            </Button>
          </form>
        </Card>
      </Flex>
    </Container>
  );
};

export default Login;
