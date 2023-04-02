import React from "react";
import ModalFormLogin from "@/components/modalformlogin";
import {
  Center,
  Square,
  Circle,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";
import ModalFormRegister from "@/components/modalformregister";
import { Flex, Container, Box } from "@chakra-ui/react";
import { useAuth } from "@/contexts/authContext";
import { DeleteIcon, LockIcon } from "@chakra-ui/icons";
import ModalFormContact from "@/components/modalformcontact";
import ModalFormPatchContact from "@/components/modalformpatchcontact";

const Home = () => {
  const contatos = [
    {
      nome: "João",
      phone: "47988793151",
      email: "ginasdads@dmaisdmad.com",
      id: 3,
    },
    {
      nome: "Silva",
      phone: "47988793151",
      email: "ginasdads@dmaisdmad.com",
      id: 1,
    },
    {
      nome: "Roberto",
      phone: "47988793151",
      email: "ginasdads@dmaisdmad.com",
      id: 4,
    },
  ];
  const { isLoged, contacts, deleteContact, setisLoged } = useAuth();
  const logout = () => {
    setisLoged(false);
  };

  return (
    <>
      <Flex p={10} justify="right">
        <Center gap={5}>
          {isLoged ? (
            <Button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <ModalFormRegister />
              <ModalFormLogin />
            </>
          )}
        </Center>
      </Flex>
      <Container height={"100vh"} maxWidth={"100%"}>
        <Box
          p={10}
          display={"block"}
          bg={"red.600"}
          w={"100%"}
          borderBottom={"2px"}
          borderColor={"blackAlpha.500"}
        >
          {isLoged ? (
            <Box bg={"blue.600"}>
              <h2>Seu Nome</h2>
              <h3>Seu Email</h3>
              <p>xxxx-xxxx</p>
            </Box>
          ) : (
            <h1>Logue para ver suas informações!</h1>
          )}
        </Box>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          p={10}
          display={"flex"}
          bg={"red.600"}
          w={"100%"}
          h={"99vh"}
        >
          {isLoged ? (
            <Box
              display={"flex"}
              gap={10}
              flexDirection={"column"}
              w={"60%"}
              h={"90%"}
              p={5}
              bg={"blue.600"}
            >
              <ModalFormContact></ModalFormContact>
              <List overflow={"auto"} h={"80%"} spacing={10}>
                {contatos.map((contato: any, index: number) => {
                  return (
                    <ListItem key={index}>
                      <List>
                        <h2>{contato.nome}</h2>
                        <h3>{contato.phone}</h3>
                        <p>{contato.email}</p>
                      </List>
                      <Button onClick={() => deleteContact(contato.id)}>
                        <DeleteIcon />
                      </Button>
                      <ModalFormPatchContact idContact={contato.id} />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ) : (
            <LockIcon justifyContent={"center"} boxSize={150} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
