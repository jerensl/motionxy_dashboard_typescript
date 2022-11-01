import * as React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import clsx from 'clsx'
import * as Yup from 'yup'
import SuccessModal from './Modal/Sucess.modal'
import { createNewUser } from '../utils/user'

interface MyFormValues {
    email: string
    fullName: string
    password: string
}

const SignUpValidation = Yup.object().shape({
    fullName: Yup.string()
        .required('Full Name is Required')
        .min(3, 'Full Name is too short - should be 3 chars minimum.')
        .max(50, 'Full Name is too long - should be 50 chars maximal.'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .max(50, 'Password is too long - should be 50 chars maximal.'),
})

export const SignUp: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const formik = useFormik<MyFormValues>({
        initialValues: {
            email: '',
            fullName: '',
            password: '',
        },
        validationSchema: SignUpValidation,
        onSubmit: async (values, action) => {
            await createNewUser(
                values.fullName,
                values.email,
                values.password
            ).then(() => setIsOpen(true))
        },
    })

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm m-auto mt-10 p-4 sm:p-6 lg:p-8 ">
            <h1 className="text-2xl text-center font-bold pb-3">Sign Up</h1>
            <form
                onSubmit={formik.handleSubmit}
                className="space-y-6 flex flex-col"
            >
                <div>
                    <label
                        htmlFor="fullName"
                        className="text-sm font-medium text-gray-900 block "
                    >
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    {formik.errors.fullName && formik.touched.fullName ? (
                        <span className="text-xs text-red-500">
                            {formik.errors.fullName}
                        </span>
                    ) : null}
                    <input
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-900 block "
                    >
                        Email <span className="text-red-500">*</span>
                    </label>
                    {formik.errors.email && formik.touched.email ? (
                        <span className="text-xs text-red-500">
                            {formik.errors.email}
                        </span>
                    ) : null}
                    <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 block "
                    >
                        Password <span className="text-red-500">*</span>
                    </label>
                    {formik.errors.password && formik.touched.password ? (
                        <span className="text-xs text-red-500">
                            {formik.errors.password}
                        </span>
                    ) : null}
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <button
                    disabled={!formik.isValidating && formik.isSubmitting}
                    type="submit"
                    className={clsx(
                        'border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline',
                        {
                            'bg-slate-500':
                                !formik.isValidating && formik.isSubmitting,
                        }
                    )}
                >
                    Submit
                </button>
                <div className="block">
                    <p className="text-sm text-center">
                        Already have an account?{' '}
                        <Link href="/login" passHref>
                            <a className="text-sm text-purple-500 font-semibold">
                                Login now
                            </a>
                        </Link>
                    </p>
                </div>
            </form>
            <SuccessModal isOpen={isOpen} handleClose={handleClose} />
        </div>
    )
}
