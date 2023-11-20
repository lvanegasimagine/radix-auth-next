import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export async function DELETE (request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const projectFound = await prisma.project.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!projectFound) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const project = await prisma.project.delete({
      where: {
        id: parseInt(params.id)
      }
    })

    return NextResponse.json(project, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(error, { status: 500 })
  }
}

export async function GET (request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const projectFound = await prisma.project.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!projectFound) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(projectFound, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(error, { status: 500 })
  }
}

export async function PUT (request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await request.json()

    const projectFound = await prisma.project.update({
      where: {
        id: parseInt(params.id)
      },
      data
    })

    return NextResponse.json(projectFound, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(error, { status: 500 })
  }
}
