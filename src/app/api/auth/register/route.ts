import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST (request: Request) {
  try {
    const data = await request.json()

    const userFound = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (userFound) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)

    data.password = await bcrypt.hash(data.password, salt)

    const newUser = await prisma.user.create({ data })

    const { password, ...user } = newUser
    console.log("🚀 ~ file: route.ts:26 ~ POST ~ password:", password)

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
