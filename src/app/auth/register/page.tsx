import { Card, Container, Heading, Flex, Text, Link } from '@radix-ui/themes'
import React from 'react'
import { SignupForm } from './_components'
import NavLink from 'next/link'

const RegisterPage = () => {
  return (
        <>
            <Container size="1" height='100%' className='p-3 md:p-0'>
                <Flex className='h-[calc(100vh-10rem)] w-full items-center'>
                    <Card className='w-full p-7'>
                        <Heading>Register</Heading>
                        <SignupForm />
                        <Flex justify={'between'} mt='5'>
                            <Text>Already have an Account</Text>
                            <Link asChild>
                                <NavLink href={'/auth/login'}>
                                    Sign In
                                </NavLink>
                            </Link>
                        </Flex>
                    </Card>
                </Flex>
            </Container>
        </>
  )
}

export default RegisterPage
