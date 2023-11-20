'use client'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { Heading, Link, Flex, Container, DropdownMenu, Button } from '@radix-ui/themes'
import { useSession, signOut } from 'next-auth/react'
import NavLink from 'next/link'
import React from 'react'

const Navbar = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  return (
        <nav className='px-6 md:px-0 py-5 my-5 shadow-md'>
            <Container className='md:mx-7'>
                <Flex justify={'between'} align={'center'}>
                    <NavLink href='/' passHref>
                        <Heading>
                            Radixnext
                        </Heading>
                    </NavLink>
                    <ul className='flex gap-x-2 font-semibold items-center'>
                        {!session && (
                            <>
                                <li>
                                    <Link asChild>
                                        <NavLink href='/auth/login' passHref>Login</NavLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link asChild>
                                        <NavLink href='/auth/register' passHref>Register</NavLink>
                                    </Link>
                                </li>
                            </>
                        )}
                        {
                            session && (<div className='flex flex-col items-center justify-center gap-2 md:flex-row md:text-sm'>
                                <li>
                                    <Link asChild>
                                        <NavLink href='/dashboard' passHref>Dashboard</NavLink>
                                    </Link>
                                </li>
                                <li>
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                            <Button variant="soft">
                                                {session.user.name}
                                                <CaretDownIcon />
                                            </Button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content>
                                            <DropdownMenu.Item>My Profile</DropdownMenu.Item>
                                            <DropdownMenu.Item>Settings</DropdownMenu.Item>
                                            <DropdownMenu.Separator />
                                            <DropdownMenu.Item color="red" onClick={async () => { await signOut() }}>
                                                Logout
                                            </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </li>
                            </div>)
                        }
                    </ul>
                </Flex>
            </Container>
        </nav>
  )
}

export default Navbar
