'use client'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import React from 'react'
function GlobalContext ({ children }: { children: React.ReactNode }) {
  return <SessionProvider><Toaster position='top-center'/> {children}</SessionProvider>
}

export default GlobalContext
