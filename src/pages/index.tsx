import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'

export default function Home(props) {
    // 記事を取得できているか確認
    console.log(props.topArticles)
    return (
        <MainLayout>
            <Head>
                <title>Simple News</title>
            </Head>
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
