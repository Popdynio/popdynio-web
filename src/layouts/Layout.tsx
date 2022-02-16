import * as React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
      <main className="relative">
        <div>
          <div className="h-56 bg-indigo-600" />
          <div className="absolute top-0 left-0 right-0">
            <div className="px-4 py-10 md:p-10">{children}</div>
            <footer>
              <Footer />
            </footer>
          </div>
        </div>
      </main>
    </>
  )
}

export default Layout
