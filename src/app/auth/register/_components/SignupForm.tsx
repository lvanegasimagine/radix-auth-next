'use client'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
const SignupForm = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    values: {
      name: '',
      email: '',
      password: ''
    }
  })
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post('/api/auth/register', data)

      if (res.status === 201) {
        const result = await signIn('credentials', {
          email: res.data.email,
          password: data.password,
          redirect: false
        })

        if (!result?.ok) alert('Error al iniciar sesión')

        router.push('/dashboard')
        reset()
      }
    } catch (error: any) {
      alert(error.response.data.error)
    }
  })

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <Flex direction='column' gap={'3'} mt="5">
        <label htmlFor='username'>Username</label>
        <TextField.Root>
          <TextField.Slot>
            <PersonIcon height={'16'} width={'16'} />
          </TextField.Slot>
          <Controller name="name" control={control} rules={{ required: { message: 'Username es requerido', value: true } }} render={({ field }) => (<TextField.Input type='text' placeholder='John Doe' {...field} autoFocus />)} />
        </TextField.Root>
        {errors.name && <Text color='ruby' className='text-xs'>{errors.name.message}</Text>}
        <label htmlFor='email'>Email</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height={'16'} width={'16'} />
          </TextField.Slot>
          <Controller name='email' control={control} rules={{ required: { message: 'Email es requerido', value: true } }} render={({ field }) => (<TextField.Input type='email' placeholder='email@domain.com' {...field} />)} />
        </TextField.Root>
        {errors.email && <Text color='ruby' className='text-xs'>{errors.email.message}</Text>}
        <label htmlFor='password'>Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height={'16'} width={'16'} />
          </TextField.Slot>
          <Controller name='password' control={control} rules={{ required: { message: 'Password is required', value: true } }} render={({ field }) => (<TextField.Input type="password" placeholder="******" {...field} />)} />
        </TextField.Root>
        {errors.password && <Text color="ruby" className="text-xs">{errors.password.message}</Text>}
        <Button mt={'5'} type='submit'>Register</Button>
      </Flex>
    </form>
  )
}

export default SignupForm
