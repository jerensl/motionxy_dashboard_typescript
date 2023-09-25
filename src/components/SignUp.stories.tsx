import type { Meta, StoryObj } from '@storybook/react'
import { SignUp } from './SignUp'

const meta: Meta<typeof SignUp> = {
    title: 'components/SignUp',
    component: SignUp,
}

export default meta
type Story = StoryObj<typeof SignUp>

export const Basic: Story = {
    args: {},
    decorators: [],
}
