import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import '../assets/styles/styles.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>えんとつ町のプペルの紹介記事をマルコフ連鎖で書いて19円貰う</title>
        <meta
          name="description"
          content="えんとつ町のプペルの紹介記事をマルコフ連鎖で書いて19円貰おう！"
        ></meta>
        <meta name="viewport" content="width=device-width,height=device-height" key="viewport" />
        <meta name="theme-color" content="#087da1" key="themeColor" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main id="root">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App
