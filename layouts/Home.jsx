import React from 'react'
import classNames from 'clsx'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import Sep from '@/components/Sep'
import Reveal from '@/components/Reveal'
import Companies from '@/components/Companies'

const HeroPhoto = ({ main }) => {
  if (!main?.images?.[0]) return null

  return (
    <Reveal animation="fade-in scale-x" className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
      {/* Exquisite layered glowing back-plate */}
      <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-accent via-beta to-alpha opacity-30 blur-2xl transition-opacity duration-500 hover:opacity-60" />
      
      {/* Sleek outer glass border frame */}
      <div className="relative rounded-[2.5rem] p-1.5 bg-gradient-to-b from-white/15 to-white/0 shadow-2xl backdrop-blur-md">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-omega-900">
          <Image
            src={main.images[0].src}
            width={main.images[0].width || 500}
            height={main.images[0].height || 620}
            alt={main.images[0].alt || 'Abu Bokor Siddik'}
            priority
            className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Subtle absolute gradient overlay at bottom for dynamic integration */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-omega-900 via-omega-900/40 to-transparent pointer-events-none" />
        </div>
      </div>
    </Reveal>
  )
}

const HeroAbout = ({ main }) => (
  <Reveal animation="fade-in slide-in-right" className="w-full">
    <div className="prose prose-invert max-w-none prose-headings:m-0 prose-h1:mb-3 prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:text-white sm:prose-h1:text-5xl lg:prose-h1:text-6xl prose-h2:mb-4 prose-h2:bg-gradient-to-r prose-h2:from-accent prose-h2:via-beta prose-h2:to-alpha prose-h2:bg-clip-text prose-h2:text-xl prose-h2:font-bold prose-h2:text-transparent sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h3:mb-6 prose-h3:font-mono prose-h3:text-xs prose-h3:font-semibold prose-h3:uppercase prose-h3:tracking-widest prose-h3:text-omega-400 sm:prose-h3:text-sm prose-p:text-base prose-p:leading-relaxed prose-p:text-omega-300 sm:prose-p:text-lg">
      <ContentRenderer source={main} />
    </div>
  </Reveal>
)

const Achievements = ({ achievements }) => (
  <Reveal animation="fade-in slide-in-bottom" delay={200} className="mt-8 lg:mt-12">
    <div className="grid grid-cols-1 gap-6 rounded-3xl border border-omega-800/80 bg-omega-900/40 p-6 shadow-2xl backdrop-blur-xl sm:grid-cols-3 md:p-8">
      {achievements?.map((item, i) => (
        <div
          key={i}
          className="group relative flex flex-col items-start border-l-2 border-omega-800 pl-5 transition-all duration-300 hover:-translate-y-1 hover:border-alpha"
        >
          <div className="absolute -left-[5px] top-2.5 h-2 w-2 rounded-full bg-omega-700 transition-colors duration-300 group-hover:scale-125 group-hover:bg-accent" />
          <span
            className={classNames(
              'text-3xl font-extrabold tracking-tight transition-colors duration-300 sm:text-4xl',
              i === 0 && 'text-accent group-hover:text-white',
              i === 1 && 'bg-gradient-to-r from-beta to-accent bg-clip-text text-transparent group-hover:from-white group-hover:to-white',
              i >= 2 && 'text-alpha group-hover:text-white'
            )}
          >
            {item.number}
          </span>
          <p className="m-0 mt-2 text-xs font-medium leading-relaxed text-omega-300 transition-colors duration-300 group-hover:text-omega-100 sm:text-sm">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </Reveal>
)

const Layout = ({ main = {}, cta = {}, achievements = [], companies }) => (
  <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 md:py-20 lg:px-8">
    {/* High-fidelity Grain/Noise overlay for premium texture */}
    <div className="bg-noise pointer-events-none absolute inset-0 -z-20 opacity-[0.03]" />

    {/* Dynamic ambient radial background light nodes with drift animation */}
    <div className="animate-blob absolute -top-40 left-10 -z-10 h-96 w-96 rounded-full bg-accent-700/20 blur-[120px] pointer-events-none" />
    <div className="animate-blob animation-delay-2000 absolute top-1/3 right-10 -z-10 h-96 w-96 rounded-full bg-beta-700/15 blur-[120px] pointer-events-none" />
    <div className="animate-blob animation-delay-4000 absolute bottom-10 left-1/4 -z-10 h-96 w-96 rounded-full bg-alpha-700/10 blur-[120px] pointer-events-none" />

    <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-center lg:gap-32">
      <div className="w-full flex-1 text-left lg:order-1 lg:max-w-xl">
        <HeroAbout main={main} />
        <Achievements achievements={achievements} />
        {cta && Object.keys(cta).length > 0 && (
          <div className="mt-10 w-full">
            <ContentRenderer source={cta} />
          </div>
        )}
      </div>
      <div className="animate-float flex w-full justify-center shrink-0 lg:order-2 lg:w-1/3 lg:justify-end">
        <div className="w-full max-w-[380px]">
          <HeroPhoto main={main} />
        </div>
      </div>
    </div>

    {companies && Object.keys(companies).length > 0 && (
      <Reveal animation="fade-in slide-in-bottom" delay={400} className="mt-16 w-full px-4 md:mt-24">
        <Companies {...companies} />
      </Reveal>
    )}
  </div>
)

export default Layout
