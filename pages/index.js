import Head from 'next/head'
import Layout from '../components/layout/Layout'

export default function Home() {
  console.log(process.env)
  return (
   <Layout>
     <Head>
       <title>Newoo Snacks</title>
     </Head>
     Hello
   </Layout>
  )
}
