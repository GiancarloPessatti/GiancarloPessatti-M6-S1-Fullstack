import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserContact, IUserLogin, IUserRegister } from "@/types";
import { useState } from "react";
import { AddIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/authContext";

interface ImodalFormPatchProps {
  idContact?: number;
}

const ModalFormPatchContact = ({ idContact }: ImodalFormPatchProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { patchContact } = useAuth();
  const formschame = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup
      .string()
      .email("deve ser um e-mail válido")
      .required("e-mail obrigatório"),
    phone: yup.number().required("Telefone obrigatório"),
  });
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const emailError = inputEmail === "";
  const nameError = inputName === "";
  const phoneError = inputPhone === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserContact>({
    resolver: yupResolver(formschame),
  });

  const onFormSubmit = (formData: IUserContact) => {
    onClose();
    patchContact(formData, idContact);
  };
  return (
    <>
      <Button width={5} onClick={onOpen}>
        <EditIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Contato</ModalHeader>
          <ModalBody pb={10}>
            <FormControl id="name" isRequired isInvalid={nameError}>
              <FormLabel>Nome</FormLabel>
              <Input
                required
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                type="text"
                {...register("name")}
                onChange={(e) => setInputName(e.target.value)}
              />
              {!nameError ? (
                <FormHelperText>Digite o nome</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                type="email"
                {...register("email")}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>Digite o e-mail</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="phone" isRequired isInvalid={phoneError}>
              <FormLabel>Telefone</FormLabel>
              <Input
                required
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                type="email"
                {...register("phone")}
                onChange={(e) => setInputPhone(e.target.value)}
              />
              {!phoneError ? (
                <FormHelperText>
                  Digite o Telefone (apenas números)
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter gap={5}>
            <Button
              size="lg"
              variant={"default"}
              onClick={handleSubmit(onFormSubmit)}
              _hover={{
                bg: "blue.400",
              }}
            >
              Atualizar
            </Button>
            <Button size="lg" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalFormPatchContact;
