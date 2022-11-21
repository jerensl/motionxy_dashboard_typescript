import * as React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../utils/firebase'
import clsx from 'clsx'
import { IUser } from '../types/user'
import * as Yup from 'yup'

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
            ).catch((err) => action.setErrors(err.message))
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
                        'border border-primary bg-primary text-white rounded-md px-4 py-2 disabled:bg-slate-500 transition duration-500 ease select-none hover:bg-orange-600 focus:outline-none focus:shadow-outline',
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
                        You don`t have an account?{' '}
                        <Link href="/signup" passHref>
                            <a className="text-sm text-purple-500 font-semibold">
                                Register now
                            </a>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
