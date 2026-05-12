import React from 'react'
import ContentRenderer from '@/components/ContentRenderer'
import Reveal from '@/components/Reveal'
import Icon from '@/components/Icon'

const Layout = ({ main = {}, services = [] }) => (
  <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 md:py-20 lg:px-8">
    {/* Absolute cinematic background ambient glowing nodes */}
    <div className="absolute left-1/4 top-0 -z-10 h-[450px] w-[450px] rounded-full bg-accent-700/15 blur-[140px] pointer-events-none" />
    <div className="absolute bottom-10 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-beta-700/10 blur-[130px] pointer-events-none" />

    {/* Spectacular Top Header Profile Banner */}
    <Reveal animation="fade-in slide-in-top" className="mx-auto max-w-4xl text-center">
      <div className="prose prose-invert max-w-none prose-headings:m-0 prose-h3:text-3xl sm:prose-h3:text-4xl lg:prose-h3:text-5xl prose-h3:font-extrabold prose-h3:tracking-tight prose-h3:text-white prose-h3:last-of-type:mt-2 sm:prose-h3:last-of-type:text-2xl prose-h3:last-of-type:text-xl prose-h3:last-of-type:bg-gradient-to-r prose-h3:last-of-type:from-accent prose-h3:last-of-type:via-beta prose-h3:last-of-type:to-alpha prose-h3:last-of-type:bg-clip-text prose-h3:last-of-type:text-transparent prose-p:mt-6 sm:prose-p:text-lg prose-p:text-base prose-p:leading-relaxed prose-p:text-omega-300 prose-ul:mt-8 sm:prose-ul:grid-cols-2 prose-ul:grid prose-ul:grid-cols-1 prose-ul:gap-3.5 prose-ul:p-0 prose-ul:text-left prose-ul:list-none prose-li:m-0 sm:prose-li:text-base prose-li:flex prose-li:items-center prose-li:text-sm prose-li:text-omega-200 prose-strong:font-semibold prose-strong:text-white [&_ul_li]:before:mr-3 [&_ul_li]:before:inline-block [&_ul_li]:before:h-2 [&_ul_li]:before:w-2 [&_ul_li]:before:rounded-full [&_ul_li]:before:bg-accent">
        <ContentRenderer source={main} />
      </div>
    </Reveal>

    {/* Exquisite Glassmorphic Services Layout Grid */}
    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
      {services?.filter(Boolean).map((item, i) => (
        <Reveal
          animation="fade-in zoom-in"
          delay={(i % 2) * 100}
          key={i}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-omega-800/80 bg-omega-900/40 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-omega-700/80 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
        >
          {/* Subtle upper radiant back-plate border overlay */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-beta to-alpha opacity-70 transition-opacity group-hover:opacity-100" />

          {/* Premium customized card header row */}
          <div className="flex items-center gap-5 border-b border-omega-800/60 bg-omega-900/60 p-6 sm:p-8">
            {item?.icon && (
              <div className="relative shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 p-3.5 shadow-inner border border-white/5">
                <Icon
                  {...item.icon}
                  className="h-full w-full fill-accent transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}
            <h4 className="m-0 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {item?.title}
            </h4>
          </div>

          {/* Crisp body container with automatic left highlight trace indicators on list items */}
          <div className="prose prose-invert max-w-none flex-1 p-6 sm:p-8 prose-p:m-0 sm:prose-p:text-base prose-p:text-sm prose-p:leading-relaxed prose-p:text-omega-300 prose-ul:mt-5 prose-ul:p-0 prose-ul:list-none prose-li:relative sm:prose-li:text-sm prose-li:m-0 prose-li:mt-3 prose-li:pl-5 prose-li:text-xs prose-li:text-omega-300 prose-strong:font-semibold prose-strong:text-white [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-accent">
            <ContentRenderer source={item || {}} />
          </div>
        </Reveal>
      ))}
    </div>
  </div>
)

export default Layout
