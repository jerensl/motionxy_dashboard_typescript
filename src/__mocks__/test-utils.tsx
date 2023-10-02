import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AuthProvider } from '../context/useAuth'
import { queryClient } from '../utils/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({ push: jest.fn() }))

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const [reactQueryClient] = React.useState(() => queryClient)

    return (
        <AuthProvider>
            <QueryClientProvider client={reactQueryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
