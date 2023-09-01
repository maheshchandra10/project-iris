import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import LoadingSpinner from '~/componants/loadingspinner'
import { useUserStore } from '~/stores/userStore'
import type { SelectFont } from '~/utils/types'
import { fontSelector } from '~/utils/helpers'
import { useRouter } from 'next/router'
import { FontProvider } from '~/cva/fontProvider'
import SettingsButton from '~/componants/settingsbutton'
import HomeButton from '~/componants/homebutton'

const MINUTE_IN_MILLISECONDS = 60_000

const Paragraph1 = () => {
  return (
    <div className='gap-2 bg-white text-2xl p-12 rounded-lg shadow-md md:h-3/5 h-96 md:w-2/5 w-4/5 items-center md:overflow-y-auto overflow-y-auto'>
      <p>
        <span className='font-bold'>
          The goal of this exercise is for you to find the six even numbers in
          the table.
        </span>
        <br />
        There is no time limit, though your time will be recorded to track your
        progression. so try to go as quickly as you can while remaining
        accurate. This exercise is designed to help you improve your ability to
        focus and your perception. Try to stay relaxed and focused while you are
        doing this exercise. It is up to you how you want to approach this
        exercise. But we reccomend for you to either search the table row by row
        or column by column.
      </p>
    </div>
  )
}

const StartButton: React.FC = () => {
  const [time, setTime] = useState(false)
  const router = useRouter()

  const navigate = () => {
    router.replace('/exercises/evennumbers').catch((err) => console.error(err))
  }

  useEffect(() => {
    setTimeout(() => setTime(true), MINUTE_IN_MILLISECONDS / 2)
  }, [])

  return time ? (
    <button
      className='text-white md:text-5xl text-4xl bg-white/10 flex items-center justify-center rounded-full md:w-40 w-60 p-4 h-16 hover:bg-white/20'
      onClick={() => navigate()}
    >
      Start
    </button>
  ) : (
    <LoadingSpinner />
  )
}

const Page: NextPage = () => {
  const userStore = useUserStore()
  const [font, setFont] = useState<SelectFont>('sans')
  useEffect(() => {
    if (!userStore.user) return
    setFont(fontSelector(userStore.user))
  })

  return (
    <>
      <Head>Even Number Exercise Instructions</Head>
      <SettingsButton />
      <HomeButton />
      <FontProvider font={font}>
        <div className='flex flex-col items-center justify-center min-h-screen py-10 gap-4'>
          <Paragraph1 />
          <StartButton />
        </div>
      </FontProvider>
    </>
  )
}

export default Page
