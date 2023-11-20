'use client'
import React from 'react'
import { Button, TextArea, TextField, Container, Flex, Card, Heading, Text } from '@radix-ui/themes'
import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
const TaskNewPage = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    values: {
      title: '',
      description: ''
    }
  })
  const router = useRouter()
  const params = useParams()

  React.useEffect(() => {
    if (params.projectId) {
      axios.get(`/api/projects/${params.projectId}`).then(res => {
        reset(res.data)
      }).catch((err: any) => {
        console.log('🚀 ~ file: page.tsx:24 ~ axios.get ~ err:', err)
        toast.error('Project Not found')
        router.push('/dashboard')
      })
    }

    return () => {

    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!params.projectId) {
        const resp = await axios.post('/api/projects', data)

        if (resp.status === 201) {
          toast.success('Project Created')
          reset()
          router.push('/dashboard')
          router.refresh()
        }
      } else {
        const resp = await axios.put(`/api/projects/${params.projectId}`, data)
        if (resp.status === 200) {
          toast.success('Project Updated')
          reset()
          router.push('/dashboard')
          router.refresh()
        }
      }
    } catch (error) {
      console.error('🚀 ~ file: page.tsx:20 ~ onSubmit ~ error:', error)
    }
  })

  const handleDelete = async (projectId: string) => {
    const res = await axios.delete(`/api/projects/${projectId}`)

    if (res.status === 200) {
      toast.success('Project Deleted Successfully')
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div>
      <Container size='1' height='100%' className='p-3 md:p-0'>
        <Flex className='h-screen w-full items-center'>
          <Card className='w-full p-7'>
            <form onSubmit={onSubmit} className='flex gap-y-4 flex-col'>
              <Heading>{params.projectId ? 'Edit Project' : 'Create Project'}</Heading>
              <label className='font-medium'>Project Title</label>
              <Controller control={control} name='title' rules={{ required: { message: 'Title is Required', value: true } }} render={({ field }) => (<TextField.Input size='3' placeholder='Create a new task' {...field} autoFocus />)} />
              {errors.title && <Text color='ruby' className='text-xs'>{errors.title.message}</Text>}
              <label htmlFor="" className='font-medium'>Project Description</label>
              <Controller control={control} name='description' rules={{ required: { message: 'Description is Required', value: true } }} render={({ field }) => (<TextArea size='3' placeholder='Reply to comment...' {...field} />)} />
              {errors.description && <Text color='ruby' className='text-xs'>{errors.description.message}</Text>}
              <Button>
                {params.projectId ? (<Pencil1Icon width='16' height='16' />) : (<PlusIcon width={'16'} height={'16'} />)}
                {params.projectId ? 'Edit Project' : 'Create Project'}
              </Button>
            </form>
            <div className='flex justify-end my-4'>
              {params.projectId && (
                <Button color='ruby' onClick={() => { handleDelete(params.projectId.toString()) }}><TrashIcon width='16' height='16' />Delete </Button>
              )}
            </div>
          </Card>
        </Flex>
      </Container>
    </div>
  )
}

export default TaskNewPage
