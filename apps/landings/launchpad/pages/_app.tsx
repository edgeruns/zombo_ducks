import { AppProps } from 'next/app'
import Head from 'next/head'

import './styles.global.scss'

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>GameDuck</title>
            </Head>
            <div className="app">
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default CustomApp
