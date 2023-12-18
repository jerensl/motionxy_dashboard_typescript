import type { Meta, StoryObj } from '@storybook/react'
import { CustomError } from './CustomError'

const meta: Meta<typeof CustomError> = {
    title: 'components/CustomError',
    component: CustomError,
}

export default meta
type Story = StoryObj<typeof CustomError>

export const Basic: Story = {
    args: {},
    decorators: [],
}
