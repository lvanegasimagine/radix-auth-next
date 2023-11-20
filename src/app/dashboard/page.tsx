import { Container } from '@radix-ui/themes'
import React from 'react'
import HeaderDashboard from './_components/HeaderDashboard'
import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import ProjectCard from './projects/_components/ProjectCard'
import { redirect } from 'next/navigation'

async function loadProjects (userId: number) {
  return await prisma.project.findMany({
    where: {
      userId
    }
  })
}

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth/login')

  const projects = await loadProjects(Number(session.user.id))

  return (
    <Container className='px-6 md:px-0'>
      <HeaderDashboard />
      {projects.length === 0 && (
        <div className='flex justify-center h-[calc(100vh-14rem)] items-center text-3xl'>
          <p className='text-slate-500'>No projects found</p>
        </div>
      )}
      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 md:px-4 my-8'>
        {projects.map((project) => (<ProjectCard project={project} key={project.id}/>))}
      </div>
    </Container>
  )
}

export default DashboardPage
