'use client'
import { BackpackIcon } from '@radix-ui/react-icons'
import { Button, Heading } from '@radix-ui/themes'
import React from 'react'
import { useRouter } from 'next/navigation'

const HeaderDashboard = () => {
  const router = useRouter()

  return (
        <div className="flex justify-between items-center mb-4 md:mx-4">
            <Heading>Projects</Heading>
            <Button onClick={() => { router.push('/dashboard/projects/new') }}>
                <BackpackIcon height='16' width='16' />
                Add Project</Button>
        </div>
  )
}

export default HeaderDashboard
