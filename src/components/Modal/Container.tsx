import { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
    children: ReactNode
}

function Container({ children }: ModalProps) {
    // create div element only once using ref
    const elRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const modalRoot = document.querySelector('#modal') as HTMLElement

        if (!elRef.current) elRef.current = document.createElement('div')
        const el = elRef.current! // non-null assertion because it will never be null
        modalRoot.appendChild(el)
        return () => {
            modalRoot.removeChild(el)
        }
    }, [])

    if (!elRef.current) {
        return <>{children}</>
    }

    return createPortal(children, elRef.current)
}

export default Container
