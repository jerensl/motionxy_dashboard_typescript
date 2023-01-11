import * as React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import clsx from 'clsx'
import * as Yup from 'yup'
import SuccessModal from './Modal/Sucess.modal'
import { createNewUser } from '../utils/user'
import { toast } from 'react-toastify'

interface SignUpValues {
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
    const formik = useFormik<SignUpValues>({
        initialValues: {
            email: '',
            fullName: '',
            password: '',
        },
        validationSchema: SignUpValidation,
        onSubmit: async (values, action) => {
            try {
                const resp = await createNewUser(
                    values.fullName,
                    values.email,
                    values.password
                )

                if (resp.status === 201) {
                    setIsOpen(true)
                } else if (resp.status === 500) {
                    throw new Error(resp.statusText)
                }
            } catch (err) {
                toast.error(
                    typeof err === 'string' ? err : 'User cannot be created',
                    {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }
                )
            }
            action.setSubmitting(false)
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
                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    />
                </div>
                <button
                    disabled={!formik.isValidating && formik.isSubmitting}
                    type="submit"
                    className={clsx(
                        'border border-primary bg-primary text-white disabled:bg-slate-500 disabled:border-slate-800 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-orange-600 focus:outline-none focus:shadow-outline',
                        {
                            'bg-slate-500':
                                !formik.isValidating && formik.isSubmitting,
                        }
                    )}
                >
                    {!formik.isValidating && formik.isSubmitting && (
                        <svg
                            role="status"
                            className="inline mr-3 w-4 h-4 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
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
