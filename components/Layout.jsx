import React from 'react'
import classNames from 'clsx'
import Menu from '@/components/Menu'
import ChatWidget from '@/components/ChatWidget'
import fonts from '@/styles/fonts'

const Layout = (props) => {
  const { children } = props

  return (
    <div
      className={classNames(
        'dark relative flex min-h-screen w-full justify-center bg-black font-sans lg:px-4 xl:px-8',
        'amber',
        ...fonts
      )}
    >
      <div className="fixed bottom-0 left-0 z-50 hidden w-full bg-black md:block lg:h-4 xl:h-8"></div>
      <div className="fixed left-0 top-0 z-50 hidden w-full bg-black md:block lg:h-4 xl:h-8"></div>
      <div className="relative w-full max-w-screen-xl">
        <main className="relative h-full bg-gradient-to-tr from-omega-900 via-omega-900 to-omega-800">
          <div className="flex h-full w-full flex-col content-center items-center pb-20 lg:py-4 xl:py-8">
            {children}
          </div>
        </main>
      </div>
      <Menu />
      <ChatWidget />
    </div>
  )
}

export default Layout
