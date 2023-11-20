import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/libs/prisma'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST (request: Request) {
  try {
    const data = await request.json()

    const session = await getServerSession(authOptions)

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        userId: parseInt(session.user.id)
      }
    })
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
