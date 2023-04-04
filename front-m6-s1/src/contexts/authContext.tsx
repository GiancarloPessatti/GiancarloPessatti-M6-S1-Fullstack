import api from "@/services/api";
import {
  IUserLogin,
  IProviderProps,
  IUserRegister,
  IUserContact,
  IUser,
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
  patchContact: (userData: IUserContact, ID: number | undefined) => void;
  contacts: IUserContact[];
  profile?: IUser | undefined;
  setContacts: Dispatch<SetStateAction<never[]>>;
  setisLoged: Dispatch<SetStateAction<boolean>>;
  isLoged: boolean;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: IProviderProps) => {
  const [isLoged, setisLoged] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [profile, setProfile] = useState(undefined);
  const login = (userData: IUserLogin) => {
    api
      .post("/api/login", userData)
      .then(async (response) => {
        console.log(response);
        setCookie(null, "kenzie.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        const userLogged = await api.get(`/api/profile`);
        setProfile(userLogged.data);
        console.log(userLogged.data);
        setContacts(userLogged.data.contacts);
        setisLoged(true);
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
      })
      .catch((err) => {
        console.log(err);
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
      .post("/api/users", { ...userData, isAdm: false })
      .then((response) => {
        console.log(response);
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
      .post("/api/contacts/user", userData)
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
        const newProfile = await api.get("/api/profile");
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
      .delete(`/api/contact/${ID}`)
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
              Contato deletado!
            </Box>
          ),
        });
        const newUser = await api.get("/api/profile");
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
  const patchContact = async (
    userData: FieldValues,
    ID: number | undefined
  ) => {
    api
      .patch(`/api/users/contact/${ID}`, userData)
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
              Contato editado!
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
              Erro ao editar, verifique se os dados estão corretos!
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
        patchContact,
        setisLoged,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
