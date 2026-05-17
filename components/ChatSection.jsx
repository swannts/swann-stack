import React, { useState, useEffect, useRef } from 'react'
import classNames from 'clsx'
import { IoSend, IoChatbubblesSharp, IoPersonCircleOutline, IoSparklesSharp } from 'react-icons/io5'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LoadingDots from './LoadingDots'
import Reveal from './Reveal'

const SUGGESTED_QUESTIONS = [
  "What are Abu's strongest skills?",
  "Tell me about Abu's AI experience.",
  "Is Abu suitable for remote SaaS roles?",
  "How can I contact Abu?"
]

const ChatSection = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      const data = await response.json()
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      }
    } catch (error) {
      console.error('Chat Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl">
          <Reveal animation="fade-in slide-in-bottom">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Left Side: Info */}
              <div className="lg:col-span-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-alpha to-beta text-white shadow-xl shadow-alpha/20">
                  <IoSparklesSharp size={24} />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
                  Ask Abu <span className="text-alpha">Anything</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-omega-300">
                  Curious about my technical background? My AI assistant is grounded in my CV, projects, and engineering notes.
                </p>
                <div className="mt-8 space-y-4">
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-omega-800 bg-omega-900/40 p-4 transition-all hover:border-alpha/50 hover:bg-omega-800"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-omega-800 group-hover:bg-alpha group-hover:text-white transition-colors">
                        <IoChatbubblesSharp size={14} />
                      </div>
                      <span className="text-sm font-medium text-omega-300 group-hover:text-white">{q}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Chat Interface */}
              <div className="lg:col-span-8">
                <div className="flex h-[550px] flex-col rounded-3xl border border-omega-800 bg-omega-900/40 shadow-2xl backdrop-blur-sm overflow-hidden">
                  {/* Chat Content */}
                  <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-alpha/50 scrollbar-track-omega-800/50"
                  >
                    {messages.length === 0 && (
                      <div className="flex h-full flex-col items-center justify-center text-center opacity-50">
                        <IoChatbubblesSharp size={48} className="text-omega-500 mb-4" />
                        <p className="text-omega-300">Start a conversation with Swann's portfolio assistant</p>
                      </div>
                    )}
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={classNames(
                          'flex items-start gap-4',
                          m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        )}
                      >
                        <div className={classNames(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-lg',
                          m.role === 'user' ? 'bg-alpha' : 'bg-gradient-to-tr from-omega-700 to-omega-800'
                        )}>
                          {m.role === 'user' ? <IoPersonCircleOutline size={24} /> : <span className="text-[10px] font-bold">AI</span>}
                        </div>
                        <div
                          className={classNames(
                            'max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm',
                            m.role === 'user' 
                              ? 'bg-alpha text-white' 
                              : 'bg-omega-800 text-omega-100 border border-omega-700/50 prose prose-invert prose-p:my-0 prose-p:leading-relaxed prose-ul:my-2 prose-li:my-0 prose-sm max-w-none'
                          )}
                        >
                          {m.role === 'user' ? (
                            m.content
                          ) : (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {m.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-omega-800 text-white shadow-lg">
                          <span className="text-[10px] font-bold">AI</span>
                        </div>
                        <div className="rounded-2xl bg-omega-800 px-5 py-4 border border-omega-700/50">
                          <LoadingDots />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <form onSubmit={handleSend} className="border-t border-omega-800 bg-omega-900/60 p-6">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="w-full rounded-2xl border-2 border-omega-800 bg-omega-900 px-6 py-4 pr-16 text-white placeholder-omega-500 transition-all focus:border-alpha focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-alpha text-white shadow-lg transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <IoSend size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ChatSection
