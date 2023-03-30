import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '../lib/firebase/firebase'
import React from 'react'

initializeFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
