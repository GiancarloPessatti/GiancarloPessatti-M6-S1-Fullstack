import React from 'react'
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

} from "@chakra-ui/react"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { IUserLogin } from "@/types"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
// import { useAuth } from "@/contexts/authContext"

const ModalFormLogin = () => {

    const { isOpen, onOpen, onClose} = useDisclosure()
    // const {login} = useAuth()
    const formschame = yup.object().shape({
        email: yup.string().email("deve ser um e-mail válido").required("E-mail obrigatório"),
        password:  yup.string().required("Senha obrigatória")
    })
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const emailError = inputEmail === ""
    const passwordError = inputPassword === ""

    const {
        register,
        handleSubmit,
        formState: {errors}  
      } = useForm<IUserLogin>({
          resolver: yupResolver(formschame)
      })

    const onFormSubmit = (formData:IUserLogin) => {
        console.log(formData)
        // login(formData)
    }
  return (
    <> 
       <Button onClick={onOpen}>Login</Button>
       
       <Modal
       isOpen={isOpen}
       onClose={onClose}
       >
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Faça Login!</ModalHeader>
            <ModalBody pb={10}>
                <FormControl id="email" isRequired isInvalid={emailError}>
                    <FormLabel>E-mail</FormLabel>
                    <Input required focusBorderColor="blue.500" errorBorderColor='red.500' type="email" {...register("email")} onChange={(e) => setInputEmail(e.target.value)}/>
                    {!emailError ? (
                        <FormHelperText>  
                        Digite seu e-mail
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>
                            {errors.email?.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl id="password" isRequired isInvalid={passwordError}>
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                        <Input required focusBorderColor="blue.500" errorBorderColor='red.500' type={showPassword ? 'text' : 'password'} {...register("password")} onChange={(e) => setInputPassword(e.target.value)}/>
                        <InputRightElement>
                            <Button
                            variant={'ghost'}
                            onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {!passwordError ? (
                        <FormHelperText>  
                        Digite sua senha
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>
                        {errors.password?.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            </ModalBody>
            <ModalFooter gap={5}>
                <Button
                  size="lg"
                  variant={"default"}
                  onClick={handleSubmit(onFormSubmit)}
                  _hover={{
                    bg: 'blue.400',
                  }}>
                    Entrar
                </Button>
                <Button
                size="lg"
                onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
          </ModalContent>
       </Modal>
        </>
  )
}

export default ModalFormLogin