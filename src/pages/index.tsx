import Head from 'next/head'
import Layout from '../components/Layout'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#90cdf4" />
            </Head>
            <div className="grid grid-cols-12 gap-4 ml-80 mt-10 max-w-4xl">
                <h1 className="col-span-full text-3xl font-semibold">
                    Dashboard
                </h1>
                <div className="col-span-4 max-w-xs p-6 text-center bg-white border border-gray-200 rounded-lg shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 m-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                        />
                    </svg>

                    <h2 className="mb-2 text-5xl font-semibold tracking-tight text-gray-900">
                        0
                    </h2>
                    <p className="mb-3 font-normal text-lg text-gray-500">
                        Total devices
                    </p>
                </div>
                <div className="col-span-4 max-w-xs p-6 text-center bg-white border border-gray-200 rounded-lg shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 m-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                        />
                    </svg>

                    <h2 className="mb-2 text-5xl font-semibold tracking-tight text-gray-900">
                        0
                    </h2>
                    <p className="mb-3 font-normal text-lg text-gray-500">
                        Total Sensors
                    </p>
                </div>
            </div>
        </>
    )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default Home
