import * as React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../utils/firebase'

interface MyFormValues {
    email: string
    password: string
}

export const Login: React.FC<{}> = () => {
    const formik = useFormik<MyFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            ).catch((err) => console.log(err))
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
                        className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <button
                    type="submit"
                    className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
                <div className="block">
                    <p className="text-sm text-center">
                        You don`t have an account?{' '}
                        <Link href="#" passHref>
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
