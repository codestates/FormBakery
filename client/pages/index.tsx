import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/layout/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Form Bakery</title>
        <meta name="keyword" content="Form Bakery, free Form" />
        <meta name="description" content="first codestate team project" />
        <meta name="author" content="codeBaker" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <main className='mt-2'>
        <div className='bg-main text-center text-white py-8 space-y-10 shadow-md'>
          <div className='space-y-6 text-2xl'>
            <p>Form Bakery helps to simplify and distribute the survey form you want</p>
            <p>Create your own survey and share url with</p>
            <p>participants to collect and analyze information!</p>
          </div>
          <button className='bg-sky-500 rounded-md px-3 py-3 text-sm'>CREATE NEW FORM</button>
        </div>
        <div className='text-center space-y-6'>
          <h1 className='font-bold text-xl mt-5'>Form Recommandation</h1>
          <div>
            <Image src="/formRecommandaiton.png" alt="formBakery Logo" width={1300} height={200} />
          </div>
        </div>
      </main>
      <footer className={`mt-5 ${styles.footer}`}>
        <p className='tracking-wide text-sm'><strong className='mr-3'>Made by</strong><Image src="/codestate.png" alt="codestate-logo" width={20} height={10} /> codeBaker</p>
      </footer>
    </>
  )
}
