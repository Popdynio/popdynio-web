import { FC } from 'react'
import Head from 'next/head'

const Home: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Popdynio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="#">
            Popdynio!
          </a>
        </h1>
      </main>
    </div>
  )
}
export default Home
