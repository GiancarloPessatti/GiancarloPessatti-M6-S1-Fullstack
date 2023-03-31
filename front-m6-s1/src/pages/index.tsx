import React from 'react'
import ModalFormLogin from '@/components/modalformlogin'
import { Center, Square, Circle } from '@chakra-ui/react'
import ModalFormRegister from '@/components/modalformregister'
import { Flex } from '@chakra-ui/react'

const Home = () => {
  return (
    <Flex p={10} justify="right">
      <Center gap={5}>
        <ModalFormRegister/>
        <ModalFormLogin/>
      </Center>
    </Flex>
  )
}

export default Home