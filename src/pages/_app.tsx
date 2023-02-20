import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/useAuth'
import React from 'react'
import { NextPage } from 'next'
import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from '../components/ErrorBoundary'
import { createIDBPersister, queryClient } from '../utils/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    const [reactQueryClient] = React.useState(() => queryClient)

    return (
        <ErrorBoundary>
            <AuthProvider>
                <ToastContainer />
                <PersistQueryClientProvider
                    client={reactQueryClient}
                    persistOptions={{ persister: createIDBPersister() }}
                >
                    {getLayout(<Component {...pageProps} />)}
                    {process.env.NODE_ENV ? (
                        <ReactQueryDevtools initialIsOpen={false} />
                    ) : null}
                </PersistQueryClientProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export default MyApp
