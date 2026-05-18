import abuProfile from '../../data/abu-profile'
import { searchSystemDesignAndAiNotes, searchProjectPortfolio } from '../../lib/ai/knowledge-base'
import { getOfflineMockResponse } from '../../lib/ai/chatService'
import { SYSTEM_PROMPT } from '../../lib/ai/systemPrompt'

export default async function handler(req, res) {
  // 1. Validate method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  // 2. Validate messages exists and is an array
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages body. Must provide a non-empty array.' })
  }

  // 3. Limit chat history to the last 4 messages for performance and token safety
  const limitedMessages = messages.slice(-4)

  // 4. Validate latest message content exists and is a string
  const latestMessage = limitedMessages[limitedMessages.length - 1]
  if (!latestMessage || typeof latestMessage.content !== 'string') {
    return res.status(400).json({ error: 'Latest message content must be a string' })
  }

  const userQuery = latestMessage.content

  // 5. Enforce maximum input length constraints (3000 characters)
  if (userQuery.length > 3000) {
    return res.status(400).json({ error: 'Message is too long. Please keep it under 3000 characters.' })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  // Offline Fallback early exit if no keys exist
  if (!GEMINI_API_KEY && !GROQ_API_KEY) {
    const mockReply = getOfflineMockResponse(userQuery)
    return res.status(200).json({ content: mockReply })
  }

  // 6. Gather relevant grounding context based on keyword analysis of userQuery
  const q = userQuery.toLowerCase().trim()
  const contextBlocks = []

  // Always add primary bio & summary
  contextBlocks.push(`### Swann's Primary Profile
Name: ${abuProfile.name} (Professionally known as Swann)
Title: ${abuProfile.title}
Subtitle: ${abuProfile.subtitle}
Summary: ${abuProfile.summary}
Availability: ${abuProfile.availability}`)

  // Contact details
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('social') || q.includes('linkedin') || q.includes('github') || q.includes('whatsapp')) {
    contextBlocks.push(`### Contact Information
Email: ${abuProfile.contact.email}
Phone/WhatsApp: ${abuProfile.contact.phone}
LinkedIn: ${abuProfile.contact.linkedin}
GitHub: ${abuProfile.contact.github}`)
  }

  // Technical skills inventory
  if (q.includes('skills') || q.includes('languages') || q.includes('tech') || q.includes('stack') || q.includes('database') || q.includes('framework') || q.includes('expert') || q.includes('know')) {
    contextBlocks.push(`### Technical Skills Matrix
Languages: ${abuProfile.skills.languages.join(', ')}
Backend Frameworks: ${abuProfile.skills.backend.join(', ')}
Frontend Frameworks: ${abuProfile.skills.frontend.join(', ')}
AI Engineering: ${abuProfile.skills.ai_engineering.join(', ')}
Cloud & DevOps: ${abuProfile.skills.cloud_devops.join(', ')}
Databases & Messaging: ${abuProfile.skills.databases_messaging.join(', ')}`)
  }

  // Experience timeline
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('history') || q.includes('career') || q.includes('role') || q.includes('company')) {
    const expText = abuProfile.experience.map(job => 
      `* Role: ${job.role} at ${job.company} (${job.period})\n` +
      job.highlights.map(h => `  - ${h}`).join('\n')
    ).join('\n\n')
    contextBlocks.push(`### Professional Experience Timeline\n${expText}`)
  }

  // Project Case Studies
  if (q.includes('project') || q.includes('portfolio') || q.includes('weticket') || q.includes('mym') || q.includes('trps') || q.includes('swannstack') || q.includes('case study')) {
    const matchedProjects = await searchProjectPortfolio(userQuery)
    const projText = matchedProjects.slice(0, 2).map(proj => 
      `* Project Name: ${proj.title}\n` +
      `  Tech Stack: ${proj.tags?.join(', ') || ''}\n` +
      `  Details and Case Study Overview:\n${proj.content.substring(0, 1200)}`
    ).join('\n\n')
    contextBlocks.push(`### Key Projects & Case Studies\n${projText}`)
  }

  // System Design & AI Technical Notes
  if (q.includes('ai') || q.includes('agent') || q.includes('rag') || q.includes('mcp') || q.includes('prompt') || q.includes('vector') || q.includes('llm') || q.includes('embeddings') || q.includes('system design') || q.includes('microservice') || q.includes('kafka') || q.includes('rabbitmq') || q.includes('cloud')) {
    const matchedNotes = await searchSystemDesignAndAiNotes(userQuery)
    const notesText = matchedNotes.slice(0, 2).map(n => 
      `* Article Title: ${n.title}\n` +
      `  Category: ${n.category}\n` +
      `  Tags: ${n.tags?.join(', ') || ''}\n` +
      `  Content Overview:\n${n.content.substring(0, 1200)}`
    ).join('\n\n')
    contextBlocks.push(`### System Design & Technical Notes\n${notesText}`)
  }

  const mergedContext = contextBlocks.join('\n\n=================================\n\n')

  // 7. Format complete system instructions with grounding data
  const groundedSystemInstructions = `${SYSTEM_PROMPT}

=================================
VERIFIED GROUNDING CONTEXT DATA:
=================================
${mergedContext}
=================================

Remember: Answer queries ONLY using the verified context data above. If the context does not contain the answer, politely reply: "I don't have that information in Swann's profile."`

  // STAGE 1: Try Primary Gemini AI Engine (via direct Google REST endpoint)
  if (GEMINI_API_KEY) {
    try {
      const geminiContents = []
      // Map prior limited messages for conversation context
      for (let i = 0; i < limitedMessages.length - 1; i++) {
        const m = limitedMessages[i]
        if (m.role === 'user') {
          geminiContents.push({ role: 'user', parts: [{ text: m.content }] })
        } else if (m.role === 'assistant') {
          geminiContents.push({ role: 'model', parts: [{ text: m.content }] })
        }
      }
      // Push the active query
      geminiContents.push({ role: 'user', parts: [{ text: userQuery }] })

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: groundedSystemInstructions }]
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (reply) {
          return res.status(200).json({ content: reply })
        }
      } else {
        const errorData = await response.json()
        console.warn("Primary Gemini API returned non-ok response, falling back to Groq:", errorData)
      }
    } catch (geminiError) {
      console.error("Primary Gemini API execution error:", geminiError.message)
    }
  }

  // STAGE 2: Try Secondary Groq Fallback Engine
  if (GROQ_API_KEY) {
    try {
      const apiMessages = [
        {
          role: "system",
          content: groundedSystemInstructions
        }
      ]

      for (let i = 0; i < limitedMessages.length - 1; i++) {
        const m = limitedMessages[i]
        if (m.role === 'user') {
          apiMessages.push({ role: "user", content: m.content })
        } else if (m.role === 'assistant') {
          apiMessages.push({ role: "assistant", content: m.content })
        }
      }

      apiMessages.push({ role: "user", content: userQuery })

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: apiMessages,
          temperature: 0.2,
          max_tokens: 1024
        })
      })

      if (response.ok) {
        const data = await response.json()
        const reply = data?.choices?.[0]?.message?.content
        if (reply) {
          return res.status(200).json({ content: reply })
        }
      } else {
        const errorData = await response.json()
        console.warn("Secondary Groq API returned non-ok response:", errorData)
      }
    } catch (groqError) {
      console.error("Secondary Groq API execution error:", groqError.message)
    }
  }

  // STAGE 3: Tertiary local offline fallback if all upstream endpoints are unreachable
  const mockReply = getOfflineMockResponse(userQuery)
  return res.status(200).json({ 
    content: `${mockReply}\n\n*(Note: Fallback offline response used due to API endpoint timeout/connection issue)*` 
  })
}
