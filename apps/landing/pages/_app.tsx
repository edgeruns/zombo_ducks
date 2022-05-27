import { AppProps } from 'next/app'
import Head from 'next/head'

import '@apps/landing/styles/global.scss'

function App(props: AppProps) {
    const { Component, pageProps } = props

    return (
        <>
            <Head>
                <meta property="og:url" content="https://zombo-ducks.xyz" />
                <meta property="og:title" content="ZomboDucks" />
                <meta property="og:description" content="Meet ZomboDucks: First P2E gameplace platform on NEAR protocol" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://zombo-ducks.xyz/og.png" />

                <meta name="description" content="Meet ZomboDucks: First P2E gameplace platform on NEAR protocol" />

                <link rel="canonical" href="https://zombo-ducks.xyz" />

                <title>ZomboDucks</title>
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default App
