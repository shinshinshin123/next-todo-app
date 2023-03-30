import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '../lib/firebase/firebase'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

initializeFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
