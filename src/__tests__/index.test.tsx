import { render, screen } from '../__mocks__/test-utils'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /Dashboard/i,
        })

        expect(heading).toBeInTheDocument()
    })
})
