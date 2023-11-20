import prisma from '@/libs/prisma'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'user@something.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials: any, req: any) {
        console.log("🚀 ~ file: route.ts:15 ~ authorize ~ req:", req)
        const { email, password } = credentials

        const userFound = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!userFound) throw new Error('Invalid Credentials')

        const validPassword = await bcrypt.compare(password, userFound.password)

        if (!validPassword) throw new Error('Invalid Credentials')

        credentials.role = userFound.role

        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
          role: userFound.role
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      return token
    },
    async session ({ session, user, token }: { session: any, user: any, token: any }) {
      console.log("🚀 ~ file: route.ts:50 ~ session ~ user:", user)
      if (token) {
        session.user.id = token.sub as string
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
