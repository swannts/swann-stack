import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents"
import { DynamicTool } from "@langchain/core/tools"
import { HumanMessage, AIMessage } from "@langchain/core/messages"
import abuProfile from '../../data/abu-profile'
import { getKnowledgeBase } from '../../lib/ai/knowledge-base'
import { getOfflineMockResponse } from '../../lib/ai/chatService'
import { SYSTEM_PROMPT } from '../../lib/ai/systemPrompt'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages body' })
  }

  const userQuery = messages[messages.length - 1].content

  // API Key Safety & Local Grounded Mock Mode
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  if (!GROQ_API_KEY) {
    const mockReply = getOfflineMockResponse(userQuery)
    return res.status(200).json({ content: mockReply })
  }

  try {
    const model = new ChatGroq({
      apiKey: GROQ_API_KEY,
      modelName: "llama-3.3-70b-versatile",
      temperature: 0.2, // Extremely low temperature to ensure strict factuality
    })

    // Define MCP-inspired tools
    const tools = [
      new DynamicTool({
        name: "get_abu_profile",
        description: "Returns Abu Bokor Siddik's core profile, skills, experience highlights, and contact info.",
        func: async () => JSON.stringify(abuProfile, null, 2),
      }),
      new DynamicTool({
        name: "search_system_design_and_ai_notes",
        description: "Search through Abu's technical articles and system design notes. Use this for questions about AI Agents, RAG, Microservices, or Kafka.",
        func: async () => {
          const knowledge = await getKnowledgeBase()
          const notes = knowledge.filter(k => k.source.includes('blog'))
          return JSON.stringify(notes.map(n => ({ title: n.title, content: n.content.substring(0, 1200) })), null, 2)
        },
      }),
      new DynamicTool({
        name: "get_project_portfolio",
        description: "Returns detailed case study specifications for Abu's engineering projects (WeTicket Platform, MYM Manager, TRPS Platform, SwannStack AI).",
        func: async () => {
          const knowledge = await getKnowledgeBase()
          const projects = knowledge.filter(k => k.source.includes('projects'))
          return JSON.stringify(projects.map(p => ({ title: p.title, content: p.content })), null, 2)
        },
      })
    ]

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_PROMPT],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad"),
    ])

    const agent = await createOpenAIFunctionsAgent({
      llm: model,
      tools,
      prompt,
    })

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
    })

    // Format history for LangChain
    const history = messages.slice(0, -1).map(m => {
      if (m.role === 'user') return new HumanMessage(m.content)
      return new AIMessage(m.content)
    })

    const result = await agentExecutor.invoke({
      input: userQuery,
      chat_history: history,
    })

    return res.status(200).json({ content: result.output })
  } catch (error) {
    console.error('LangChain/Groq Error:', error)
    // Graceful fallback to mock response if LangChain API fails
    const mockReply = getOfflineMockResponse(userQuery)
    return res.status(200).json({ 
      content: `${mockReply}\n\n*(Note: Fallback offline response used due to LangChain engine timeout/connection issue)*` 
    })
  }
}
