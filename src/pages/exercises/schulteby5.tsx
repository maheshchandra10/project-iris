import HomeButton from '~/componants/homebutton'
import SchulteTable from '~/componants/schultetable'
import Head from 'next/head'
import SettingsButton from '~/componants/settingsbutton'

export default function Page(){
  return (
    <>
      <Head>
        <title>Speed Read</title>
      </Head>
      <body className='grid min-h-screen'>
        <HomeButton />
        <SettingsButton />
        <div className='flex flex-col items-center justify-center'>
          <SchulteTable sideLength={5} />
        </div>
      </body>
    </>
  )
}
