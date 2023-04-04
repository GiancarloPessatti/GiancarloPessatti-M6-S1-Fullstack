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
import { destroyCookie } from "nookies";
import ModalFormUserPatch from "@/components/modalformuserpatch";

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
  const { isLoged, contacts, deleteContact, setisLoged, profile } = useAuth();
  const logout = () => {
    destroyCookie(null, "kenzie.token");
    setisLoged(false);
  };

  return (
    <>
      <Flex p={10} justify="right">
        <Center gap={5}>
          {isLoged ? (
            <>
              <ModalFormUserPatch />
              <Button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </>
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
          w={"100%"}
          bg={"blackAlpha.700"}
          borderRadius={"5px"}
          color={"white"}
        >
          {isLoged ? (
            <>
              <Flex flexDirection={"column"}>
                <Box fontSize={30}>
                  <h1>
                    <strong>{profile?.name}</strong>
                  </h1>
                </Box>
                <Box p={5}>
                  <h3>{profile?.email}</h3>
                  <p>{profile?.phone}</p>
                </Box>
              </Flex>
            </>
          ) : (
            <Box fontSize={30}>
              <h1>Logue para ver suas informações!</h1>
            </Box>
          )}
        </Box>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          p={10}
          display={"flex"}
          w={"100%"}
          h={"99vh"}
        >
          {isLoged ? (
            <Box
              display={"flex"}
              gap={10}
              flexDirection={"column"}
              w={"60%"}
              minW={"320px"}
              h={"90%"}
              p={5}
            >
              <ModalFormContact></ModalFormContact>
              <List overflow={"auto"} h={"80%"} spacing={10}>
                {contacts.map((contato: any, index: number) => {
                  return (
                    <ListItem
                      border={"2px"}
                      borderColor={"blackAlpha.500"}
                      p={5}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      display={"flex"}
                      key={index}
                      borderRadius={5}
                    >
                      <List
                        width={"55%"}
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <h2>
                          <strong>{contato.name}</strong>
                        </h2>
                        <h3>{contato.phone}</h3>
                        <p>{contato.email}</p>
                      </List>
                      <Box display={"flex"} gap={"1rem"}>
                        <Button
                          blockSize={"auto"}
                          onClick={() => deleteContact(contato.id)}
                        >
                          <DeleteIcon />
                        </Button>
                        <ModalFormPatchContact idContact={contato.id} />
                      </Box>
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
