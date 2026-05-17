import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents"
import { DynamicTool } from "@langchain/core/tools"
import { HumanMessage, AIMessage } from "@langchain/core/messages"
import abuProfile from '../../content/abu-profile.json'
import { getKnowledgeBase } from '../../lib/ai/knowledge-base'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  if (!GROQ_API_KEY) {
    return res.status(200).json({ content: "I'm in local mock mode. Please set GROQ_API_KEY to enable LangChain + RAG capabilities." })
  }

  try {
    const model = new ChatGroq({
      apiKey: GROQ_API_KEY,
      modelName: "llama-3.3-70b-versatile",
      temperature: 0.7,
    })

    // Define MCP-inspired tools
    const tools = [
      new DynamicTool({
        name: "get_swann_profile",
        description: "Returns Swann's core profile, skills, and contact information.",
        func: async () => JSON.stringify(abuProfile, null, 2),
      }),
      new DynamicTool({
        name: "search_engineering_notes",
        description: "Search through Swann's technical articles and system design notes. Use this for questions about AI, RAG, Microservices, or Kafka.",
        func: async () => {
          const knowledge = await getKnowledgeBase()
          const notes = knowledge.filter(k => k.source.includes('blog'))
          return JSON.stringify(notes.map(n => ({ title: n.title, content: n.content.substring(0, 1000) })), null, 2)
        },
      }),
      new DynamicTool({
        name: "get_project_portfolio",
        description: "Returns details about Swann's engineering projects (WeTicket, MYM Manager, etc).",
        func: async () => {
          const knowledge = await getKnowledgeBase()
          const projects = knowledge.filter(k => k.source.includes('projects'))
          return JSON.stringify(projects.map(p => ({ title: p.title, content: p.content })), null, 2)
        },
      })
    ]

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are "Ask Swann AI Assistant", a professional senior-level engineering agent.
      Your job is to answer questions about Abu Bokor Siddik (Swann)'s professional background.
      
      You have access to Swann's verified knowledge base via tools. 
      ALWAYS use the tools to fetch accurate information before answering.
      
      Formatting Rules:
      - USE REAL NEWLINES (\n\n) between every paragraph and bullet point.
      - Use bullet points (*) for all lists. Ensure EACH bullet is on its own line.
      - Ensure the output is highly human-readable and scannable.
      - NEVER output a single large block of text.
      - SKIP ALL internal chatter and meta-commentary.
      - NEVER start with phrases like "To answer your question", "Based on my search", or "I have fetched information".
      - JUMP DIRECTLY to the structured answer.
      - Use bold text for key terms or project names.
      
      General Rules:
      - Answer ONLY using information fetched from tools.
      - Be concise, professional, and act as a senior architectural assistant.
      - If you can't find info, say: "I don't have that information in Swann's profile."
      - Encourage the user to contact Swann for hiring opportunities.
      - You are NOT Swann. You are his portfolio agent.`],
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
      input: messages[messages.length - 1].content,
      chat_history: history,
    })

    return res.status(200).json({ content: result.output })
  } catch (error) {
    console.error('LangChain/Groq Error:', error)
    return res.status(500).json({ error: 'Failed to process request with LangChain' })
  }
}
