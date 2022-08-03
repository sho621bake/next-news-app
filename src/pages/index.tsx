import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'
import Nav from '../components/nav'
import WeatherNews from '../components/weather-news'
import PickupArticle from '../components/pickup-article'

export default function Home(props) {
    // 記事を取得できているか確認
    // console.log(props.topArticles)
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
                <div className={styles.aside}>
                    <WeatherNews weatherNews={props.weatherNews} />
                    <PickupArticle articles={props.pickupArticles} />
                </div>
            </div>
        </MainLayout>
    )
}

export const getStaticProps = async () => {
    const news_key = process.env.NEXT_NEWS_API_KEY
    // NewsAPIのトップ記事の情報を取得
    const pageSize = 10 // 取得したい記事の数
    const topRes = await fetch(
        `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${news_key}`,
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    const weather_key = process.env.NEXT_WEATHER_API_KEY
    const lat = 35.4122 // 取得したい地域の緯度と経度(今回は東京)
    const lon = 139.413
    const exclude = 'hourly,minutely' // 取得しない情報(1時間ごとの天気情報と1分間ごとの天気情報)
    const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${weather_key}`,
    )
    const weatherJson = await weatherRes.json()
    const weatherNews = weatherJson

    // NewsAPIのピックアップ記事の情報を取得
    const keyword = 'software' // キーワードで検索(ソフトウェア)
    const sortBy = 'popularity' // 表示順位(人気順)
    const pickupPageSize = 5 // ページサイズ(5)
    const pickupRes = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=${news_key}`,
    )
    const pickupJson = await pickupRes.json()
    const pickupArticles = pickupJson?.articles

    return {
        props: {
            topArticles,
            weatherNews,
            pickupArticles,
        },
        revalidate: 60,
    }
}
