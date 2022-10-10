import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/useAuth'
import React from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
