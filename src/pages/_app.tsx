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

export const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    const [reactQueryClient] = React.useState(() => queryClient)

    return (
        <ErrorBoundary>
            <AuthProvider>
                <QueryClientProvider client={reactQueryClient}>
                    {getLayout(<Component {...pageProps} />)}
                </QueryClientProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export default MyApp
