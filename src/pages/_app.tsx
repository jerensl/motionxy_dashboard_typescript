import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/useAuth'
import React from 'react'
import { NextPage } from 'next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from '../components/ErrorBoundary'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <ErrorBoundary>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    {getLayout(<Component {...pageProps} />)}
                </QueryClientProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export default MyApp
