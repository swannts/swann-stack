import React, { useState, useEffect, useRef } from 'react'
import classNames from 'clsx'
import { IoSend, IoClose, IoChatbubblesSharp, IoTrashOutline, IoArrowBack } from 'react-icons/io5'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LoadingDots from './LoadingDots'

const SUGGESTED_QUESTIONS = [
  "What are Swann's strongest skills?",
  "Tell me about Swann's AI experience.",
  "What projects has Swann worked on?",
  "How can I contact Swann?",
  "Is Swann suitable for remote SaaS roles?"
]

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('swann_chat_history')
    if (saved) setMessages(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('swann_chat_history', JSON.stringify(messages))
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

  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem('swann_chat_history')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-3xl border border-omega-800 bg-omega-900 shadow-2xl animate-fade-in sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-omega-800/50 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-alpha to-beta text-white shadow-lg">
                 <span className="text-xs font-bold">AI</span>
              </div>
              <div>
                <h3 className="m-0 text-sm font-bold text-white">Ask Swann AI Assistant</h3>
                <p className="m-0 text-[10px] text-omega-400">Ask about skills, experience & projects</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearHistory} className="text-omega-400 hover:text-white transition-colors" title="Clear history">
                <IoTrashOutline size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-omega-400 hover:text-white transition-colors">
                <IoClose size={22} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-alpha/50 scrollbar-track-omega-800/50"
          >
            {messages.length === 0 && (
              <div className="space-y-4 text-center py-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-omega-800 text-alpha">
                  <IoChatbubblesSharp size={24} />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Hi! I'm Swann's AI assistant.</p>
                  <p className="text-xs text-omega-400 mt-1 px-4">I can answer questions about his expertise in Full Stack, Cloud, and AI Engineering.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 px-2 mt-4">
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="rounded-full border border-omega-700 bg-omega-800/50 px-3 py-1.5 text-[10px] text-omega-300 transition-all hover:border-alpha hover:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={classNames(
                  'flex w-full',
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={classNames(
                    'max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm',
                    m.role === 'user' 
                      ? 'bg-alpha text-white rounded-br-none' 
                      : 'bg-omega-800 text-omega-100 rounded-bl-none border border-omega-700 prose prose-invert prose-p:my-0 prose-p:leading-relaxed prose-ul:my-2 prose-li:my-0 prose-sm max-w-none'
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
              <div className="flex justify-start">
                <div className="rounded-2xl bg-omega-800 px-4 py-3 text-omega-100 rounded-bl-none border border-omega-700">
                  <LoadingDots />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-omega-800 bg-omega-900/80 p-4 backdrop-blur-md">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="w-full rounded-2xl border-2 border-omega-700 bg-omega-800 px-4 py-2 pr-12 text-sm text-white placeholder-omega-500 transition-all focus:border-alpha focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 text-alpha hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 transition-all"
              >
                <IoSend size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-alpha to-beta text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group relative"
        >
          <IoChatbubblesSharp size={28} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alpha opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-alpha text-[8px] font-bold items-center justify-center">AI</span>
          </span>
        </button>
      )}
    </div>
  )
}

export default ChatWidget
