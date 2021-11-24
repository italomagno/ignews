
import { GetStaticProps } from 'next'
import  Head  from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

/*========3 FORMAS DE FAZER UMA CHAMADA API =========*/
// Client-side ------ UseEffect()
// Server-side ------ GetServerProps
// Static-side ------ GetStaticProps


interface HomeProps{
  product: {
    priceId: string,
    amount: Number
  }
}

export default function Home( { product } : HomeProps) {
  //console.log(product)

  return (  
    <>
    <Head>
      <title>Home | Ignews</title>
    </Head>

    <main className = {styles.contentContainer}>
      <section className = {styles.hero}>

        <span> 👏 Hey, welcome</span>

        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br />
          <span>for {product.amount} month</span>
        </p>

        <SubscribeButton priceId = {product.priceId}/>

      </section>

      <img src="/images/avatar.svg" alt="girl coding" />
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JyRgBGWz18WwxxgqGybsANS', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),

  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 , // 24 hours

  }

}
