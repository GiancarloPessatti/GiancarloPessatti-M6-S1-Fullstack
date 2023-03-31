import api from "@/services/api";
import {
  IUserLogin,
  IProviderProps,
  IUserRegister,
  IUserContact,
} from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import {
  createContext,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FieldValues } from "react-hook-form";

interface AuthProviderData {
  login: (userData: IUserLogin) => void;
  registerModal: (userData: IUserRegister) => void;
  createContact: (userData: IUserContact) => void;
  deleteContact: (ID: number) => void;
  contacts: IUserContact[];
  setContacts: Dispatch<SetStateAction<never[]>>;
  isLoged: boolean;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: IProviderProps) => {
  const [isLoged, setisLoged] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const login = (userData: IUserLogin) => {
    api
      .post("/api/login", userData)
      .then((response) => {
        setCookie(null, "kenzie.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        setCookie(null, "kenzie.user", response.data.userName, {
          maxAge: 60 * 30,
          path: "/",
        });

        toast({
          title: "sucess",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Login realizado com sucesso !
            </Box>
          ),
        });
        setContacts(response.data.contacts);
      })
      .catch((err) => {
        setisLoged(true);
        toast({
          title: "error",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Erro ao logar, verifique se o e-mail e senha estão corretos
            </Box>
          ),
        });
      });
  };
  const registerModal = (userData: IUserRegister) => {
    api
      .post("/api/register", userData)
      .then((response) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Registro realizado com sucesso !
            </Box>
          ),
        });
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Erro ao registrar, verifique se os dados estão corretos!
            </Box>
          ),
        });
      });
  };
  const createContact = async (userData: FieldValues) => {
    api
      .post("/api/user/contact", userData)
      .then(async (response) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Contato adicionado!
            </Box>
          ),
        });
        const newProfile = await api.get("/profile");
        setContacts(newProfile.data.contacts);
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Erro ao registrar, verifique se os dados estão corretos!
            </Box>
          ),
        });
      });
  };
  const deleteContact = async (ID: number) => {
    await api
      .delete(`/users/contact/${ID}`)
      .then(async (response) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Contato adicionado!
            </Box>
          ),
        });
        const newUser = await api.get("/profile");
        setContacts(newUser.data.contacts);
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Erro ao deletar!
            </Box>
          ),
        });
      });
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        registerModal,
        deleteContact,
        isLoged,
        createContact,
        contacts,
        setContacts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
