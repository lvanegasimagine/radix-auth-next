'use client'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SigninForm = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    values: {
      email: '',
      password: ''
    }
  })

  const router = useRouter()
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if (res?.error) {
        toast.error('Error al iniciar sesión')
      }

      if (res?.ok) {
        toast.success('Login exitoso')
        reset()
        router.push('/dashboard')
      }
    } catch (error) {
      console.log('🚀 ~ file: SigninForm.tsx:11 ~ onSubmit ~ error:', error)
    }
  })

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <Flex direction='column' gap={'4'} mt="5">
        <label htmlFor='email'>Email</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height={'16'} width={'16'} />
          </TextField.Slot>
          <Controller name='email' control={control} rules={{ required: { message: 'Email es requerido', value: true } }} render={({ field }) => (<TextField.Input type='email' placeholder='email@domain.com' autoFocus {...field} />)} />
        </TextField.Root>
        {errors.email && <Text color='ruby' className='text-xs'>{errors.email.message}</Text>}
        <label htmlFor='password'>Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height={'16'} width={'16'} />
          </TextField.Slot>
          <Controller name='password' control={control} rules={{ required: { message: 'El Password es requerido', value: true } }} render={({ field }) => (<TextField.Input type='password' placeholder='******' {...field} />)} />
        </TextField.Root>
        {errors.password && <Text color='ruby' className='text-xs'>{errors.password.message}</Text>}
        <Button mt="5" type='submit'>Login</Button>
      </Flex>
    </form>
  )
}

export default SigninForm
