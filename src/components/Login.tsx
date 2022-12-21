import * as React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../utils/firebase'
import clsx from 'clsx'
import { IUser } from '../types/user'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Emails is invalid')
        .min(3, 'Email name is too short - should be 3 chars minimum.')
        .max(50, 'Email name is too long - should be 50 chars maximum.'),
    password: Yup.string()
        .required('Password is Required')
        .min(6, 'Password is too short - should be 6 chars minimum.')
        .max(25, 'Password  is too long - should be 25 chars maximum.'),
})

export const Login: React.FC = () => {
    const formik = useFormik<IUser>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginValidationSchema,
        onSubmit: async (values, action) => {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            ).catch((e) =>
                toast.error('Email or password is wrong!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            )
        },
    })

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm m-auto mt-32 p-4 sm:p-6 lg:p-8 ">
            <h1 className="text-2xl text-center font-bold pb-3">Login</h1>
            <form
                onSubmit={formik.handleSubmit}
                className="space-y-6 flex flex-col"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-900 block"
                    >
                        Email
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 mt-2 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 block"
                    >
                        Password
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 mt-2 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <button
                    disabled={!formik.isValidating && formik.isSubmitting}
                    type="submit"
                    className={clsx(
                        'border border-primary bg-primary text-white rounded-md px-4 py-2 disabled:bg-slate-500 disabled:border-slate-800 transition duration-500 ease select-none hover:bg-orange-600 focus:outline-none focus:shadow-outline',
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
                        You don`t have an account?{' '}
                        <Link href="/signup" passHref>
                            <a className="text-sm text-purple-500 font-semibold">
                                Register now
                            </a>
                        </Link>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
