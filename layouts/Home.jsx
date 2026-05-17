import React from 'react'
import classNames from 'clsx'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import Sep from '@/components/Sep'
import Reveal from '@/components/Reveal'
import ChatSection from '@/components/ChatSection'
import Button from '@/components/Button'
import Link from 'next/link'
import abuProfile from '../data/abu-profile'

import { 
  IoHardwareChipOutline, 
  IoLayersOutline, 
  IoGitBranchOutline, 
  IoTerminalOutline, 
  IoMailOutline, 
  IoCallOutline, 
  IoLogoLinkedin, 
  IoLogoGithub,
  IoSparklesSharp,
  IoArrowForwardSharp,
  IoCheckmarkCircle
} from 'react-icons/io5'

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
    <div className="prose prose-invert max-w-none prose-headings:m-0 prose-h1:mb-3 prose-h1:text-3xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:text-white sm:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h2:mb-4 prose-h2:bg-gradient-to-r prose-h2:from-accent prose-h2:via-beta prose-h2:to-alpha prose-h2:bg-clip-text prose-h2:text-xl prose-h2:font-bold prose-h2:text-transparent sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h3:mb-6 prose-h3:font-mono prose-h3:text-xs prose-h3:font-semibold prose-h3:uppercase prose-h3:tracking-widest prose-h3:text-omega-400 sm:prose-h3:text-sm prose-p:text-base prose-p:leading-relaxed prose-p:text-omega-300 sm:prose-p:text-lg">
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

const HomeLayout = ({ main = {}, cta = {}, achievements = [], blogs, projectsList }) => {
  const blogPosts = blogs?.collection?.records || []
  const projects = projectsList?.collection?.records || []

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* High-fidelity Grain/Noise overlay for premium texture */}
      <div className="bg-noise pointer-events-none absolute inset-0 -z-20 opacity-[0.03]" />

      {/* Dynamic ambient radial background light nodes with drift animation */}
      <div className="animate-blob absolute -top-40 left-10 -z-10 h-96 w-96 rounded-full bg-accent-700/20 blur-[120px] pointer-events-none" />
      <div className="animate-blob animation-delay-2000 absolute top-1/3 right-10 -z-10 h-96 w-96 rounded-full bg-beta-700/15 blur-[120px] pointer-events-none" />
      <div className="animate-blob animation-delay-4000 absolute bottom-10 left-1/4 -z-10 h-96 w-96 rounded-full bg-alpha-700/10 blur-[120px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-center lg:gap-24">
        <div className="w-full flex-1 text-left lg:max-w-2xl">
          <HeroAbout main={main} />
          <Achievements achievements={achievements} />
          {cta && Object.keys(cta).length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4">
              <ContentRenderer source={cta} />
            </div>
          )}
        </div>
        <div className="animate-float flex w-full justify-center shrink-0 lg:w-1/3 lg:justify-end">
          <div className="w-full max-w-[380px]">
            <HeroPhoto main={main} />
          </div>
        </div>
      </div>

      <Sep size={20} />

      {/* 2. ABOUT PROFILE SECTION */}
      <section className="relative py-12">
        <Reveal animation="fade-in slide-in-bottom">
          <div className="rounded-3xl border border-omega-800/80 bg-omega-900/40 p-8 shadow-2xl backdrop-blur-xl md:p-12 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-beta to-alpha opacity-60" />
            <div className="grid gap-12 md:grid-cols-12 items-center">
              <div className="md:col-span-8">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">About Abu Bokor Siddik</span>
                <h2 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Recruiter-Ready Senior Engineering Partner
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-omega-300">
                  {abuProfile.summary}
                </p>
                <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm text-omega-300">
                  <div className="flex items-center gap-2">
                    <IoCheckmarkCircle className="text-accent" size={18} />
                    <span>ICE Engineering Degree (BAUET)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkCircle className="text-beta" size={18} />
                    <span>5+ Years Production SaaS Background</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkCircle className="text-alpha" size={18} />
                    <span>Expertise in Complex API & System Integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCheckmarkCircle className="text-accent" size={18} />
                    <span>Robust CI/CD & Production DevOps Mindset</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-4 border-l border-omega-800/80 pl-0 md:pl-8">
                <div>
                  <span className="text-xs font-mono text-omega-500 uppercase">Current Availability</span>
                  <p className="text-sm font-semibold text-white mt-1">{abuProfile.availability}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-omega-500 uppercase">Primary Work Location</span>
                  <p className="text-sm font-semibold text-white mt-1">Remote / Global SaaS Channels</p>
                </div>
                <div className="pt-4">
                  <Button href="#contact" variant="primary" size="md">
                    Discuss Hiring Options
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Sep size={12} />

      {/* 3. AI & SYSTEM ARCHITECTURE HIGHLIGHT MATRICES */}
      <section className="py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* AI Engineering Card */}
          <Reveal animation="fade-in slide-in-left">
            <div className="group relative rounded-3xl border border-omega-800/80 bg-omega-900/40 p-8 shadow-2xl backdrop-blur-xl hover:border-accent/40 transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-beta opacity-60" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent to-beta text-white shadow-lg">
                <IoHardwareChipOutline size={24} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
                AI Engineering Specialization
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-omega-300">
                Building resilient agentic capabilities that move beyond raw prompt templates into production-ready system layers.
              </p>
              <ul className="mt-6 space-y-3 text-xs text-omega-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>**Advanced RAG Execution**: Semantic search routers & chunk rerankers.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>**Autonomous Agents**: Multi-agent workflows, tool routing & schemas.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>**Model Context Protocols (MCP)**: Custom toolservers for live datasets.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>**Vector Database Architectures**: pgvector, Pinecone lookup caches.</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Systems Design & Cloud Card */}
          <Reveal animation="fade-in slide-in-right">
            <div className="group relative rounded-3xl border border-omega-800/80 bg-omega-900/40 p-8 shadow-2xl backdrop-blur-xl hover:border-alpha/40 transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-beta to-alpha opacity-60" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-beta to-alpha text-white shadow-lg">
                <IoLayersOutline size={24} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
                Systems Architecture & Cloud
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-omega-300">
                Constructing fault-tolerant, horizontally scalable systems designed for peak concurrency and data protection.
              </p>
              <ul className="mt-6 space-y-3 text-xs text-omega-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-alpha" />
                  <span>**Microservices Orchestration**: AWS EKS Kubernetes topologies.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-alpha" />
                  <span>**High-Throughput Messaging**: Apache Kafka and RabbitMQ pipelines.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-alpha" />
                  <span>**Caching Topologies**: Persistent Redis state & write-through buffers.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-alpha" />
                  <span>**GitOps Deployment Operations**: Declarative IaC via Terraform & ArgoCD.</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Sep size={12} />

      {/* 4. TECHNICAL SKILLS MATRIX */}
      <section className="py-12">
        <Reveal animation="fade-in slide-in-bottom" className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">Skill Inventory</span>
          <h2 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Abu's Engineering Stack
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-omega-300">
            A comprehensive, rigorous stack curated from five years of professional, client-verified product delivery.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(abuProfile.skills).map(([category, list], idx) => {
            const friendlyName = category
              .replace('_', ' & ')
              .split(' ')
              .map(w => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
            
            return (
              <Reveal key={category} animation="fade-in zoom-in" delay={idx * 60}>
                <div className="relative rounded-2xl border border-omega-800 bg-omega-900/30 p-6 transition-all duration-300 hover:bg-omega-900/60 hover:border-omega-700">
                  <h4 className="text-sm font-semibold tracking-widest text-white uppercase mb-4 flex items-center gap-2">
                    <span className="h-3 w-1 rounded bg-accent" />
                    {friendlyName}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {list.map(skill => (
                      <span 
                        key={skill} 
                        className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-omega-200 hover:text-white hover:bg-white/10 hover:border-alpha/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Sep size={12} />

      {/* 5. PROJECTS SECTION (CASE STUDIES) */}
      <section id="projects" className="py-12">
        <Reveal animation="fade-in slide-in-bottom" className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">Case Studies</span>
          <h2 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Enterprise Product Deliveries
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-omega-300">
            Explore detailed architectural case studies demonstrating actual challenges met, microservice decisions, and client metrics.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((proj, idx) => {
            const caseUrl = '/projects/' + proj.slug.join('/')
            return (
              <Reveal key={proj.title} animation="fade-in slide-in-bottom" delay={idx * 100}>
                <div className="group relative flex flex-col justify-between rounded-3xl border border-omega-800/80 bg-omega-900/40 p-8 shadow-2xl backdrop-blur-xl hover:border-omega-700 transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
                        {proj.tags?.[0]?.title || proj.tags?.[0] || 'SaaS'}
                      </span>
                      <span className="text-xs text-omega-400 font-medium">
                        {proj.date || '2025'}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">
                      {proj.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-omega-300">
                      {proj.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {proj.tags?.slice(0, 4).map(t => {
                        const tagLabel = typeof t === 'object' ? t.title : t
                        return (
                          <span key={tagLabel} className="rounded-full bg-omega-800 px-2.5 py-0.5 text-[10px] font-semibold text-omega-200 tracking-wider">
                            {tagLabel}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-omega-800/80 flex items-center justify-between">
                    <Link href={caseUrl} className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-accent uppercase tracking-widest transition-colors">
                      View Case Study <IoArrowForwardSharp size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Sep size={12} />

      {/* 6. SYSTEM DESIGN ARTICLES SECTION */}
      <section className="py-12">
        <Reveal animation="fade-in slide-in-bottom" className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">Technical Notes</span>
          <h2 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            System Design & AI Engineering Notes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-omega-300">
            Deep-dives into cloud architectures, vector pipelines, authentication standards, and high-performance databases.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, idx) => {
            const postUrl = '/blog/' + post.slug.join('/')
            return (
              <Reveal key={post.title} animation="fade-in zoom-in" delay={idx * 80}>
                <div className="group relative flex flex-col justify-between rounded-2xl border border-omega-800 bg-omega-900/30 p-6 hover:bg-omega-900/60 hover:border-omega-700 transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between text-xs text-omega-400">
                      <span className="font-semibold text-beta uppercase tracking-wider">
                        {post.category || 'Engineering'}
                      </span>
                      <span>
                        {post.readingTime || '8 min read'}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-omega-300">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-omega-800/80">
                    <Link href={postUrl} className="inline-flex items-center gap-1.5 text-xs font-bold text-omega-200 hover:text-white uppercase tracking-widest transition-colors">
                      Read Note <IoArrowForwardSharp size={12} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Sep size={12} />

      {/* 7. EXPERIENCE TIMELINE SECTION */}
      <section className="py-12">
        <Reveal animation="fade-in slide-in-bottom" className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">Career History</span>
          <h2 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Abu's Experience Timeline
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-omega-300">
            Proven tracking history driving development speeds and deploying robust infrastructures at several tech teams.
          </p>
        </Reveal>

        <div className="mt-16 relative border-l-2 border-omega-800 max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12">
          {abuProfile.experience.map((exp, idx) => (
            <Reveal key={exp.company} animation="fade-in slide-in-left" delay={idx * 100} className="relative group">
              {/* Timeline Bullet Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-omega-900 bg-omega-800 group-hover:border-accent group-hover:bg-white transition-colors duration-300" />
              
              <div className="rounded-2xl border border-omega-800/80 bg-omega-900/20 p-6 sm:p-8 hover:bg-omega-900/40 hover:border-omega-700/80 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-omega-300">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/5 text-omega-200 tracking-wider shrink-0 w-fit">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-2 text-xs leading-relaxed text-omega-300">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-beta shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Sep size={12} />

      {/* 8. ASK ABU AI CHATBOT SECTION */}
      <ChatSection />

      <Sep size={12} />

      {/* 9. CONTACT SECTION */}
      <section id="contact" className="py-12">
        <Reveal animation="fade-in slide-in-bottom">
          <div className="rounded-3xl border border-omega-800/80 bg-gradient-to-br from-omega-900/60 to-omega-900/30 p-8 shadow-2xl backdrop-blur-xl md:p-12 relative overflow-hidden text-center">
            {/* Top Border Accent Strip */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-beta to-alpha opacity-60" />
            
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">Initiate Contact</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Partner With Abu Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-omega-300">
              Whether you need to scale database aggregates, design agentic loops, deploy Kubernetes pods, or fill a senior engineering seat, Abu Bokor Siddik is open for collaborations.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 max-w-2xl mx-auto">
              <a 
                href={`mailto:${abuProfile.contact.email}`}
                className="flex items-center gap-3 rounded-2xl border border-omega-800 bg-omega-900/40 p-4 w-full sm:w-1/2 hover:border-accent/40 hover:bg-omega-800 transition-all text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <IoMailOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-omega-500 uppercase">Write Email</span>
                  <p className="text-xs font-bold text-white mt-0.5 truncate">{abuProfile.contact.email}</p>
                </div>
              </a>

              <a 
                href={`tel:${abuProfile.contact.phone}`}
                className="flex items-center gap-3 rounded-2xl border border-omega-800 bg-omega-900/40 p-4 w-full sm:w-1/2 hover:border-beta/40 hover:bg-omega-800 transition-all text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-beta/15 text-beta">
                  <IoCallOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-omega-500 uppercase">Direct Line</span>
                  <p className="text-xs font-bold text-white mt-0.5">{abuProfile.contact.phone}</p>
                </div>
              </a>
            </div>

            <div className="mt-8 flex justify-center gap-4 text-omega-300">
              <a 
                href={abuProfile.contact.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-omega-800 hover:bg-white hover:text-omega-900 transition-colors"
                title="LinkedIn Profile"
              >
                <IoLogoLinkedin size={20} />
              </a>
              <a 
                href={abuProfile.contact.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-omega-800 hover:bg-white hover:text-omega-900 transition-colors"
                title="GitHub Profile"
              >
                <IoLogoGithub size={20} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default HomeLayout
