import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
// import * as FramerMotion from 'framer-motion'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // const {  motion, useI}

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
