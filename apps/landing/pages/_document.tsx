import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const domainHost = process.env.DOMAIN_HOST

const ogURl = domainHost
const ogImageURl = `${domainHost}/og.png`

class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta property="og:url" content={ogURl} />
                    <meta property="og:title" content="ZomboDucks" />
                    <meta property="og:description" content="Meet ZomboDucks: First P2E gameplace platform on NEAR protocol" />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content={ogImageURl} />

                    <meta name="description" content="Meet ZomboDucks: First P2E gameplace platform on NEAR protocol" />

                    <link rel="canonical" href={ogURl} />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap" rel="stylesheet" />

                    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument
