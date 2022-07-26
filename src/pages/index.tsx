import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'
import Nav from '../components/nav'

export default function Home(props) {
    // 記事を取得できているか確認
    console.log(props.topArticles)
    return (
        <MainLayout>
            <Head>
                <title>Next News</title>
            </Head>
            <div className={styles.contents}>
                <div className={styles.nav}>
                    <nav>
                        <Nav />
                    </nav>
                </div>
                <div className={styles.blank} />
                <div className={styles.main}>
                    <Article title='Head Lines' articles={props.topArticles} />
                </div>
            </div>
        </MainLayout>
    )
}

export const getStaticProps = async () => {
    const key = process.env.NEXT_NEWS_API_KEY
    // NewsAPIのトップ記事の情報を取得
    const pageSize = 10 // 取得したい記事の数
    const topRes = await fetch(
        `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${key}`,
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    return {
        props: {
            topArticles,
        },
        revalidate: 60 * 10,
    }
}
