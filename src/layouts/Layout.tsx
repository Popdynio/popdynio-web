import * as React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'

export type LayoutProps = {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>&#9899; Popdynio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="p-10">{children}</div>
      </main>
    </>
  )
}

export default Layout
