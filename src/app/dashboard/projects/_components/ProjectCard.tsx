'use client'
import { type Project } from '@prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  project: Project
}
const ProjectCard = ({ project }: Props) => {
  const router = useRouter()
  return (
        <Card key={project.title} className='hover:cursor-pointer hover:opacity-90' onClick={() => { router.push(`/dashboard/projects/${project.id}`) }}>
            <Heading>{project.title}</Heading>
            <Text className='text-slate-500'>{project.description}</Text>
        </Card>
  )
}

export default ProjectCard
