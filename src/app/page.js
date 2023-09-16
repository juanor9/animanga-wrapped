import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <a href='https://anilist.co/api/v2/oauth/authorize?client_id=14428&response_type=token'>Login with AniList</a>
    </main>
  )
}
