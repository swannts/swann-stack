import React from 'react'
import classNames from 'clsx'
import ContentRenderer from '@/components/ContentRenderer'
import Typewriter from '@/components/Typewriter'
import Reveal from '@/components/Reveal'
import Icon from '@/components/Icon'

const History = ({ title, list }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-4">
      <h3 className="m-0 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h3>
      <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-omega-800 to-transparent" />
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 lg:gap-10">
      {list?.map((item, i) => (
        <div
          key={`item-${i}`}
          className="group relative flex flex-col rounded-2xl border border-omega-800/60 bg-omega-900/50 p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-omega-700/80 hover:shadow-2xl"
        >
          {/* Subtle left glowing border trace */}
          <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl bg-gradient-to-b from-accent via-beta to-alpha opacity-50 transition-opacity group-hover:opacity-100" />

          <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between">
            <h5 className="m-0 text-lg font-bold text-white sm:text-xl">{item.name}</h5>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-accent shrink-0 md:ml-4">
              {item.date}
            </span>
          </div>
          {item.description && (
            <p className="mt-3.5 mb-0 text-sm sm:text-base leading-relaxed text-omega-300">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
)

const Skill = ({ title, icon, level }) => (
  <div className="flex items-center rounded-xl bg-omega-900/40 p-3 sm:p-3.5 border border-omega-800/40 transition-colors hover:border-omega-700/60">
    {icon && (
      <div className="mr-3 flex shrink-0 items-center justify-center h-8 w-8 rounded-lg bg-white/5 p-1.5 border border-white/5">
        <Icon {...icon} className="h-full w-full fill-accent" />
      </div>
    )}
    <span className="text-xs sm:text-sm font-bold text-omega-200 tracking-tight truncate">
      {title}
    </span>
    <div className="ml-auto flex items-center space-x-1 sm:space-x-1.5 shrink-0 pl-2">
      {Array(5)
        .fill(null)
        .map((_, k) => (
          <span
            key={`${title}${k}-f`}
            className={classNames(
              'inline-block rounded-full transition-all duration-300',
              k + 1 <= level
                ? 'h-2 w-2 sm:h-2.5 sm:w-2.5 bg-gradient-to-tr from-accent-700 via-accent to-alpha shadow-[0_0_8px_rgba(255,255,255,0.2)]'
                : 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-omega-800'
            )}
          />
        ))}
    </div>
  </div>
)

const SkillSet = ({ title, list }) => (
  <div className="group relative flex flex-col justify-between rounded-3xl border border-omega-800/80 bg-omega-900/40 p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-omega-700/80 hover:shadow-2xl">
    {/* Subtle top edge overlay trace */}
    <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-accent via-beta to-alpha opacity-40 transition-opacity group-hover:opacity-80" />

    <div className="flex items-center gap-3 mb-6">
      <div className="h-4 w-1 rounded-full bg-accent shrink-0" />
      <h4 className="m-0 text-base sm:text-lg font-bold text-white tracking-tight">
        {title}
      </h4>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
      {list?.map((props, j) => (
        <Skill key={j} {...props} />
      ))}
    </div>
  </div>
)

const Layout = ({ personal_info = {}, content, biography, cta = {}, skills_header, skills, history }) => {
  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* Absolute cinematic background glowing nodes */}
      <div className="absolute left-10 top-20 -z-10 h-[450px] w-[450px] rounded-full bg-accent-700/15 blur-[140px] pointer-events-none" />
      <div className="absolute right-10 top-2/3 -z-10 h-[450px] w-[450px] rounded-full bg-beta-700/10 blur-[140px] pointer-events-none" />

      {/* Spectacular Top Header Profile Title */}
      <Reveal animation="fade-in slide-in-top" className="text-center mx-auto max-w-4xl">
        <h1 className="m-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-omega-100 to-omega-300 bg-clip-text text-transparent">
          {personal_info.name || 'Abu Bokor Siddik'}
        </h1>
        <p className="mt-4 mb-0 text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-accent via-beta to-alpha bg-clip-text text-transparent tracking-wide">
          Senior Full Stack Architect & AI Engineer
        </p>
        {cta && Object.keys(cta).length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ContentRenderer source={cta} />
          </div>
        )}
      </Reveal>

      {/* Main Extensively Documented Biography Content Container */}
      {biography && (
        <Reveal animation="fade-in slide-in-bottom" className="mt-12 sm:mt-16">
          <div className="group relative mx-auto max-w-5xl rounded-3xl border border-omega-800/80 bg-omega-900/40 p-8 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-omega-700/80">
            {/* Upper brilliant accent strip line */}
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-accent via-beta to-alpha opacity-80" />

            <div className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-h5:text-lg sm:prose-h5:text-xl prose-h5:mt-8 prose-h5:mb-3 prose-h5:flex prose-h5:items-center prose-h5:gap-2.5 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-p:text-omega-300 prose-ul:mt-2 prose-ul:mb-6 prose-ul:list-none prose-ul:p-0 prose-li:relative prose-li:m-0 prose-li:mt-2 prose-li:pl-5 prose-li:text-xs sm:prose-li:text-sm prose-li:text-omega-300 prose-strong:text-white prose-strong:font-semibold [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:top-2 [&_ul_li]:before:h-1.5 [&_ul_li]:before:w-1.5 [&_ul_li]:before:rounded-full [&_ul_li]:before:bg-accent [&_h5_span]:text-accent [&_h5_span]:font-extrabold [&_h5_span]:text-sm sm:[&_h5_span]:text-base [&_h5_span]:px-2 [&_h5_span]:py-0.5 [&_h5_span]:rounded-md [&_h5_span]:bg-white/5">
              <ContentRenderer source={biography} />
            </div>
          </div>
        </Reveal>
      )}

      {/* Structured Technical Skills Heading Banner */}
      {skills_header && (
        <div className="mt-20 sm:mt-28 text-center mx-auto max-w-4xl">
          <h2 className="m-0 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {skills_header.title}
          </h2>
          {skills_header.list && (
            <div className="mt-3 text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
              <Typewriter lines={skills_header.list} lineClassName="bg-gradient-to-r from-accent via-beta to-alpha bg-clip-text text-transparent" />
            </div>
          )}
        </div>
      )}

      {/* Comprehensive Categorized Skills Matrix */}
      {skills && (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {skills.map((props, i) => (
            <Reveal key={i} animation="fade-in zoom-in" delay={(i % 2) * 80}>
              <SkillSet {...props} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Professional Experience and Auxiliary Highlights Columns Stacked Cleanly */}
      {history && (
        <div className="mt-20 sm:mt-28 flex flex-col gap-12 sm:gap-16">
          {history.map((props, i) => (
            <Reveal key={i} animation="fade-in slide-in-bottom" delay={i * 100}>
              <div className="rounded-3xl border border-omega-800/80 bg-omega-900/40 p-8 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-omega-700/80">
                {/* Radiant top plate trim border */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-beta to-alpha opacity-60" />
                <History {...props} />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

export default Layout
