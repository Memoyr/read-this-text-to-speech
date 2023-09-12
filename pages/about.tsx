import React, { useContext } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { StatusProvider, StatusContext } from '@/components/authStatus.provider'
import Header from '@/components/header'

const AboutContent = () => {
  const { status, data } = useContext(StatusContext)

  return (
    <div className={styles.container}>
      <Head>
        <title>Read me this!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>About this app!</h1>
        <p>This app was created with the purpose of...</p>
      </main>
    </div>
  )
}

const About = () => {
  return (
    <StatusProvider>
      <AboutContent />
    </StatusProvider>
  )
}

export default About
