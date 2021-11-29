import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import {RichText} from 'prismic-dom'


type Post = {
  slug: string;
  tittle: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps{
  posts: Post[]
}


export default function Posts({posts}: PostsProps){
  return(
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          {posts.map(post => (

<a href="#" key={post.slug}>
<time>{post.updatedAt}</time>
<strong>{post.tittle}</strong>
<p>{post.excerpt}</p>

</a>
          ))}
          
        </div>
      </main>

    </>
  )

}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'publication')
    ], {
   fetch: ['publication.title' , 'publication.content'],
   pageSize: 100,

  
})
const posts = response.results.map(post => {
  return {
    slug: post.uid,
    tittle: RichText.asText(post.data.title),
    excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
})
    

    return{
      props: {posts}
    }
}