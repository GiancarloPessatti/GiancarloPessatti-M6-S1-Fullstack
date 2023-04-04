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
import { IUserLogin, IUserRegister } from "@/types";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/authContext";

const ModalFormRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerModal } = useAuth();
  const formschame = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup
      .string()
      .email("Deve ser um e-mail válido")
      .required("E-mail obrigatório"),
    phone: yup.string().required("Telefone obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailError = inputEmail === "";
  const passwordError = inputPassword === "";
  const nameError = inputName === "";
  const phoneError = inputPhone === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: yupResolver(formschame),
  });

  const onFormSubmit = (formData: IUserRegister) => {
    console.log(formData);
    registerModal(formData);
  };
  return (
    <>
      <Button onClick={onOpen}>Registrar</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crie sua conta!</ModalHeader>
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
                <FormHelperText>Digite seu Nome</FormHelperText>
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
                <FormHelperText>Digite seu e-mail</FormHelperText>
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
                type="text"
                {...register("phone")}
                onChange={(e) => setInputPhone(e.target.value)}
              />
              {!phoneError ? (
                <FormHelperText>
                  Digite seu Telefone (apenas números)
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={passwordError}>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  required
                  focusBorderColor="blue.500"
                  errorBorderColor="red.500"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!passwordError ? (
                <FormHelperText>Digite sua senha</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
              Registrar
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

export default ModalFormRegister;
