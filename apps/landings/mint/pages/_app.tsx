import { AppProps } from 'next/app'
import Head from 'next/head'

import '@apps/landing/styles/global.scss'

function App(props: AppProps) {
    const { Component, pageProps } = props

    return (
        <>
            <Head>
                <title>ZomboDucks</title>
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default App
